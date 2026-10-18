import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAllResumeVersions } from "@/lib/data";
import { ResumeVersion } from "@/types";
import { initialResumeVersions } from "@/lib/data/initial-data";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function getLocalResumeVersions(): ResumeVersion[] {
  try {
    const filePath = path.join(process.cwd(), "src", "lib", "data", "resume-versions.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as ResumeVersion[];
      }
    }
  } catch (err) {
    console.error("Error reading resume-versions.json:", err);
  }
  return initialResumeVersions;
}

function saveLocalResumeVersions(versions: ResumeVersion[]) {
  try {
    const filePath = path.join(process.cwd(), "src", "lib", "data", "resume-versions.json");
    fs.writeFileSync(filePath, JSON.stringify(versions, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving resume-versions.json:", err);
  }
}

function syncActiveResumeToPublicPdf(fileBufferOrPath: Buffer | string) {
  try {
    const publicResumePath = path.join(process.cwd(), "public", "resume.pdf");
    if (Buffer.isBuffer(fileBufferOrPath)) {
      fs.writeFileSync(publicResumePath, fileBufferOrPath);
    } else {
      // It's a local path like /resumes/filename.pdf
      const cleanPath = fileBufferOrPath.replace(/^\//, "");
      const sourceFile = path.join(process.cwd(), "public", cleanPath);
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, publicResumePath);
      }
    }
  } catch (err) {
    console.error("Error syncing active resume to public/resume.pdf:", err);
  }
}

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resumes = await getAllResumeVersions();
  return NextResponse.json({ resumes });
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const versionLabel = (formData.get("version_label") as string) || "";
    const description = (formData.get("description") as string) || "";
    const publishImmediately = formData.get("is_published") === "true";

    if (!file) {
      return NextResponse.json({ error: "No resume file provided." }, { status: 400 });
    }

    if (!versionLabel.trim()) {
      return NextResponse.json({ error: "Version label is required." }, { status: 400 });
    }

    // 1. File Type and Size Validation
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeBytes) {
      return NextResponse.json(
        { error: `File size exceeds the 10MB limit (uploaded: ${(file.size / (1024 * 1024)).toFixed(2)}MB).` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Validate PDF Magic Number (%PDF- header)
    if (buffer.length < 4 || buffer.subarray(0, 4).toString("ascii") !== "%PDF") {
      return NextResponse.json(
        { error: "Invalid file format. The uploaded file is not a valid PDF document." },
        { status: 400 }
      );
    }

    const cleanFilename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    let fileUrl = `/resumes/${cleanFilename}`;

    // Always ensure local file is written so public direct downloads work instantly
    const uploadsDir = path.join(process.cwd(), "public", "resumes");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    fs.writeFileSync(path.join(uploadsDir, cleanFilename), buffer);

    // If publishing immediately, update public/resume.pdf immediately
    if (publishImmediately) {
      syncActiveResumeToPublicPdf(buffer);
    }

    const adminClient = createAdminClient();
    const now = new Date().toISOString();

    // 3. Upload to Supabase Storage if available
    if (adminClient) {
      const { data: uploadData, error: uploadError } = await adminClient.storage
        .from("resumes")
        .upload(cleanFilename, buffer, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = adminClient.storage
          .from("resumes")
          .getPublicUrl(cleanFilename);
        fileUrl = publicUrlData.publicUrl;
      } else {
        console.warn("Supabase Storage note:", uploadError?.message);
      }

      // If publishing immediately, unpublish existing versions in Supabase
      if (publishImmediately) {
        await adminClient
          .from("resume_versions")
          .update({ is_published: false })
          .eq("is_published", true);
      }

      await adminClient.from("resume_versions").insert({
        version_label: versionLabel.trim(),
        description: description.trim(),
        file_url: fileUrl,
        file_name: file.name,
        file_size_bytes: file.size,
        is_published: publishImmediately,
        published_at: publishImmediately ? now : null,
      });
    }

    // 4. Update local resume-versions.json
    const localVersions = getLocalResumeVersions();
    if (publishImmediately) {
      localVersions.forEach((v) => {
        v.is_published = false;
      });
    }

    const newResume: ResumeVersion = {
      id: "res-" + Date.now(),
      version_label: versionLabel.trim(),
      description: description.trim(),
      file_url: fileUrl,
      file_name: file.name,
      file_size_bytes: file.size,
      is_published: publishImmediately,
      published_at: publishImmediately ? now : null,
      created_at: now,
    };

    localVersions.unshift(newResume);
    saveLocalResumeVersions(localVersions);

    return NextResponse.json({
      success: true,
      message: publishImmediately
        ? "Resume uploaded and published successfully."
        : "Resume uploaded successfully as draft.",
      resume: newResume,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to upload resume" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, action, version_label, description } = body;

    if (!id) {
      return NextResponse.json({ error: "Resume ID is required." }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const now = new Date().toISOString();
    const localVersions = getLocalResumeVersions();
    const targetResume = localVersions.find((r) => r.id === id);

    if (action === "publish") {
      // 1. Update in local manifest
      localVersions.forEach((r) => {
        if (r.id === id) {
          r.is_published = true;
          r.published_at = now;
          r.updated_at = now;
        } else {
          r.is_published = false;
        }
      });
      saveLocalResumeVersions(localVersions);

      // 2. Sync to public/resume.pdf
      if (targetResume) {
        syncActiveResumeToPublicPdf(targetResume.file_url);
      }

      // 3. Supabase update if connected
      if (adminClient) {
        await adminClient
          .from("resume_versions")
          .update({ is_published: false })
          .eq("is_published", true);

        await adminClient
          .from("resume_versions")
          .update({
            is_published: true,
            published_at: now,
            updated_at: now,
          })
          .eq("id", id);
      }

      return NextResponse.json({ success: true, message: "Resume published successfully." });
    } else if (action === "unpublish") {
      localVersions.forEach((r) => {
        if (r.id === id) {
          r.is_published = false;
          r.updated_at = now;
        }
      });
      saveLocalResumeVersions(localVersions);

      if (adminClient) {
        await adminClient
          .from("resume_versions")
          .update({
            is_published: false,
            updated_at: now,
          })
          .eq("id", id);
      }

      return NextResponse.json({ success: true, message: "Resume unpublished." });
    } else {
      // Edit metadata
      localVersions.forEach((r) => {
        if (r.id === id) {
          if (version_label !== undefined) r.version_label = version_label;
          if (description !== undefined) r.description = description;
          r.updated_at = now;
        }
      });
      saveLocalResumeVersions(localVersions);

      if (adminClient) {
        await adminClient
          .from("resume_versions")
          .update({
            version_label,
            description,
            updated_at: now,
          })
          .eq("id", id);
      }

      return NextResponse.json({ success: true, message: "Resume updated." });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update resume" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Resume ID is required." }, { status: 400 });
    }

    const localVersions = getLocalResumeVersions();
    const resumeToDelete = localVersions.find((r) => r.id === id);

    if (resumeToDelete?.is_published) {
      return NextResponse.json(
        {
          error:
            "Cannot delete the currently published resume version. Please publish another version first before deleting this one.",
        },
        { status: 400 }
      );
    }

    // Remove from local manifest
    const updatedVersions = localVersions.filter((r) => r.id !== id);
    saveLocalResumeVersions(updatedVersions);

    // Remove local file if it exists
    if (resumeToDelete && resumeToDelete.file_url.startsWith("/resumes/")) {
      const filePath = path.join(process.cwd(), "public", resumeToDelete.file_url.replace(/^\//, ""));
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn("Could not delete file:", filePath, e);
        }
      }
    }

    // Supabase DB delete if connected
    const adminClient = createAdminClient();
    if (adminClient) {
      await adminClient.from("resume_versions").delete().eq("id", id);
    }

    return NextResponse.json({ success: true, message: "Resume version removed." });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to delete resume" }, { status: 500 });
  }
}
