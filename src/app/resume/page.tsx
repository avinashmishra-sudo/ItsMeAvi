import { Metadata } from "next";
import { getPublishedResume, getProfile, getExperiences, getSkills } from "@/lib/data";
import { initialEducation } from "@/lib/data/initial-data";
import { FileText, Download, Briefcase, GraduationCap, Wrench, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume & Qualifications",
  description:
    "Official resume of Avinash Mishra: Senior Graphic Designer, eLearning Developer, Articulate 360 specialist with TCS background.",
};

export default async function ResumePage() {
  const [resume, profile, experiences, skills] = await Promise.all([
    getPublishedResume(),
    getProfile(),
    getExperiences(false),
    getSkills(),
  ]);

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-navy-950 text-white py-16 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-400 uppercase bg-navy-900 px-3 py-1 rounded-md border border-gold-500/30">
                <FileText className="w-3.5 h-3.5 text-gold-400" />
                <span>Curriculum Vitae</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Official Resume
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed font-normal">
                {resume?.version_label || "Senior Graphic Designer & eLearning Specialist"}
              </p>
            </div>

            <a
              href="/api/resume/download"
              download
              className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-sm tracking-wide uppercase shadow-lg shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-fit"
            >
              <Download className="w-5 h-5" />
              <span>Download Official PDF</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200 shadow-sm space-y-12">
          {/* Header Inside Resume Document */}
          <div className="border-b border-slate-200 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {profile.full_name}
              </h2>
              <p className="text-base sm:text-lg font-bold text-gold-600 mt-1">{profile.title}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 mt-2">
                <span>{profile.email}</span>
                <span>•</span>
                <span>{profile.phone}</span>
                <span>•</span>
                <span>linkedin.com/in/avinashmishraa</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Published Version • Verified 2026</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
              Professional Summary
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">{profile.about_text}</p>
          </div>

          {/* Core Skills & Expertise */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-gold-600" />
              <span>Core Skills &amp; Expertise</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat);
                return (
                  <div key={cat} className="space-y-2">
                    <h4 className="text-sm font-bold text-navy-950">{cat}</h4>
                    <ul className="space-y-1">
                      {catSkills.map((s) => (
                        <li key={s.id} className="text-xs sm:text-sm text-slate-600 flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 flex-shrink-0 mt-0.5" />
                          <span>{s.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-gold-600" />
              <span>Professional Experience</span>
            </h3>

            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                    <p className="text-sm font-semibold text-gold-700">{exp.company}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {exp.start_date} – {exp.is_current ? "Present" : exp.end_date}
                  </span>
                </div>

                <p className="text-sm text-slate-600">{exp.description}</p>

                {exp.responsibilities && (
                  <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-slate-600">
                    {exp.responsibilities.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-gold-600" />
              <span>Education</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {initialEducation.map((edu, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-xs font-bold text-gold-700 block mb-1">{edu.period}</span>
                  <h4 className="font-bold text-slate-900 text-sm">{edu.degree}</h4>
                  <p className="text-xs text-slate-600 mt-1">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Verified document maintained through secure administrative panel.
            </p>
            <a
              href="/api/resume/download"
              download
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
