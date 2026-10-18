import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import { FolderGit2, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-md border border-gold-200">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Featured Work &amp; Case Studies
            </h2>
            <p className="text-slate-600 max-w-2xl text-base">
              Verified corporate eLearning modules, software simulations, and graphic design frameworks.
            </p>
          </div>

          <Link
            href="/projects"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-gold-700 hover:text-gold-800 group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Project Image Preview */}
              <div className="relative aspect-[16/10] w-full bg-navy-950 overflow-hidden border-b border-slate-100">
                {project.thumbnail_url ? (
                  <Image
                    src={project.thumbnail_url}
                    alt={project.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <span>Project Preview</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-md text-gold-400 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/30">
                  {project.category}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-gold-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">{project.summary}</p>
                </div>

                {/* Verified Results Badge */}
                {project.verified_results && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-700 font-medium flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{project.verified_results}</span>
                  </div>
                )}

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies?.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/projects#${project.slug}`}
                    className="text-xs font-bold text-navy-900 hover:text-gold-600 inline-flex items-center space-x-1"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {project.external_link && (
                    <a
                      href={project.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-500 hover:text-gold-600 inline-flex items-center space-x-1"
                    >
                      <span>External Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
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
