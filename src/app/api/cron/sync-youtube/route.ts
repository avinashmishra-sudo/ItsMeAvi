import { NextRequest, NextResponse } from "next/server";
import { syncYouTubeVideos } from "@/lib/youtube/sync";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Validate authorization header
  const authHeader = request.headers.get("authorization");
  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret");
  const cronSecret = process.env.CRON_SECRET;

  // Verify secret token
  const providedToken = authHeader?.replace(/^Bearer\s+/i, "") || querySecret;

  if (!cronSecret || providedToken !== cronSecret) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Invalid or missing CRON_SECRET token.",
      },
      { status: 401 }
    );
  }

  try {
    const settings = await getSiteSettings();
    const handle = settings?.youtube_channel_handle || "TheEyesChicko";

    const result = await syncYouTubeVideos(handle);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Failed to execute sync",
      },
      { status: 500 }
    );
  }
}
