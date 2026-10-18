"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Youtube,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { YouTubeVideo } from "@/types";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/admin/youtube");
      const data = await res.json();
      if (data.videos) setVideos(data.videos);
    } catch {
      setErrorMsg("Failed to load cached videos.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSync = async () => {
    setSyncing(true);
    setStatusMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/youtube", { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || data.error || "Failed to synchronize with YouTube API.");
      } else {
        setStatusMsg(data.message || "YouTube sync complete!");
        fetchVideos();
      }
    } catch {
      setErrorMsg("Network error communicating with sync service.");
    } finally {
      setSyncing(false);
    }
  };

  const handleToggle = async (video: YouTubeVideo, field: "is_featured" | "is_visible") => {
    setUpdatingId(video.id);
    setErrorMsg("");

    try {
      const payload = {
        id: video.id,
        [field]: !video[field],
      };

      const res = await fetch("/api/admin/youtube", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setVideos((prev) =>
          prev.map((v) => (v.id === video.id ? { ...v, [field]: !video[field] } : v))
        );
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to update video settings.");
      }
    } catch {
      setErrorMsg("Network error.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOrderChange = async (video: YouTubeVideo, newOrder: number) => {
    try {
      await fetch("/api/admin/youtube", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: video.id, display_order: newOrder }),
      });
      setVideos((prev) =>
        prev.map((v) => (v.id === video.id ? { ...v, display_order: newOrder } : v))
      );
    } catch {
      // ignore minor order fail
    }
  };

  const lastSyncTime = videos[0]?.last_synced_at
    ? new Date(videos[0].last_synced_at).toLocaleString()
    : "Never";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
            Video Integration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            YouTube Video Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Channel: <strong className="text-slate-800">@TheEyesChicko</strong> • Last Synced:{" "}
            <span className="text-slate-700 font-semibold">{lastSyncTime}</span>
          </p>
        </div>

        <button
          onClick={handleManualSync}
          disabled={syncing}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-md shadow-red-600/20 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
          <span>{syncing ? "Syncing Uploads..." : "Sync Latest Videos"}</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start space-x-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Integration Notice:</span>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      {/* Video Cards Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Youtube className="w-5 h-5 text-red-500" />
                <span>Cached Channel Videos ({videos.length})</span>
              </h2>
              <span className="text-xs text-slate-400">
                Administrator featured &amp; visibility selections are permanently preserved across sync runs.
              </span>
            </div>

            <div className="space-y-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className={`p-4 sm:p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    video.is_visible
                      ? "bg-white border-slate-200/80 shadow-sm"
                      : "bg-slate-50 border-slate-200/40 opacity-60"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-28 sm:w-36 aspect-video bg-navy-950 rounded-lg overflow-hidden relative flex-shrink-0">
                      {video.thumbnail_url && (
                        <Image
                          src={video.thumbnail_url}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {video.title}
                        </h3>
                        {video.is_featured && (
                          <span className="bg-gold-100 text-gold-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500">
                        Published: {new Date(video.published_at).toLocaleDateString()} • ID:{" "}
                        <code className="text-slate-600 font-mono">{video.youtube_video_id}</code>
                      </p>

                      <a
                        href={video.watch_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-gold-700 hover:text-gold-800 inline-flex items-center space-x-1"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Actions & Ordering */}
                  <div className="flex items-center space-x-3 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-slate-500">Order:</span>
                      <input
                        type="number"
                        value={video.display_order ?? 0}
                        onChange={(e) =>
                          handleOrderChange(video, parseInt(e.target.value) || 0)
                        }
                        className="w-14 px-2 py-1 rounded-lg border border-slate-300 text-xs text-center"
                      />
                    </div>

                    <button
                      onClick={() => handleToggle(video, "is_featured")}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-colors ${
                        video.is_featured
                          ? "bg-gold-500 text-navy-950 font-bold"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                      title={video.is_featured ? "Remove featured" : "Feature video"}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{video.is_featured ? "Featured" : "Feature"}</span>
                    </button>

                    <button
                      onClick={() => handleToggle(video, "is_visible")}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-colors ${
                        video.is_visible
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500"
                      }`}
                      title={video.is_visible ? "Hide from website" : "Show on website"}
                    >
                      {video.is_visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{video.is_visible ? "Visible" : "Hidden"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
