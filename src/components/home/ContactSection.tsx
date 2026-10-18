import { Mail, Linkedin, ArrowUpRight, MessageSquare, Phone, MapPin } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export default function ContactSection() {
  const { contact } = portfolioData;

  return (
    <section id="contact" className="py-14 sm:py-16 md:py-20 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-navy-800 shadow-lg space-y-8 sm:space-y-10 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-400 uppercase bg-navy-900 px-3 py-1 rounded-md border border-gold-500/30">
              <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {contact.heading}
            </h2>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-2xl">
              {contact.supportingText}
            </p>
          </div>

          {/* Action Buttons & Direct Channels */}
          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-xl bg-white hover:bg-stone-100 text-navy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow"
            >
              <Mail className="w-4 h-4 text-accent-blue" />
              <span>Send an Email</span>
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white border border-gray-700 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Linkedin className="w-4 h-4 text-accent-blue" />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
            </a>
          </div>

          {/* Direct Detail Tokens */}
          <div className="relative z-10 pt-8 border-t border-navy-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-300">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 block font-semibold">Email</span>
                <a href={`mailto:${contact.email}`} className="text-white hover:text-gold-300 font-medium">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 block font-semibold">Phone</span>
                <a href={`tel:${contact.phone}`} className="text-white hover:text-gold-300 font-medium">
                  {contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 block font-semibold">Location</span>
                <span className="text-white font-medium">{contact.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
