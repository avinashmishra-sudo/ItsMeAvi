import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { portfolioData } from "@/lib/data/portfolio-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: portfolioData.meta.title,
    template: `%s | Avinash Mishra`,
  },
  description: portfolioData.meta.description,
  keywords: [
    "Avinash Mishra",
    "Marketing Manager",
    "Corporate Communications",
    "Content Strategy",
    "Digital Learning",
    "Articulate Storyline",
    "Creative Production",
    "BFSI Marketing",
    "AI-Assisted Digital Creation",
  ],
  authors: [{ name: "Avinash Mishra" }],
  creator: "Avinash Mishra",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://avinashmishra.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: portfolioData.meta.title,
    description: portfolioData.meta.description,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://avinashmishra.dev",
    siteName: "Avinash Mishra Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1023,
        height: 315,
        alt: "Avinash Mishra — Multidisciplinary Professional",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-[#faf9f5] text-charcoal-900 selection:bg-accent-blue selection:text-white font-sans antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
