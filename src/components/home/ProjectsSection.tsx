"use client";

import { useState } from "react";
import { FolderGit2, ExternalLink, Sparkles, Layers, Info, CheckCircle, Clock } from "lucide-react";
import { portfolioData, ProjectItem } from "@/lib/data/portfolio-data";

const categories = [
  "All",
  "Web & AI",
  "Apps & Digital Innovation",
  "Digital Learning",
  "Content & Video",
];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { projects } = portfolioData;

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-[#faf9f5] border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              <FolderGit2 className="w-3.5 h-3.5 text-accent-blue" />
              <span>Independent Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
              Selected Work &amp; Prototypes
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-normal">
              A collection of digital learning courseware, independent content ventures, and emerging AI-assisted development workflows.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-navy-950 text-white shadow-xs"
                    : "bg-white text-gray-600 hover:text-navy-950 border border-gray-200/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Tasteful CSS Visual Placeholder / Screenshot Preview */}
              <div className="relative aspect-[16/9] w-full bg-stone-900 overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none">
                {/* Abstract geometric background elements */}
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent-blue/10 rounded-full blur-2xl" />

                <div className="relative z-10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block font-semibold">
                    {project.category}
                  </span>
                  <p className="text-base font-bold text-white max-w-xs mx-auto">
                    {project.imagePlaceholderText}
                  </p>
                  <span className="text-[11px] text-gray-400 block">
                    {project.detailsConfirmed ? "Verified Demonstration" : "Placeholder • Screenshot to be added"}
                  </span>
                </div>

                {/* Badge top right */}
                {project.badge && (
                  <div className="absolute top-4 right-4 bg-navy-950/90 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-gray-700/80">
                    {project.badge}
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-blue">
                      {project.category}
                    </span>

                    {project.detailsConfirmed ? (
                      <span className="inline-flex items-center space-x-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle className="w-3 h-3" />
                        <span>Confirmed Detail</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3" />
                        <span>Details to be added</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-navy-950">{project.title}</h3>

                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Separate Channel Reference note if applicable */}
                {project.channelReference && (
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-gray-600 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-navy-950">
                      <Info className="w-3.5 h-3.5 text-accent-blue" />
                      <span>Separate Channel Reference:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      Listed in resume as an independent channel reference:{" "}
                      <a
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-blue hover:underline font-medium inline-flex items-center space-x-0.5"
                      >
                        <span>@TheEyesChicko</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      . (Note: Displayed as a reference; not assumed to be the sold channel).
                    </p>
                  </div>
                )}

                {/* Tools & Links */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-gray-500 font-medium">
                    <span className="font-semibold text-gray-700">Tools:</span> {project.tools}
                  </div>

                  {project.externalLink && (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-navy-950 hover:text-accent-blue transition-colors"
                    >
                      <span>Visit Channel</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
