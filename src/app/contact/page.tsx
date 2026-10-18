import { Metadata } from "next";
import { getSiteSettings, getProfile } from "@/lib/data";
import ContactSection from "@/components/home/ContactSection";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Avinash Mishra for corporate eLearning development, Articulate 360 projects, and creative graphic design opportunities.",
};

export default async function ContactPage() {
  const [settings, profile] = await Promise.all([getSiteSettings(), getProfile()]);

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-navy-950 text-white py-16 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-400 uppercase bg-navy-900 px-3 py-1 rounded-md border border-gold-500/30">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Connect Directly</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Contact &amp; Inquiries
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed font-normal">
              Have an eLearning initiative, corporate training module, or creative multimedia project? Let&apos;s talk.
            </p>
          </div>
        </div>
      </div>

      <ContactSection settings={settings} profile={profile} />
    </div>
  );
}
