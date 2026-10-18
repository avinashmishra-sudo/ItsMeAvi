import Link from "next/link";
import Image from "next/image";
import { Youtube, Play, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { getYouTubeVideos } from "@/lib/data";

export default async function YouTubeSection() {
  const videos = await getYouTubeVideos(3);

  if (!videos || videos.length === 0) return null;

  return (
    <section id="youtube" className="py-14 sm:py-16 md:py-20 bg-white border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>Creative Media &amp; Content Production</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
              Video Storytelling &amp; Perspectives
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Practical case studies on public relations, brand campaigns, performance marketing, and AI communication published to my official channel{" "}
              <a
                href="https://www.youtube.com/@TheEyesChicko"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-navy-950 hover:text-red-600 underline"
              >
                @TheEyesChicko
              </a>
              .
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <a
              href="https://www.youtube.com/@TheEyesChicko"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <Youtube className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
            </a>
            <Link
              href="/youtube"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-stone-50 text-xs font-bold text-navy-950 uppercase tracking-wider transition-colors"
            >
              <span>All Videos</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
            </Link>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-[#faf9f5] rounded-3xl border border-gray-200/80 hover:border-gold-500/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail with Play Icon Overlay */}
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
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-navy-950 text-gold-400">
                      <Play className="w-10 h-10" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-navy-950/25 group-hover:bg-navy-950/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-navy-950/80 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-red-600 transition-all shadow-md">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {video.duration && (
                    <span className="absolute bottom-3 right-3 bg-navy-950/85 backdrop-blur-sm text-white text-[11px] font-mono px-2 py-0.5 rounded-md flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gold-400" />
                      <span>{video.duration}</span>
                    </span>
                  )}
                </a>

                {/* Video Info */}
                <div className="p-6 space-y-2.5">
                  <span className="text-[10px] font-bold text-accent-blue uppercase tracking-wider block">
                    Channel Video
                  </span>
                  <a
                    href={video.watch_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-bold text-navy-950 group-hover:text-red-600 transition-colors text-base leading-snug line-clamp-2"
                  >
                    {video.title}
                  </a>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-100/80 text-xs">
                <span className="text-[11px] text-gray-500 font-medium">@TheEyesChicko</span>
                <a
                  href={video.watch_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 font-bold text-navy-950 group-hover:text-red-600 transition-colors"
                >
                  <span>Watch Video</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
