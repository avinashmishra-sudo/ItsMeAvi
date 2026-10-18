"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Expertise", href: "/#expertise" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not render on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#faf9f5]/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm py-3"
          : "bg-[#faf9f5]/80 backdrop-blur-sm border-b border-gray-200/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Handwritten Signature Script Logo */}
          <Link href="/#home" className="flex items-center space-x-3 group">
            <div className="h-10 w-36 sm:w-44 relative flex items-center">
              <Image
                src="/images/logo.png"
                alt="Avinash Mishra Signature Logo"
                fill
                priority
                className="object-contain object-left invert mix-blend-multiply group-hover:opacity-80 transition-opacity"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium text-gray-700 hover:text-navy-950 hover:bg-gray-100/70 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Understated "View Resume" Button */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={portfolioData.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-navy-950 hover:bg-navy-900 text-cream-50 font-medium text-xs tracking-wide transition-all shadow-sm hover:shadow"
            >
              <FileText className="w-3.5 h-3.5 text-gold-400" />
              <span>{portfolioData.meta.viewResumeCta}</span>
              <ArrowUpRight className="w-3 h-3 text-gray-400" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href={portfolioData.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-md bg-navy-950 text-cream-50 text-xs font-medium"
            >
              Resume
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-navy-950 hover:bg-gray-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf9f5] border-b border-gray-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-navy-950 hover:bg-gray-100 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-200">
            <a
              href={portfolioData.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-navy-950 text-white font-medium text-xs tracking-wide uppercase"
            >
              <FileText className="w-4 h-4 text-gold-400" />
              <span>{portfolioData.meta.viewResumeCta}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
