import Link from "next/link";
import { ArrowDown, Download, Sparkles, Layers, Cpu, Compass, BookOpen, Video } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export default function HeroSection() {
  const { meta, contact } = portfolioData;

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#faf9f5] border-b border-gray-200/60">
      {/* Subtle Ambient Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-charcoal-800 text-[11px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></span>
              <span>{meta.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-navy-950 leading-[1.12]">
              {meta.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl font-normal">
              {meta.supportingText}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow"
              >
                <span>{meta.primaryCta}</span>
                <ArrowDown className="w-4 h-4 text-gold-400" />
              </Link>

              <a
                href={contact.resumeUrl}
                download
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-gray-800 border border-gray-300 font-semibold text-xs tracking-wider uppercase transition-all shadow-xs"
              >
                <Download className="w-4 h-4 text-gray-500" />
                <span>{meta.secondaryCta}</span>
              </a>
            </div>

            {/* Capability Line */}
            <div className="pt-4 border-t border-gray-200/80">
              <p className="text-xs sm:text-[13px] font-medium text-gray-600 tracking-wide">
                {meta.capabilityLine}
              </p>
            </div>
          </div>

          {/* Right Column: Sophisticated Typography & Abstract Shapes Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md w-full bg-white rounded-3xl border border-gray-200/80 p-8 shadow-sm space-y-6">
              {/* Top Accent Bar */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-accent-blue" />
                  <div className="w-3 h-3 rounded-full bg-gold-500" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                </div>
                <span className="text-[11px] font-mono uppercase text-gray-400 tracking-widest">
                  10+ Years Practice
                </span>
              </div>

              {/* Composition Matrix */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-1">
                  <span className="text-[10px] font-bold text-accent-blue uppercase tracking-wider block">
                    Strategic Focus
                  </span>
                  <p className="text-sm font-bold text-navy-950">
                    Content Marketing &amp; Brand Storytelling
                  </p>
                  <p className="text-xs text-gray-500">
                    Campaign planning, narrative positioning, and multi-stakeholder messaging.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1">
                    <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider flex items-center space-x-1">
                      <Layers className="w-3 h-3" />
                      <span>Delivery</span>
                    </span>
                    <p className="text-xs font-bold text-navy-950">Digital Learning</p>
                    <p className="text-[11px] text-gray-500">Storyline &amp; Captivate</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1">
                    <span className="text-[10px] font-bold text-accent-blue uppercase tracking-wider flex items-center space-x-1">
                      <Cpu className="w-3 h-3" />
                      <span>Innovation</span>
                    </span>
                    <p className="text-xs font-bold text-navy-950">AI Workflows</p>
                    <p className="text-[11px] text-gray-500">Prototyping &amp; Web</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-navy-950 text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                      Cross-Disciplinary Mindset
                    </span>
                    <Compass className="w-4 h-4 text-gold-400" />
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    &ldquo;Self-directed learner comfortable taking early-stage work from initial setup to execution.&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Metrics */}
              <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
                <span>BFSI • E-Comm • Media • TV</span>
                <span className="font-semibold text-navy-950">India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
