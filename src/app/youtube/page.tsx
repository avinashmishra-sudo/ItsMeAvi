import { Metadata } from "next";
import Image from "next/image";
import { getYouTubeVideos, getSiteSettings } from "@/lib/data";
import { Youtube, ExternalLink, Play, Clock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Video Library",
  description:
    "Explore latest videos and visual storytelling projects from Avinash Mishra's official YouTube channel @TheEyesChicko.",
};

export default async function YouTubePage() {
  const [videos, settings] = await Promise.all([
    getYouTubeVideos(24),
    getSiteSettings(),
  ]);

  const channelHandle = settings?.youtube_channel_handle || "TheEyesChicko";

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="bg-navy-950 text-white py-10 sm:py-12 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-400 uppercase bg-navy-900 px-3 py-1 rounded-md border border-gold-500/30">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>Creative Media &amp; Content</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                YouTube Video Channel
              </h1>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
                Video tutorials, creative storytelling breakdowns, and instructional media projects published to @{channelHandle}.
              </p>
            </div>

            <a
              href={`https://www.youtube.com/@${channelHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wide shadow-lg shadow-red-600/30 transition-all duration-200 w-fit"
            >
              <Youtube className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail with play link */}
              <a
                href={video.watch_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video w-full bg-navy-950 block overflow-hidden"
              >
                {video.thumbnail_url ? (
                  <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-navy-950 text-gold-500">
                    <Play className="w-10 h-10" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-navy-950/80 border border-gold-500/40 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {video.duration && (
                  <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </span>
                )}
              </a>

              {/* Video Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {new Date(video.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {video.view_count && <span>{video.view_count}</span>}
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-gold-600 transition-colors line-clamp-2">
                    {video.title}
                  </h2>

                  {video.description && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {video.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={video.watch_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-gold-700 hover:text-gold-800"
                  >
                    <span>Watch Full Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {video.is_featured && (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
                      <Sparkles className="w-3 h-3 text-gold-500" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
