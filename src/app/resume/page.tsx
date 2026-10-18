import { Metadata } from "next";
import Image from "next/image";
import { FileText, Download, Briefcase, GraduationCap, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export const metadata: Metadata = {
  title: "Resume & Curriculum Vitae",
  description:
    "Official resume of Avinash Mishra: Multidisciplinary marketing, communication, content, creative production, and digital learning professional.",
};

export default function ResumePage() {
  const { meta, contact, about, expertise, skillGroups, experience, education, strengths, industries } =
    portfolioData;

  return (
    <div className="bg-[#faf9f5] min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200/60 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                <FileText className="w-3.5 h-3.5 text-accent-blue" />
                <span>Curriculum Vitae</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy-950">
                Official Resume
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                {meta.eyebrow} • 10+ Years Experience
              </p>
            </div>

            <a
              href={contact.resumeUrl}
              download
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm w-fit"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>Download Official PDF</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-gray-200/80 shadow-xs space-y-12">
          {/* Header inside Resume */}
          <div className="border-b border-gray-100 pb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-stone-100 border border-gray-200/80 shadow-xs flex-shrink-0">
                <Image
                  src="/images/profile.jpg"
                  alt={meta.name}
                  fill
                  className="object-cover object-center"
                  sizes="96px"
                />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
                  {meta.name}
                </h2>
                <p className="text-sm font-bold text-accent-blue mt-1 uppercase tracking-wider">
                  {meta.eyebrow}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2 font-medium">
                  <span>{contact.location}</span>
                  <span>•</span>
                  <span>{contact.phone}</span>
                  <span>•</span>
                  <a href={`mailto:${contact.email}`} className="text-navy-950 hover:underline">
                    {contact.email}
                  </a>
                  <span>•</span>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-950 hover:underline"
                  >
                    linkedin.com/in/avinashmishraa/
                  </a>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 bg-stone-50 border border-stone-200 px-3.5 py-1.5 rounded-xl text-xs text-gray-700 font-semibold self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Master Resume Draft</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-gray-100 pb-2">
              Professional Summary
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              {meta.supportingText}
            </p>
          </div>

          {/* Core Skills */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-gray-100 pb-2">
              Core Skills &amp; Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expertise.map((area) => (
                <div key={area.id} className="text-xs space-y-1">
                  <span className="font-bold text-navy-950 block">{area.title}:</span>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Strengths */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-gray-100 pb-2">
              Professional Strengths
            </h3>
            <ul className="space-y-2">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue flex-shrink-0 mt-0.5" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Experience */}
          <div className="space-y-8">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-gray-100 pb-2">
              Professional Experience
            </h3>

            {experience.map((exp) => (
              <div key={exp.id} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h4 className="text-base font-bold text-navy-950">{exp.role}</h4>
                    <p className="text-sm font-semibold text-accent-blue">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{exp.duration}</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-700">{exp.description}</p>

                {exp.highlights && (
                  <ul className="space-y-1 pl-4 list-disc text-xs text-gray-600">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-gray-100 pb-2">
              Education
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="text-xs font-mono font-bold text-accent-blue block mb-0.5">
                    {edu.year}
                  </span>
                  <h4 className="font-bold text-navy-950 text-sm">{edu.degree}</h4>
                  <p className="text-xs text-gray-600 mt-1">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              Verified document hosted directly on the server at <code className="bg-stone-100 px-1 py-0.5 rounded">/resume.pdf</code>.
            </p>
            <a
              href={contact.resumeUrl}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>Download PDF Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
