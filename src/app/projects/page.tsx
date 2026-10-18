import { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/data";
import { FolderGit2, CheckCircle, ExternalLink, Sparkles, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Portfolio",
  description:
    "Explore featured eLearning courses, software simulations, and graphic design frameworks authored by Avinash Mishra.",
};

export default async function ProjectsPage() {
  const projects = await getProjects(false); // all published projects

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-navy-950 text-white py-16 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-400 uppercase bg-navy-900 px-3 py-1 rounded-md border border-gold-500/30">
              <FolderGit2 className="w-3.5 h-3.5 text-gold-400" />
              <span>Portfolio &amp; Case Studies</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Projects &amp; Authoring Work
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed font-normal">
              A curated selection of interactive eLearning simulations, corporate brand identity systems, and multimedia productions created for enterprise clients.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {projects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={project.id}
                id={project.slug}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 scroll-mt-32"
              >
                {/* Visual Preview */}
                <div
                  className={`lg:col-span-6 bg-navy-950 relative aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-full ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {project.thumbnail_url ? (
                    <Image
                      src={project.thumbnail_url}
                      alt={project.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <span>No Preview Available</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-md text-gold-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-gold-500/30">
                    {project.category}
                  </div>
                </div>

                {/* Case Study Details */}
                <div
                  className={`lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block">
                      Case Study • {project.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{project.title}</h2>
                    <p className="text-base text-slate-600 leading-relaxed font-medium">
                      {project.summary}
                    </p>
                    {project.description && (
                      <p className="text-sm text-slate-500 leading-relaxed">{project.description}</p>
                    )}
                  </div>

                  {/* Responsibilities */}
                  {project.responsibilities && project.responsibilities.length > 0 && (
                    <div className="space-y-2.5">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                        <Layers className="w-3.5 h-3.5 text-gold-500" />
                        <span>Core Deliverables &amp; Responsibilities:</span>
                      </h3>
                      <ul className="space-y-1.5">
                        {project.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Verified Results */}
                  {project.verified_results && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs sm:text-sm text-slate-800 font-semibold flex items-start space-x-3">
                      <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-0.5">
                          Verified Project Impact
                        </span>
                        <span>{project.verified_results}</span>
                      </div>
                    </div>
                  )}

                  {/* Tech stack & External Link */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.external_link && (
                      <a
                        href={project.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-gold-700 hover:text-gold-800 bg-gold-50 hover:bg-gold-100 px-3 py-1.5 rounded-lg border border-gold-200 transition-colors"
                      >
                        <span>View Project Resource</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
