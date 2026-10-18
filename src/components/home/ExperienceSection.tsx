import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export default function ExperienceSection() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 bg-white border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
            <Briefcase className="w-3.5 h-3.5 text-accent-blue" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
            10+ Years Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-normal">
            A track record of contributions across enterprise BFSI marketing, broadcast media operations, investigative journalism, and e-commerce content.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-10">
          {experience.map((item, idx) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-gray-300 transition-all space-y-6 relative overflow-hidden"
            >
              {item.isCurrent && (
                <div className="absolute top-0 right-0 bg-navy-950 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                  Current Role
                </div>
              )}

              {/* Company & Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200 pb-5">
                <div>
                  <h3 className="text-2xl font-bold text-navy-950">{item.role}</h3>
                  <p className="text-base font-semibold text-accent-blue mt-0.5">{item.company}</p>
                </div>
                <div className="inline-flex items-center space-x-1.5 text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded-lg border border-stone-200 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Reported Metrics (Restrained editorial layout) */}
              {item.metrics && item.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                  {item.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-xl bg-white border border-stone-200/80 space-y-1"
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

              {/* Bullet Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
