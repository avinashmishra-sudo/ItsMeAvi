import { Profile } from "@/types";
import { BookOpen, GraduationCap, Award, Layers } from "lucide-react";
import { initialEducation } from "@/lib/data/initial-data";

interface SummarySectionProps {
  profile: Profile;
}

export default function SummarySection({ profile }: SummarySectionProps) {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading and verified summary */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-md border border-gold-200">
              <Layers className="w-3.5 h-3.5" />
              <span>Professional Summary</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Bridging Visual Excellence and Pedagogical Impact
            </h2>
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>{profile.summary_text}</p>
              <p className="text-slate-600 text-base">
                With a background combining Computer Applications (BCA) and Journalism, I approach eLearning not just as a slide-building exercise, but as a discipline of structured storytelling, interactive engagement, and cognitive clarity.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              <div>
                <p className="text-3xl font-extrabold text-navy-900">8+ Years</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Design &amp; eLearning</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-navy-900">BFSI</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Domain Focus</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-3xl font-extrabold text-navy-900">SCORM/xAPI</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">LMS Publishing</p>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Credentials & Education */}
          <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-gold-600" />
              <span>Academic &amp; Professional Foundation</span>
            </h3>

            <div className="space-y-4">
              {initialEducation.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-slate-200/60 shadow-sm hover:border-gold-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-gold-700 font-semibold mb-1">
                    <span>{edu.period}</span>
                    <span className="bg-gold-50 px-2 py-0.5 rounded border border-gold-200">Verified</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{edu.degree}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-navy-950 text-white rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-gold-400 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Primary Work Experience</span>
              </div>
              <p className="text-sm font-semibold text-gray-100">
                Tata Consultancy Services (TCS) &amp; Professional Projects
              </p>
              <p className="text-xs text-gray-400">
                March 2019 – Present • Graphic Designer / eLearning Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
