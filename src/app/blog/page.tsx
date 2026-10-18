import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/data";
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, Tag, ChevronRight } from "lucide-react";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Articles & Perspectives | Avinash Mishra",
  description:
    "Insights on content marketing, digital learning, brand storytelling, e-learning instructional design, and AI-assisted creation by Avinash Mishra.",
};

export const revalidate = 60; // ISR cache

export default async function BlogIndexPage() {
  const posts = await getBlogPosts(true);

  const featuredPost = posts.find((p) => p.is_featured) || posts[0];
  const regularPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="bg-[#faf9f5] min-h-screen pt-20 pb-16">
      {/* Editorial Header */}
      <div className="bg-white border-b border-gray-200/60 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
              <span>Articles &amp; Field Notes</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy-950">
              Thoughts on Strategy, Creativity &amp; Execution
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              Practical perspectives on content marketing, digital learning architecture, AI-accelerated workflows, and cross-functional leadership based on 10+ years of hands-on practice.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10 sm:space-y-12">
        {/* Featured Post Card */}
        {featuredPost && (
          <div className="relative bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-xs overflow-hidden group hover:border-gold-500/40 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold-500/10 via-accent-blue/5 to-transparent rounded-bl-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-md bg-navy-950 text-gold-400 font-bold uppercase tracking-wider text-[11px]">
                    Featured Article
                  </span>
                  <span className="px-3 py-1 rounded-md bg-stone-100 text-gray-700 font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.reading_time_minutes} min read</span>
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`} className="block group-hover:text-accent-blue transition-colors">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                  {featuredPost.summary}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-stone-100">
                      <Image
                        src="/images/profile.jpg"
                        alt="Avinash Mishra"
                        fill
                        className="object-cover object-center"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy-950">Avinash Mishra</p>
                      <p className="text-[11px] text-gray-500">
                        {new Date(featuredPost.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-navy-950 hover:text-accent-blue transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Graphic / Cover Illustration */}
              <div className="lg:col-span-4 relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-gray-200/80 shadow-inner">
                  {featuredPost.cover_image ? (
                    <Image
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-50 text-gray-400">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Client-Side Interactive Filterable Grid */}
        <BlogListClient initialPosts={regularPosts} />
      </div>
    </div>
  );
}
