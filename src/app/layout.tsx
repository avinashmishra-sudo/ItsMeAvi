import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings, getProfile } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://avinashmishra.dev";

  return {
    title: {
      default: settings.site_title,
      template: `%s | Avinash Mishra`,
    },
    description: settings.site_description,
    keywords: [
      "Avinash Mishra",
      "eLearning Developer",
      "Senior Graphic Designer",
      "Articulate 360 Specialist",
      "Articulate Storyline",
      "Adobe Captivate",
      "BFSI Learning",
      "Instructional Design",
      "Multimedia Production",
    ],
    authors: [{ name: "Avinash Mishra" }],
    creator: "Avinash Mishra",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: settings.site_title,
      description: settings.site_description,
      url: siteUrl,
      siteName: "Avinash Mishra Portfolio",
      locale: "en_US",
      type: "website",
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
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const profile = await getProfile();

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-gold-500 selection:text-navy-950 font-sans">
        <Navbar siteTitle={settings.site_title} />
        <main className="flex-grow">{children}</main>
        <Footer settings={settings} profile={profile} />
      </body>
    </html>
  );
}
