import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Linkedin,
  Mail,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | Avinash Mishra`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.published_at,
      authors: ["Avinash Mishra"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts(true);
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  // Simple paragraph & heading renderer for markdown-style content
  const renderContent = (rawText: string) => {
    const blocks = rawText.split("\n\n");
    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-xl sm:text-2xl font-bold text-navy-950 mt-8 mb-3 tracking-tight"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-10 mb-4 tracking-tight"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ")) {
        const items = trimmed.split("\n");
        return (
          <ol key={idx} className="list-decimal pl-5 space-y-2 my-4 text-gray-700 text-base leading-relaxed">
            {items.map((it, i) => (
              <li key={i}>
                <span dangerouslySetInnerHTML={{ __html: it.replace(/^\d+\.\s+/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
              </li>
            ))}
          </ol>
        );
      }
      return (
        <p
          key={idx}
          className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal my-4"
          dangerouslySetInnerHTML={{
            __html: trimmed.replace(/\*\*(.*?)\*\*/g, "<strong class='text-navy-950 font-bold'>$1</strong>"),
          }}
        />
      );
    });
  };

  return (
    <div className="bg-[#faf9f5] min-h-screen pt-28 pb-20">
      {/* Top Header & Breadcrumb */}
      <div className="bg-white border-b border-gray-200/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-navy-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-md bg-stone-100 text-accent-blue font-bold uppercase tracking-wider text-[11px]">
                {post.category}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{post.reading_time_minutes} min read</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal">
              {post.summary}
            </p>
          </div>

          {/* Author Capsule */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-gray-200 bg-stone-100 shadow-xs">
                <Image
                  src="/images/profile.jpg"
                  alt="Avinash Mishra"
                  fill
                  className="object-cover object-center"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-navy-950">Avinash Mishra</p>
                <p className="text-xs text-gray-500">
                  Multidisciplinary Professional • 10+ Years Experience
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="https://linkedin.com/in/avinashmishraa/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-navy-950 transition-colors"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:avimishra890@gmail.com?subject=Regarding Article: ${encodeURIComponent(post.title)}`}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-navy-950 transition-colors"
                title="Email Avinash"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-14 shadow-xs space-y-6">
          <div className="prose prose-stone max-w-none">{renderContent(post.content)}</div>

          {/* Tags */}
          <div className="pt-8 border-t border-gray-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">Tags:</span>
            {post.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-stone-50 border border-stone-200/70 text-xs text-gray-700 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Box at Bottom */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm flex-shrink-0">
              <Image
                src="/images/profile.jpg"
                alt="Avinash Mishra"
                fill
                className="object-cover object-center"
                sizes="80px"
              />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-base font-bold text-navy-950">Written by Avinash Mishra</h4>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Marketing, communication and content professional with 10+ years of experience across BFSI, e-commerce, news media and television. Combining strategic thinking with hands-on execution.
              </p>
              <div className="pt-1 flex items-center space-x-4 text-xs font-bold">
                <Link href="/about" className="text-accent-blue hover:underline">
                  View Full Profile &rarr;
                </Link>
                <Link href="/resume" className="text-gray-700 hover:text-navy-950 hover:underline">
                  View Resume &rarr;
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-navy-950 tracking-tight">More Perspectives</h3>
              <Link href="/blog" className="text-xs font-bold text-accent-blue hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-gold-500/40 shadow-xs hover:shadow-md transition-all group block space-y-3"
                >
                  <span className="text-[10px] font-bold text-accent-blue uppercase tracking-wider block">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-bold text-navy-950 group-hover:text-accent-blue transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{rel.summary}</p>
                  <div className="flex items-center space-x-1 text-xs font-bold text-navy-950 pt-1">
                    <span>Read perspective</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
