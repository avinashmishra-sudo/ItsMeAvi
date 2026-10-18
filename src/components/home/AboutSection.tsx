import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export default function AboutSection() {
  const { about } = portfolioData;

  return (
    <section id="about" className="py-14 sm:py-16 md:py-20 bg-white border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
              <span>Philosophy &amp; Mindset</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight leading-tight">
              {about.heading}
            </h2>

            <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
              {about.copy.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Three Concise Principles */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Three Guiding Principles
            </h3>

            {about.principles.map((principle, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-accent-blue/40 transition-colors space-y-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-navy-950 text-white font-mono text-xs font-bold flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-navy-950">{principle.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
