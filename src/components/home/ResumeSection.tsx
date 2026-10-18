import Link from "next/link";
import { ResumeVersion } from "@/types";
import { FileText, Download, CheckCircle, ShieldCheck, ArrowRight } from "lucide-react";

interface ResumeSectionProps {
  resume: ResumeVersion | null;
  downloadLabel?: string;
}

export default function ResumeSection({
  resume,
  downloadLabel = "Download Full Resume (PDF)",
}: ResumeSectionProps) {
  const formattedSize = resume?.file_size_bytes
    ? `${(resume.file_size_bytes / 1024).toFixed(0)} KB`
    : "266 KB";

  const updatedDate = resume?.published_at
    ? new Date(resume.published_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "October 2026";

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-navy-800 shadow-xl">
          {/* Decorative background glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-400 uppercase bg-navy-900/80 px-3 py-1 rounded-md border border-gold-500/30">
                <FileText className="w-3.5 h-3.5 text-gold-400" />
                <span>Verified Curriculum Vitae</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Comprehensive Professional Resume
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Review verified details of my roles at Tata Consultancy Services (TCS) and Sanskruti TV, specialized Articulate 360 toolset mastery, and BFSI digital learning accomplishments.
              </p>

              {/* Version metadata badge */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-2">
                <div className="flex items-center space-x-1.5 bg-navy-900/60 px-3 py-1 rounded-lg border border-navy-800">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span className="text-gray-200 font-medium">
                    {resume?.version_label || "Senior Graphic Designer & eLearning Specialist"}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Published: {updatedDate}</span>
                </div>
                <div>Format: PDF ({formattedSize})</div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-4">
              <a
                href="/api/resume/download"
                download
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-sm tracking-wide uppercase shadow-lg shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                <span>{downloadLabel}</span>
              </a>

              <Link
                href="/resume"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-gray-200 hover:text-white border border-navy-700 text-xs font-semibold tracking-wide transition-colors"
              >
                <span>Read Full Resume Online</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
