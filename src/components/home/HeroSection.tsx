import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Download, Sparkles, Layers, Cpu, Compass, BookOpen, Video } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export default function HeroSection() {
  const { meta, contact } = portfolioData;

  return (
    <section id="home" className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 overflow-hidden bg-[#faf9f5] border-b border-gray-200/60">
      {/* Subtle Ambient Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
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

          {/* Right Column: Editorial Portrait & Professional Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md w-full bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-sm space-y-5">
              {/* Top Accent Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] font-mono uppercase text-gray-500 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Available for Senior Roles</span>
                </div>
              </div>

              {/* Portrait Image Frame */}
              <div className="relative w-full aspect-[4/4.2] rounded-2xl overflow-hidden bg-stone-100 border border-gray-200/80 shadow-inner group">
                <Image
                  src="/images/profile.jpg"
                  alt="Avinash Mishra — Multidisciplinary Marketing & Communication Professional"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Overlay Badge at bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="backdrop-blur-md bg-navy-950/75 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white tracking-tight">Avinash Mishra</p>
                      <p className="text-[11px] text-gold-400 font-medium">10+ Years Practice</p>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-accent-blue/80 text-white px-2 py-0.5 rounded tracking-wider">
                      India
                    </span>
                  </div>
                </div>
              </div>

              {/* Composition Matrix */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 space-y-0.5">
                    <span className="text-[10px] font-bold text-accent-blue uppercase tracking-wider flex items-center space-x-1">
                      <Layers className="w-3 h-3" />
                      <span>Strategy</span>
                    </span>
                    <p className="text-xs font-bold text-navy-950">Brand &amp; Content</p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 space-y-0.5">
                    <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider flex items-center space-x-1">
                      <Cpu className="w-3 h-3" />
                      <span>Delivery</span>
                    </span>
                    <p className="text-xs font-bold text-navy-950">Digital Learning &amp; AI</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950 text-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                      Cross-Disciplinary Mindset
                    </span>
                    <Compass className="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    &ldquo;Self-directed learner comfortable taking early-stage work from initial setup to execution.&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Metrics */}
              <div className="pt-1 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
                <span>BFSI • E-Comm • Media • TV</span>
                <span className="font-semibold text-navy-950">Strategy Meets Execution</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
