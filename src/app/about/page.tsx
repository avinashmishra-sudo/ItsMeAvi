import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, GraduationCap, ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Avinash Mishra: multidisciplinary marketing, communication, content, creative production, and digital learning professional.",
};

export default function AboutPage() {
  const { about, education, contact, meta } = portfolioData;

  return (
    <div className="bg-[#faf9f5] min-h-screen pt-20 pb-16">
      {/* Editorial Header */}
      <div className="bg-white border-b border-gray-200/60 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
              <span>Professional Narrative</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy-950">
              About Avinash Mishra
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              10+ years across BFSI, e-commerce, television post-production, and digital learning. Connecting strategy, storytelling, creative execution, and technology.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story */}
          <div className="lg:col-span-8 space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200/80 shadow-xs">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-950">
                {about.heading}
              </h2>
              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
                {about.copy.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Principles */}
            <div className="pt-8 border-t border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-navy-950">Three Guiding Principles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {about.principles.map((pr, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                    <span className="text-xs font-mono font-bold text-accent-blue block">0{idx + 1}</span>
                    <h4 className="text-sm font-bold text-navy-950">{pr.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{pr.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4">
              <Link
                href="/#projects"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Link>

              <a
                href={contact.resumeUrl}
                download
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white hover:bg-stone-50 text-navy-950 border border-gray-300 font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                <Download className="w-4 h-4 text-gray-500" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
          {/* Sidebar: Education & Strengths */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/80 space-y-4 shadow-xs">
              <div className="relative w-full aspect-[4/4.2] rounded-2xl overflow-hidden bg-stone-100 border border-gray-200/60 shadow-inner">
                <Image
                  src="/images/profile.jpg"
                  alt="Avinash Mishra — Professional Profile"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-navy-950">Avinash Mishra</h3>
                <p className="text-[11px] font-bold text-accent-blue uppercase tracking-wider">{meta.eyebrow}</p>
                <p className="text-xs text-gray-500">10+ Years Experience • India</p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 space-y-6">
              <h3 className="text-base font-bold text-navy-950 flex items-center space-x-2 border-b border-gray-100 pb-3">
                <GraduationCap className="w-5 h-5 text-accent-blue" />
                <span>Education</span>
              </h3>

              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                    <span className="text-xs font-mono font-bold text-accent-blue block mb-1">{edu.year}</span>
                    <h4 className="font-bold text-navy-950 text-sm">{edu.degree}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy-950 text-white p-6 sm:p-8 rounded-3xl border border-navy-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Direct Contact</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Interested in discussing brand strategy, digital learning authoring, or collaborative projects?
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-white text-navy-950 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 transition-colors"
                >
                  <span>Send an Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
