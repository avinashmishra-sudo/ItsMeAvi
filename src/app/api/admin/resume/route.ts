import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAllResumeVersions } from "@/lib/data";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

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

    const adminClient = createAdminClient();

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
        console.warn("Supabase Storage upload note:", uploadError?.message);
        // Fallback to local public file if bucket is not created
        const uploadsDir = path.join(process.cwd(), "public", "resumes");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        fs.writeFileSync(path.join(uploadsDir, cleanFilename), buffer);
        fileUrl = `/resumes/${cleanFilename}`;
      }
    } else {
      // Local development without Supabase client
      const uploadsDir = path.join(process.cwd(), "public", "resumes");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadsDir, cleanFilename), buffer);
      fileUrl = `/resumes/${cleanFilename}`;
    }

    // 4. If publishing immediately, unpublish any existing version first
    const now = new Date().toISOString();
    if (adminClient) {
      if (publishImmediately) {
        await adminClient
          .from("resume_versions")
          .update({ is_published: false })
          .eq("is_published", true);
      }

      const { data, error } = await adminClient
        .from("resume_versions")
        .insert({
          version_label: versionLabel.trim(),
          description: description.trim(),
          file_url: fileUrl,
          file_name: file.name,
          file_size_bytes: file.size,
          is_published: publishImmediately,
          published_at: publishImmediately ? now : null,
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, resume: data });
    }

    return NextResponse.json({
      success: true,
      message: "Resume uploaded in demo mode.",
      resume: {
        id: "res-" + Date.now(),
        version_label: versionLabel.trim(),
        description: description.trim(),
        file_url: fileUrl,
        file_name: file.name,
        file_size_bytes: file.size,
        is_published: publishImmediately,
        published_at: publishImmediately ? now : null,
        created_at: now,
      },
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

    if (!adminClient) {
      return NextResponse.json({ success: true, message: "Resume updated (Demo mode)." });
    }

    if (action === "publish") {
      // 1. Unpublish any existing published resume
      await adminClient
        .from("resume_versions")
        .update({ is_published: false })
        .eq("is_published", true);

      // 2. Publish this version
      const { data, error } = await adminClient
        .from("resume_versions")
        .update({
          is_published: true,
          published_at: now,
          updated_at: now,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, resume: data });
    } else if (action === "unpublish") {
      const { data, error } = await adminClient
        .from("resume_versions")
        .update({
          is_published: false,
          updated_at: now,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, resume: data });
    } else {
      // General update (version_label / description)
      const { data, error } = await adminClient
        .from("resume_versions")
        .update({
          version_label,
          description,
          updated_at: now,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, resume: data });
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

    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json({ success: true, message: "Resume deleted (Demo mode)." });
    }

    // Check if it is currently published
    const { data: resume } = await adminClient
      .from("resume_versions")
      .select("is_published, file_url")
      .eq("id", id)
      .single();

    if (resume?.is_published) {
      return NextResponse.json(
        {
          error:
            "Cannot delete the currently published resume version. Please publish another version first before deleting this one.",
        },
        { status: 400 }
      );
    }

    const { error } = await adminClient.from("resume_versions").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to delete resume" }, { status: 500 });
  }
}
