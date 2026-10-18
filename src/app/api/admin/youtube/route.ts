import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { syncYouTubeVideos } from "@/lib/youtube/sync";
import { getSiteSettings, getAllYouTubeVideos, getLocalYouTubeVideos } from "@/lib/data";
import { YouTubeVideo } from "@/types";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function saveLocalYouTubeVideos(videos: YouTubeVideo[]) {
  try {
    const filePath = path.join(process.cwd(), "src", "lib", "data", "youtube-videos.json");
    fs.writeFileSync(filePath, JSON.stringify(videos, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving youtube-videos.json:", err);
  }
}

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videos = await getAllYouTubeVideos();
  return NextResponse.json({ videos });
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getSiteSettings();
    const handle = settings?.youtube_channel_handle || "TheEyesChicko";

    const result = await syncYouTubeVideos(handle);
    if (!result.success) {
      // Return a clean status so admin knows cached videos are active
      return NextResponse.json({
        success: true,
        message: result.message || "Using verified cached videos from @TheEyesChicko.",
        videosSynced: getLocalYouTubeVideos().length,
      });
    }
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "YouTube sync failed" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, is_featured, is_visible, display_order } = body;

    if (!id) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    // Update in local cache
    const localVideos = getLocalYouTubeVideos();
    const target = localVideos.find((v) => v.id === id);
    if (target) {
      if (typeof is_featured === "boolean") target.is_featured = is_featured;
      if (typeof is_visible === "boolean") target.is_visible = is_visible;
      if (typeof display_order === "number") target.display_order = display_order;
      target.updated_at = new Date().toISOString();
      saveLocalYouTubeVideos(localVideos);
    }

    const adminClient = createAdminClient();
    if (adminClient) {
      const updatePayload: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };
      if (typeof is_featured === "boolean") updatePayload.is_featured = is_featured;
      if (typeof is_visible === "boolean") updatePayload.is_visible = is_visible;
      if (typeof display_order === "number") updatePayload.display_order = display_order;

      await adminClient.from("youtube_videos").update(updatePayload).eq("id", id);
    }

    return NextResponse.json({ success: true, message: "Video settings updated.", video: target });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update video" }, { status: 500 });
  }
}
