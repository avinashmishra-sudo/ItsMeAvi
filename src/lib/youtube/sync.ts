import { createAdminClient } from "@/lib/supabase/admin";

export interface SyncResult {
  success: boolean;
  message: string;
  videosSynced: number;
  lastSyncTime?: string;
  error?: string;
}

export async function syncYouTubeVideos(channelHandle = "TheEyesChicko"): Promise<SyncResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || apiKey.includes("your-google-youtube") || apiKey.trim() === "") {
    return {
      success: false,
      message: "YouTube API key is not configured. Please set YOUTUBE_API_KEY in your environment variables. Cached videos remain intact.",
      videosSynced: 0,
    };
  }

  const cleanHandle = channelHandle.replace(/^@/, "").trim();

  try {
    // 1. Resolve Channel details and Uploads Playlist ID
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&forHandle=${encodeURIComponent(
      cleanHandle
    )}&key=${apiKey}`;

    const channelRes = await fetch(channelUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });

    if (!channelRes.ok) {
      const errBody = await channelRes.text();
      let errorMsg = `YouTube API responded with status ${channelRes.status}`;
      try {
        const parsed = JSON.parse(errBody);
        if (parsed.error?.message) {
          errorMsg += `: ${parsed.error.message}`;
        }
      } catch {
        // use default error message
      }
      return {
        success: false,
        message: errorMsg,
        videosSynced: 0,
      };
    }

    const channelData = await channelRes.json();
    let uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    // Fallback if forHandle didn't resolve: search channels or use UC to UU transform if user supplied a channel ID
    if (!uploadsPlaylistId) {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
        cleanHandle
      )}&key=${apiKey}&maxResults=1`;
      const searchRes = await fetch(searchUrl);
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const foundChannelId = searchData.items?.[0]?.snippet?.channelId;
        if (foundChannelId) {
          uploadsPlaylistId = "UU" + foundChannelId.substring(2);
        }
      }
    }

    if (!uploadsPlaylistId) {
      return {
        success: false,
        message: `Could not find an uploads playlist for YouTube channel @${cleanHandle}. Please check channel handle.`,
        videosSynced: 0,
      };
    }

    // 2. Fetch recent uploads playlist items
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=15&key=${apiKey}`;
    const playlistRes = await fetch(playlistUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });

    if (!playlistRes.ok) {
      return {
        success: false,
        message: `Failed to fetch videos from uploads playlist (${playlistRes.status}).`,
        videosSynced: 0,
      };
    }

    const playlistData = await playlistRes.json();
    const items = playlistData.items || [];

    if (items.length === 0) {
      return {
        success: true,
        message: "Channel found, but no videos were returned in the uploads playlist.",
        videosSynced: 0,
        lastSyncTime: new Date().toISOString(),
      };
    }

    // 3. Connect to database to upsert records while preserving administrator customizations
    const supabaseAdmin = createAdminClient();
    const now = new Date().toISOString();

    if (!supabaseAdmin) {
      // In local mode without Supabase connection, return success simulated result
      return {
        success: true,
        message: `Fetched ${items.length} videos from YouTube (Database client not connected; update skipped).`,
        videosSynced: items.length,
        lastSyncTime: now,
      };
    }

    // Fetch existing settings for these video IDs to preserve admin-selected featured, visible, and order
    const videoIds = items.map((i: any) => i.contentDetails?.videoId).filter(Boolean);
    const { data: existingVideos } = await supabaseAdmin
      .from("youtube_videos")
      .select("youtube_video_id, is_featured, is_visible, display_order")
      .in("youtube_video_id", videoIds);

    const existingMap = new Map<string, { is_featured: boolean; is_visible: boolean; display_order: number }>();
    if (existingVideos) {
      existingVideos.forEach((v) => {
        existingMap.set(v.youtube_video_id, {
          is_featured: v.is_featured,
          is_visible: v.is_visible,
          display_order: v.display_order,
        });
      });
    }

    const recordsToUpsert = items.map((item: any, idx: number) => {
      const vId = item.contentDetails?.videoId;
      const snippet = item.snippet;
      const existing = existingMap.get(vId);

      // Best thumbnail resolution available
      const thumbs = snippet?.thumbnails;
      const thumbUrl =
        thumbs?.maxres?.url ||
        thumbs?.standard?.url ||
        thumbs?.high?.url ||
        thumbs?.medium?.url ||
        thumbs?.default?.url ||
        `https://i.ytimg.com/vi/${vId}/hqdefault.jpg`;

      return {
        youtube_video_id: vId,
        title: snippet?.title || "Untitled Video",
        description: snippet?.description || "",
        thumbnail_url: thumbUrl,
        published_at: snippet?.publishedAt || now,
        watch_url: `https://www.youtube.com/watch?v=${vId}`,
        is_featured: existing ? existing.is_featured : false,
        is_visible: existing ? existing.is_visible : true,
        display_order: existing ? existing.display_order : idx + 1,
        last_synced_at: now,
        updated_at: now,
      };
    });

    const { error: upsertError } = await supabaseAdmin
      .from("youtube_videos")
      .upsert(recordsToUpsert, { onConflict: "youtube_video_id" });

    if (upsertError) {
      return {
        success: false,
        message: `Database upsert error: ${upsertError.message}`,
        videosSynced: 0,
      };
    }

    return {
      success: true,
      message: `Successfully synchronized ${recordsToUpsert.length} videos from @${cleanHandle}.`,
      videosSynced: recordsToUpsert.length,
      lastSyncTime: now,
    };
  } catch (err: any) {
    return {
      success: false,
      message: "An unexpected error occurred during YouTube synchronization.",
      error: err?.message || String(err),
      videosSynced: 0,
    };
  }
}
