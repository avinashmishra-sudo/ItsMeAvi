"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  Briefcase,
  Wrench,
  FolderGit2,
  FileText,
  Youtube,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { useState } from "react";

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile & Hero", href: "/admin/profile", icon: UserCheck },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Skills & Tools", href: "/admin/skills", icon: Wrench },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Blog & Articles", href: "/admin/blog", icon: BookOpen },
  { name: "Resume Versions", href: "/admin/resume", icon: FileText },
  { name: "YouTube Videos", href: "/admin/videos", icon: Youtube },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="w-64 bg-navy-950 text-slate-300 min-h-screen border-r border-navy-800 flex flex-col justify-between p-4 flex-shrink-0">
      <div className="space-y-6">
        {/* Brand */}
        <div className="px-3 py-2 flex items-center space-x-3 border-b border-navy-800/80 pb-5">
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-navy-900 border border-gold-500/40 relative flex-shrink-0 shadow-sm">
            <Image
              src="/images/profile.jpg"
              alt="Avinash Mishra"
              fill
              className="object-cover object-center"
              sizes="36px"
            />
          </div>
          <div>
            <span className="text-white font-bold text-sm block">Admin Console</span>
            <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-gold-400" />
              <span>Avinash Mishra</span>
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {adminNav.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-gold-500/15 text-gold-400 border border-gold-500/30 font-bold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-navy-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-gold-400" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="pt-4 border-t border-navy-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-navy-900 rounded-lg transition-colors"
        >
          <span className="flex items-center space-x-2">
            <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
            <span>View Public Site</span>
          </span>
        </Link>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{loggingOut ? "Signing out..." : "Log Out"}</span>
        </button>
      </div>
    </aside>
  );
}
