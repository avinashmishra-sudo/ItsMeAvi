import { Metadata } from "next";
import { getExperiences } from "@/lib/data";
import { Briefcase, Calendar, CheckCircle2, Award, Download, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Experience",
  description:
    "Verified professional career history of Avinash Mishra at Tata Consultancy Services (TCS) and Sanskruti TV.",
};

export default async function ExperiencePage() {
  const experiences = await getExperiences(false); // get all published

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-navy-950 text-white py-16 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-400 uppercase bg-navy-900 px-3 py-1 rounded-md border border-gold-500/30">
              <Briefcase className="w-3.5 h-3.5 text-gold-400" />
              <span>Career History</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Professional Experience
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed font-normal">
              A chronological history of roles, key achievements, and verified responsibilities across enterprise corporate eLearning and broadcast media operations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm relative overflow-hidden"
          >
            {exp.is_current && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[11px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl-xl shadow-sm">
                Active Position
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{exp.role}</h2>
                <p className="text-lg font-semibold text-gold-600 mt-1">{exp.company}</p>
                {exp.location && <p className="text-xs text-slate-500 mt-0.5">{exp.location}</p>}
              </div>

              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl h-fit">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>
                  {exp.start_date} – {exp.is_current ? "Present" : exp.end_date}
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-base leading-relaxed mb-8">{exp.description}</p>

            {/* Responsibilities */}
            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <div className="space-y-4 mb-8">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  <span>Verified Responsibilities &amp; Delivery Scope:</span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Achievements */}
            {exp.achievements && exp.achievements.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 space-y-3">
                <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gold-600" />
                  <span>Key Outcomes &amp; Achievements:</span>
                </h4>
                <ul className="space-y-2">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="text-sm text-slate-700 font-medium flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* Download Resume banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-navy-800">
          <div>
            <h3 className="text-xl font-bold text-white">Need a Formal PDF Copy of My Career History?</h3>
            <p className="text-sm text-gray-400 mt-1">
              Download the verified resume with complete credentials, contact information, and toolsets.
            </p>
          </div>
          <a
            href="/api/resume/download"
            download
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-colors flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Resume</span>
          </a>
        </div>
      </div>
    </div>
  );
}
