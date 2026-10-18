import { Skill } from "@/types";
import { Wrench, CheckCircle, Sparkles } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-md border border-gold-200">
            <Wrench className="w-3.5 h-3.5" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Specialized Skills &amp; Creative Toolsets
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Directly sourced from verified enterprise course development, graphic design, and video production workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <div
                key={cat}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-gold-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                    <h3 className="font-bold text-slate-900 text-base">{cat}</h3>
                    <span className="text-xs bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-slate-600 font-semibold">
                      {catSkills.length} tools
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {catSkills.map((skill) => (
                      <li key={skill.id} className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700 flex items-center space-x-2">
                          <CheckCircle className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                          <span>{skill.name}</span>
                        </span>
                        <span className="text-[11px] font-semibold text-gold-700 bg-gold-50 px-2 py-0.5 rounded">
                          {skill.proficiency_level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
