"use client";

import { useState } from "react";
import Image from "next/image";
import { FolderGit2, ExternalLink, Sparkles, Layers, Info, CheckCircle } from "lucide-react";
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
    <section id="projects" className="py-14 sm:py-16 md:py-20 bg-[#faf9f5] border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              <FolderGit2 className="w-3.5 h-3.5 text-accent-blue" />
              <span>Portfolio Work &amp; Prototypes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
              Selected Projects &amp; Case Studies
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal">
              A curated collection of digital learning courseware, interactive application prototypes, and content creation workflows.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Visual Project Thumbnail Header */}
              <div className="relative aspect-[16/9] w-full bg-navy-950 overflow-hidden">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-navy-950 text-gold-400">
                    <FolderGit2 className="w-10 h-10" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                  <span className="text-[11px] font-mono uppercase font-bold text-gold-400 tracking-wider">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-navy-950/90 border border-white/20 text-white shadow-sm">
                      {project.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-blue">
                      {project.category}
                    </span>

                    <span className="inline-flex items-center space-x-1 text-[11px] text-accent-blue font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      <CheckCircle className="w-3 h-3 text-accent-blue" />
                      <span>{project.statusText || "Featured Case"}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-navy-950 leading-snug">{project.title}</h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
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
