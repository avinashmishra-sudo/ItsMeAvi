import Link from "next/link";
import { Download, ArrowRight, Sparkles, CheckCircle2, Linkedin, Youtube, Mail } from "lucide-react";
import { Profile, SiteSettings } from "@/types";

interface HeroSectionProps {
  profile: Profile;
  settings: SiteSettings;
}

export default function HeroSection({ profile, settings }: HeroSectionProps) {
  return (
    <section className="relative bg-navy-950 text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-navy-800">
      {/* Background Decorative Grid and Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full gold-gradient-badge text-gold-300 text-xs sm:text-sm font-medium tracking-wide animate-fadeIn">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Senior Graphic Designer &amp; eLearning Developer</span>
          </div>

          {/* Name & Headline */}
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-gold-400 font-semibold">
              {profile.full_name}
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              {profile.hero_headline}
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-normal">
            {profile.hero_description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={profile.cta_primary_url || "/projects"}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-sm tracking-wide uppercase shadow-lg shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>{profile.cta_primary_label || "View My Work"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="/api/resume/download"
              download
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-gold-300 hover:text-white border border-gold-500/30 hover:border-gold-400 font-semibold text-sm tracking-wide transition-all duration-200"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>{profile.cta_secondary_label || "Download Resume"}</span>
            </a>
          </div>

          {/* Key Value Badges */}
          <div className="pt-8 border-t border-navy-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Articulate 360 &amp; Storyline Specialist</span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>BFSI Corporate Training Domain</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center space-x-2 text-xs sm:text-sm text-gray-300 justify-center sm:justify-start">
              <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Adobe Creative Cloud Suite</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-4 pt-2">
            {settings.linkedin_url && (
              <a
                href={settings.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-navy-900 border border-navy-800 text-gray-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {settings.youtube_url && (
              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-navy-900 border border-navy-800 text-gray-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                title="YouTube Channel (@TheEyesChicko)"
              >
                <Youtube className="w-5 h-5" />
              </a>
            )}
            <Link
              href="/contact"
              className="p-2.5 rounded-lg bg-navy-900 border border-navy-800 text-gray-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              title="Contact Avinash"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
