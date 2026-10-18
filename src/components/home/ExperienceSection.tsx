import Link from "next/link";
import { Experience } from "@/types";
import { Briefcase, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-md border border-gold-200">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Selected Professional Experience
            </h2>
            <p className="text-slate-600 max-w-2xl text-base">
              A track record of translating complex domain storyboards into interactive, production-ready corporate eLearning modules.
            </p>
          </div>

          <Link
            href="/experience"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-gold-700 hover:text-gold-800 group"
          >
            <span>View Full Experience History</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {exp.is_current && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-bl-lg">
                  Current Position
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{exp.role}</h3>
                  <p className="text-base font-semibold text-gold-600 mt-0.5">{exp.company}</p>
                </div>
                <div className="inline-flex items-center space-x-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg w-fit">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {exp.start_date} – {exp.is_current ? "Present" : exp.end_date}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 text-base leading-relaxed mb-6">{exp.description}</p>

              {/* Responsibilities list */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Key Responsibilities &amp; Delivery Scope:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {exp.responsibilities.slice(0, 6).map((resp, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements if any */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
                  <h5 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                    Verified Outcomes:
                  </h5>
                  <ul className="space-y-1">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-700 font-medium flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
