import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import { getBlogPosts } from "@/lib/data";

export default async function BlogSection() {
  const posts = await getBlogPosts(true);

  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="py-14 sm:py-16 md:py-20 bg-[#faf9f5] border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 pb-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              <BookOpen className="w-3.5 h-3.5 text-accent-blue" />
              <span>Articles &amp; Field Notes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
              Latest Insights &amp; Perspectives
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal">
              Practical observations on content marketing, digital learning authoring, AI workflows, and continuous adaptability.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs w-fit"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {displayPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-gray-200/80 hover:border-gold-500/40 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="px-2.5 py-1 rounded-md bg-stone-100 text-navy-950 font-bold uppercase tracking-wider text-[10px]">
                    {post.category}
                  </span>
                  <span className="flex items-center space-x-1 text-gray-400 font-medium">
                    <Clock className="w-3 h-3 text-gold-500" />
                    <span>{post.reading_time_minutes} min</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-950 group-hover:text-accent-blue transition-colors leading-snug line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed font-normal">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-medium">
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-navy-950 group-hover:text-accent-blue transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
