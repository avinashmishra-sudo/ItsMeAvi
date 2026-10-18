import { Metadata } from "next";
import Link from "next/link";
import { getProfile, getSkills } from "@/lib/data";
import { initialEducation } from "@/lib/data/initial-data";
import { GraduationCap, Award, CheckCircle2, ArrowRight, Download, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Avinash Mishra's background as a Senior Graphic Designer & eLearning Developer specializing in Articulate 360, BFSI solutions, and instructional design translation.",
};

export default async function AboutPage() {
  const [profile, skills] = await Promise.all([getProfile(), getSkills()]);

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Editorial Header */}
      <div className="bg-navy-950 text-white py-16 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-400 uppercase bg-navy-900 px-3 py-1 rounded-md border border-gold-500/30">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Professional Profile</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              About Avinash Mishra
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed font-normal">
              Senior Graphic Designer, eLearning Developer, and Articulate 360 Specialist with over 8 years of hands-on experience in enterprise learning systems.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story */}
          <div className="lg:col-span-8 space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Bridging Technology, Storytelling &amp; Visual Design
              </h2>
              <div className="space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {profile.about_text}
              </div>
            </div>

            {/* Methodology & Quality Standards */}
            <div className="pt-8 border-t border-slate-100 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">End-to-End Course Delivery Workflow</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-navy-950 text-gold-400 font-bold flex items-center justify-center text-sm">
                    01
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Storyboard Analysis</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Collaborating with instructional designers to deconstruct subject matter and outline engaging interactive branching.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-navy-950 text-gold-400 font-bold flex items-center justify-center text-sm">
                    02
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Visual Asset Creation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Developing custom illustrations, UI skins, infographics, and motion graphics using Adobe Creative Cloud.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-navy-950 text-gold-400 font-bold flex items-center justify-center text-sm">
                    03
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Articulate 360 Authoring</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Engineering triggers, variables, software simulations, screen interactions, and voiceover audio synchronization.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-navy-950 text-gold-400 font-bold flex items-center justify-center text-sm">
                    04
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">QA &amp; LMS Publishing</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Rigorous testing across browsers and SCORM 1.2 / 2004 / xAPI compliance verification on client LMS platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wide transition-colors"
              >
                <span>View Portfolio Projects</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Link>
              <a
                href="/api/resume/download"
                download
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Sidebar: Education & Core Highlights */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-gold-600" />
                <span>Education</span>
              </h3>

              <div className="space-y-4">
                {initialEducation.map((edu, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                    <span className="text-xs font-bold text-gold-700 block mb-1">{edu.period}</span>
                    <h4 className="font-bold text-slate-900 text-sm">{edu.degree}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy-950 text-white p-6 sm:p-8 rounded-3xl border border-navy-800 shadow-md space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Award className="w-5 h-5 text-gold-400" />
                <span>Domain Expertise</span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Extensive track record delivering regulatory compliance, operational workflows, and software adoption courses for banking, financial services, and large enterprises.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-bold hover:bg-gold-500 hover:text-navy-950 transition-all"
                >
                  <span>Inquire for Collaboration</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
