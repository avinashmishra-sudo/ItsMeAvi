import { getDashboardStats, getContactSubmissions } from "@/lib/data";
import Link from "next/link";
import {
  FolderGit2,
  Briefcase,
  FileText,
  Youtube,
  Mail,
  ArrowRight,
  PlusCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export const revalidate = 0; // Dynamic server fetch

export default async function AdminDashboardPage() {
  const [stats, submissions] = await Promise.all([
    getDashboardStats(),
    getContactSubmissions(),
  ]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
            Overview &amp; Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrator Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time content metrics, cache status, and portfolio controls.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/resume"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-all shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Upload Resume</span>
          </Link>
          <Link
            href="/admin/videos"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wide transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gold-400" />
            <span>Sync YouTube</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary Cards from Database */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Published Projects */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-gold-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Published Projects
            </span>
            <div className="p-2 rounded-lg bg-navy-950 text-gold-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900">
              {stats.publishedProjects}
              <span className="text-sm font-normal text-slate-400 ml-1">/ {stats.totalProjects} total</span>
            </p>
            <Link
              href="/admin/projects"
              className="mt-3 text-xs font-bold text-gold-700 hover:text-gold-800 inline-flex items-center space-x-1"
            >
              <span>Manage Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Experience Entries */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-gold-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Experience Entries
            </span>
            <div className="p-2 rounded-lg bg-navy-950 text-gold-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900">{stats.totalExperiences}</p>
            <Link
              href="/admin/experience"
              className="mt-3 text-xs font-bold text-gold-700 hover:text-gold-800 inline-flex items-center space-x-1"
            >
              <span>Manage Career History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Resume Versions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-gold-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Resume Versions
            </span>
            <div className="p-2 rounded-lg bg-navy-950 text-gold-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900">{stats.totalResumes}</p>
            <p className="text-[11px] text-emerald-600 font-semibold truncate mt-1">
              Active: {stats.publishedResumeName || "Official 2026"}
            </p>
            <Link
              href="/admin/resume"
              className="mt-2 text-xs font-bold text-gold-700 hover:text-gold-800 inline-flex items-center space-x-1"
            >
              <span>Resume Versions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Cached YouTube Videos */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-gold-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cached YouTube Videos
            </span>
            <div className="p-2 rounded-lg bg-navy-950 text-red-400">
              <Youtube className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900">{stats.totalVideos}</p>
            <p className="text-[11px] text-slate-400 truncate mt-1">
              Channel: @TheEyesChicko
            </p>
            <Link
              href="/admin/videos"
              className="mt-2 text-xs font-bold text-gold-700 hover:text-gold-800 inline-flex items-center space-x-1"
            >
              <span>Sync &amp; Visibility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Matrix & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Quick Shortcuts */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Content Management Actions</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/admin/profile"
              className="p-4 rounded-xl bg-slate-50 hover:bg-gold-50 border border-slate-200/60 hover:border-gold-300 transition-colors block space-y-1"
            >
              <h3 className="text-sm font-bold text-slate-900">Hero &amp; Profile</h3>
              <p className="text-xs text-slate-500">Update headline, summary &amp; buttons</p>
            </Link>

            <Link
              href="/admin/experience"
              className="p-4 rounded-xl bg-slate-50 hover:bg-gold-50 border border-slate-200/60 hover:border-gold-300 transition-colors block space-y-1"
            >
              <h3 className="text-sm font-bold text-slate-900">Experience History</h3>
              <p className="text-xs text-slate-500">Add or edit TCS &amp; Sanskruti TV roles</p>
            </Link>

            <Link
              href="/admin/skills"
              className="p-4 rounded-xl bg-slate-50 hover:bg-gold-50 border border-slate-200/60 hover:border-gold-300 transition-colors block space-y-1"
            >
              <h3 className="text-sm font-bold text-slate-900">Skills &amp; Categories</h3>
              <p className="text-xs text-slate-500">Manage Articulate 360 &amp; Adobe tools</p>
            </Link>

            <Link
              href="/admin/resume"
              className="p-4 rounded-xl bg-slate-50 hover:bg-gold-50 border border-slate-200/60 hover:border-gold-300 transition-colors block space-y-1"
            >
              <h3 className="text-sm font-bold text-slate-900">Resume Publisher</h3>
              <p className="text-xs text-slate-500">Upload new PDF or switch active version</p>
            </Link>

            <Link
              href="/admin/videos"
              className="p-4 rounded-xl bg-slate-50 hover:bg-gold-50 border border-slate-200/60 hover:border-gold-300 transition-colors block space-y-1"
            >
              <h3 className="text-sm font-bold text-slate-900">YouTube Automation</h3>
              <p className="text-xs text-slate-500">Run manual sync &amp; toggle visible videos</p>
            </Link>

            <Link
              href="/admin/settings"
              className="p-4 rounded-xl bg-slate-50 hover:bg-gold-50 border border-slate-200/60 hover:border-gold-300 transition-colors block space-y-1"
            >
              <h3 className="text-sm font-bold text-slate-900">Site Settings</h3>
              <p className="text-xs text-slate-500">SEO tags, contact details &amp; toggles</p>
            </Link>
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gold-600" />
              <span>Contact Inquiries</span>
            </h2>
            <span className="text-xs bg-slate-100 font-semibold px-2.5 py-1 rounded-full text-slate-600">
              {submissions.length} received
            </span>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-10 text-slate-400 space-y-2">
              <Mail className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-medium">No contact inquiries submitted yet.</p>
              <p className="text-[11px] text-slate-400">Submissions from the public contact form will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {submissions.slice(0, 5).map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{sub.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                  <span className="text-slate-500 block truncate">{sub.email}</span>
                  <p className="font-semibold text-slate-800 mt-1">{sub.subject}</p>
                  <p className="text-slate-600 line-clamp-2 mt-0.5">{sub.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
