"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download, ShieldCheck } from "lucide-react";

interface NavbarProps {
  siteTitle?: string;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "YouTube", href: "/youtube" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar({ siteTitle }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not render public navbar on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/90 backdrop-blur-md border-b border-navy-800 shadow-lg shadow-black/20 py-3"
          : "bg-navy-950/70 backdrop-blur-sm border-b border-navy-900 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold text-base tracking-wider transition-all duration-300 group-hover:border-gold-400 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(197,155,39,0.3)]">
              AM
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold tracking-wide text-sm sm:text-base group-hover:text-gold-200 transition-colors">
                AVINASH MISHRA
              </span>
              <span className="text-[11px] text-gray-400 uppercase tracking-widest hidden sm:inline-block">
                eLearning & Design Specialist
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-gold-400 bg-gold-500/10 border-b border-gold-500/30"
                      : "text-gray-300 hover:text-white hover:bg-navy-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="/api/resume/download"
              download
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-semibold text-xs tracking-wide uppercase transition-all duration-200 shadow-md hover:shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>

            <Link
              href="/admin/login"
              title="Admin Panel"
              className="p-2 text-gray-400 hover:text-gold-400 hover:bg-navy-900 rounded-lg transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="/api/resume/download"
              download
              className="p-2 rounded-md bg-gold-500 text-navy-950"
              title="Download Resume"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-navy-900 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950/95 border-b border-navy-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-lg animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? "text-gold-400 bg-gold-500/10 font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-navy-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-navy-800 flex flex-col space-y-2">
            <a
              href="/api/resume/download"
              download
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-gold-500 text-navy-950 font-bold text-sm tracking-wide uppercase"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-navy-900 text-gray-300 text-xs hover:text-white"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Administrator Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
