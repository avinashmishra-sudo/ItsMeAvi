import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { syncYouTubeVideos } from "@/lib/youtube/sync";
import { getSiteSettings, getAllYouTubeVideos } from "@/lib/data";

export const dynamic = "force-dynamic";

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

    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json({ success: true, message: "Video settings updated (Demo mode)." });
    }

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (typeof is_featured === "boolean") updatePayload.is_featured = is_featured;
    if (typeof is_visible === "boolean") updatePayload.is_visible = is_visible;
    if (typeof display_order === "number") updatePayload.display_order = display_order;

    const { data, error } = await adminClient
      .from("youtube_videos")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, video: data });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update video" }, { status: 500 });
  }
}
