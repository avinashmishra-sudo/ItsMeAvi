import { Metadata } from "next";
import { Briefcase, Calendar, CheckCircle2, Download } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "10+ years professional career timeline of Avinash Mishra across TCS, Sanskruti TV, Hamari Mahek, and SareesBazaar.com.",
};

export default function ExperiencePage() {
  const { experience, contact } = portfolioData;

  return (
    <div className="bg-[#faf9f5] min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200/60 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              <Briefcase className="w-3.5 h-3.5 text-accent-blue" />
              <span>Career Trajectory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy-950">
              Professional Experience
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              A comprehensive chronicle of marketing, communication, content operations, and journalistic reporting experience.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-6 sm:space-y-8">
        {experience.map((item) => (
          <div
            key={item.id}
            className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-6 relative overflow-hidden"
          >
            {item.isCurrent && (
              <div className="absolute top-0 right-0 bg-navy-950 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                Current Position
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-gray-100 pb-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-950">{item.role}</h2>
                <p className="text-base font-semibold text-accent-blue mt-0.5">{item.company}</p>
              </div>
              <div className="inline-flex items-center space-x-1.5 text-xs text-gray-500 font-medium bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200 w-fit">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>{item.duration}</span>
              </div>
            </div>

            <p className="text-base text-gray-700 leading-relaxed font-normal">
              {item.description}
            </p>

            {/* Metrics */}
            {item.metrics && item.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                {item.metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1"
                  >
                    <span className="text-xl sm:text-2xl font-bold text-navy-950 block">
                      {m.value}
                    </span>
                    <span className="text-[11px] font-medium text-gray-500 leading-snug block">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <ul className="space-y-2.5 pt-2">
                {item.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start space-x-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Download Resume banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-navy-800">
          <div>
            <h3 className="text-xl font-bold text-white">Need My Official Curriculum Vitae?</h3>
            <p className="text-sm text-gray-400 mt-1">
              Download the complete resume PDF with full career details and contact information.
            </p>
          </div>
          <a
            href={contact.resumeUrl}
            download
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-navy-950 font-bold text-xs uppercase tracking-wider transition-colors flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
