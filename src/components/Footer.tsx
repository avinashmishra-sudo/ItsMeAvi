import Link from "next/link";
import { Mail, Phone, Linkedin, Youtube, Shield, ArrowUpRight } from "lucide-react";
import { SiteSettings, Profile } from "@/types";

interface FooterProps {
  settings?: SiteSettings;
  profile?: Profile;
}

export default function Footer({ settings, profile }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const email = profile?.email || settings?.contact_email || "avimishra890@gmail.com";
  const phone = profile?.phone || settings?.contact_phone || "+91-8905056633";
  const linkedin = settings?.linkedin_url || "https://linkedin.com/in/avinashmishraa";
  const youtube = settings?.youtube_url || "https://www.youtube.com/@TheEyesChicko";

  return (
    <footer className="bg-navy-950 text-gray-300 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold text-base tracking-wider">
                AM
              </div>
              <div>
                <span className="text-white font-bold tracking-wide text-base">AVINASH MISHRA</span>
                <p className="text-xs text-gold-400 font-medium">Senior Graphic Designer & eLearning Specialist</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Specialized in Articulate 360, instructional simulations, BFSI digital learning solutions, and creative multimedia operations.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/20 text-xs text-gold-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Available for senior roles & consultations</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-widest mb-4">
              Explore Portfolio
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  About & Background
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-gold-400 transition-colors">
                  Professional Experience
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-gold-400 transition-colors">
                  Featured Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/youtube" className="hover:text-gold-400 transition-colors">
                  YouTube Video Channel
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-gold-400 transition-colors">
                  Resume Overview & Download
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div>
            <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-widest mb-4">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center space-x-2 text-gray-300 hover:text-gold-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="truncate">{email}</span>
                </a>
              </li>
              {phone && (
                <li>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center space-x-2 text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>{phone}</span>
                  </a>
                </li>
              )}
              <li>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-gold-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>linkedin.com/in/avinashmishraa</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-gold-400 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>@TheEyesChicko</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Resume & Verification */}
          <div>
            <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-widest mb-4">
              Verified Credentials
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              TCS Experience • Sanskruti TV • PG Diploma in Journalism • Bachelor of Computer Applications (BCA).
            </p>
            <a
              href="/api/resume/download"
              download
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-navy-900 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-navy-950 font-medium text-xs transition-all duration-200 w-full justify-center"
            >
              <span>Download Published Resume (PDF)</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {currentYear} Avinash Mishra. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/login"
              className="inline-flex items-center space-x-1 hover:text-gold-400 transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
