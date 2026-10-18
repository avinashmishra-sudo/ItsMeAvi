import { GraduationCap, Award } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export default function EducationSection() {
  const { education } = portfolioData;

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-white border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
            <GraduationCap className="w-3.5 h-3.5 text-accent-blue" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
            Education
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal">
            Formal qualifications connecting computer applications and investigative journalism.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-accent-blue/40 hover:shadow-xs transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-accent-blue font-mono">{edu.year}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                  Verified Degree
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-950">{edu.degree}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
