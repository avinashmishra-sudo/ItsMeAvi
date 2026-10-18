import Link from "next/link";
import Image from "next/image";
import { YouTubeVideo } from "@/types";
import { Youtube, ExternalLink, Play, ArrowRight } from "lucide-react";

interface YouTubeSectionProps {
  videos: YouTubeVideo[];
  channelHandle?: string;
}

export default function YouTubeSection({
  videos,
  channelHandle = "TheEyesChicko",
}: YouTubeSectionProps) {
  const displayVideos = videos.slice(0, 3);

  return (
    <section className="py-20 bg-navy-950 text-white border-b border-navy-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-400 uppercase bg-navy-900 px-3 py-1 rounded-md border border-gold-500/30">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>YouTube Video Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Latest From @{channelHandle}
            </h2>
            <p className="text-gray-400 max-w-2xl text-base">
              Exploring creative video editing, instructional pacing, and visual storytelling methods.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <a
              href={`https://www.youtube.com/@${channelHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/40 border border-red-800/40 px-3.5 py-2 rounded-lg transition-colors"
            >
              <Youtube className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
            </a>
            <Link
              href="/youtube"
              className="inline-flex items-center space-x-2 text-sm font-bold text-gold-400 hover:text-gold-300 group"
            >
              <span>View All Videos</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayVideos.map((video) => (
            <div
              key={video.id}
              className="bg-navy-900/90 rounded-2xl border border-navy-800 overflow-hidden hover:border-gold-500/40 transition-all duration-300 flex flex-col group"
            >
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-navy-950 text-gray-500">
                    <Play className="w-8 h-8 text-gold-500" />
                  </div>
                )}
                {/* Play overlay button */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-navy-950/80 border border-gold-500/40 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {video.duration && (
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                )}
              </a>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] text-gray-400">
                    {new Date(video.published_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 group-hover:text-gold-300 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">{video.description}</p>
                  )}
                </div>

                <a
                  href={video.watch_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-3 border-t border-navy-800 text-xs font-semibold text-gold-400 hover:text-gold-300 inline-flex items-center space-x-1.5"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
