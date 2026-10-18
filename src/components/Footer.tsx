import Link from "next/link";
import Image from "next/image";
import { Mail, Linkedin, Youtube, ArrowUpRight, Shield, FileText } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { meta, contact } = portfolioData;

  return (
    <footer className="bg-navy-950 text-gray-300 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Logo & Headline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="h-10 w-44 relative flex items-center">
              <Image
                src="/images/logo.png"
                alt="Avinash Mishra Signature Logo"
                fill
                className="object-contain object-left mix-blend-screen"
              />
            </div>
            <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
              {meta.eyebrow}
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm font-normal">
              10+ years across BFSI, e-commerce, television, and digital learning. Connecting strategy, storytelling, creative execution, and technology.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-400">
              <li>
                <Link href="/#home" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#expertise" className="hover:text-white transition-colors">
                  Expertise
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-white transition-colors">
                  Projects &amp; Prototypes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Articles &amp; Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Resume */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Connect &amp; Assets
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center space-x-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-accent-blue" />
                  <span>{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-accent-blue" />
                  <span>linkedin.com/in/avinashmishraa</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href={contact.youtubeChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-white transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span>@TheEyesChicko</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={contact.resumeUrl}
                download
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-navy-900 border border-gray-700 text-xs font-semibold text-gray-200 hover:text-white hover:border-gold-500/50 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-gold-400" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {currentYear} Avinash Mishra. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <Link
              href="/admin/login"
              className="inline-flex items-center space-x-1 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
