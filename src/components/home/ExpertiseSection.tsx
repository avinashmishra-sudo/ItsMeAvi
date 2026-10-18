import {
  TrendingUp,
  Megaphone,
  FileText,
  Video,
  GraduationCap,
  Cpu,
  BarChart3,
  Palette,
  Server,
  Layers,
  CheckCircle,
} from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Megaphone,
  FileText,
  Video,
  GraduationCap,
  Cpu,
  BarChart3,
  Palette,
  Server,
};

export default function ExpertiseSection() {
  const { expertise, skillGroups } = portfolioData;

  return (
    <section id="expertise" className="py-14 sm:py-16 md:py-20 bg-[#faf9f5] border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
            <Layers className="w-3.5 h-3.5 text-accent-blue" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
            Six Multidisciplinary Expertise Areas
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-normal">
            A balanced skill set spanning brand building, communications, editorial planning, multimedia assets, instructional design, and emerging AI tools.
          </p>
        </div>

        {/* 6 Primary Expertise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map((area) => {
            const IconComponent = iconMap[area.iconName] || Layers;

            return (
              <div
                key={area.id}
                className="bg-white rounded-2xl p-7 border border-gray-200/80 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-navy-950">
                    <IconComponent className="w-6 h-6 text-navy-950" />
                  </div>

                  <h3 className="text-xl font-bold text-navy-950">{area.title}</h3>

                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {area.description}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1.5">
                    {area.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-medium bg-stone-100 text-gray-700 px-2.5 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Specialized Skill Groups */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-bold text-navy-950 uppercase tracking-wider">
              Specialized Toolsets &amp; Technical Fundamentals
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Platforms, analytics, and operational systems used across real-world workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillGroups.map((group, gIdx) => {
              const GroupIcon = iconMap[group.iconName] || Layers;

              return (
                <div key={gIdx} className="space-y-3">
                  <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider flex items-center space-x-2">
                    <GroupIcon className="w-4 h-4 text-accent-blue" />
                    <span>{group.title}</span>
                  </h4>

                  <ul className="space-y-2">
                    {group.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center space-x-2 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-blue flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
