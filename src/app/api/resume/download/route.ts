import { NextResponse } from "next/server";
import { getPublishedResume } from "@/lib/data";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const publishedResume = await getPublishedResume();

    if (!publishedResume) {
      return NextResponse.json(
        { error: "No published resume version found." },
        { status: 404 }
      );
    }

    const fileUrl = publishedResume.file_url;
    const downloadFileName = publishedResume.file_name || "Avinash_Mishra_Resume.pdf";

    // If file_url is an external URL (e.g. Supabase Storage public URL)
    if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
      return NextResponse.redirect(fileUrl, { status: 302 });
    }

    // If file is stored locally in public folder (e.g., /resumes/Avinash_Mishra_Resume.pdf)
    const sanitizedPath = fileUrl.replace(/^\//, "");
    const localFilePath = path.join(process.cwd(), "public", sanitizedPath);

    if (fs.existsSync(localFilePath)) {
      const fileBuffer = fs.readFileSync(localFilePath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${downloadFileName}"`,
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }

    // Fallback: Check if default public/resumes/Avinash_Mishra_Resume.pdf exists
    const defaultLocalResume = path.join(process.cwd(), "public", "resumes", "Avinash_Mishra_Resume.pdf");
    if (fs.existsSync(defaultLocalResume)) {
      const fileBuffer = fs.readFileSync(defaultLocalResume);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${downloadFileName}"`,
        },
      });
    }

    return NextResponse.json(
      { error: "Resume file not found on server storage." },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error retrieving resume file.", details: error?.message },
      { status: 500 }
    );
  }
}
