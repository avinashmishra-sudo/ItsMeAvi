"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { SiteSettings } from "@/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) setSettings(data.settings);
    } catch {
      setErrorMessage("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to update settings.");
      } else {
        setMessage("Website settings saved successfully!");
        if (data.settings) setSettings(data.settings);
      }
    } catch {
      setErrorMessage("Network error.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
            Global Configuration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Website Settings &amp; SEO
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage meta titles, social links, YouTube channel handle, and homepage section visibility.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-all shadow-sm disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* SEO & Meta */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            SEO &amp; General Metadata
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Website Title</label>
            <input
              type="text"
              required
              value={settings.site_title || ""}
              onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Website Meta Description
            </label>
            <textarea
              rows={3}
              required
              value={settings.site_description || ""}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">SEO Keywords</label>
            <input
              type="text"
              value={settings.seo_keywords || ""}
              onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })}
              placeholder="eLearning, Graphic Design, Articulate 360, BFSI"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
            />
          </div>
        </div>

        {/* Integration & Channel Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Integrations &amp; Channel Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                YouTube Channel Handle
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">@</span>
                <input
                  type="text"
                  required
                  value={settings.youtube_channel_handle?.replace(/^@/, "") || "TheEyesChicko"}
                  onChange={(e) =>
                    setSettings({ ...settings, youtube_channel_handle: e.target.value.replace(/^@/, "") })
                  }
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Homepage Video Display Count
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={settings.youtube_display_count ?? 6}
                onChange={(e) =>
                  setSettings({ ...settings, youtube_display_count: parseInt(e.target.value) || 6 })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Resume Download Button Label
              </label>
              <input
                type="text"
                required
                value={settings.resume_download_label || "Download Full Resume (PDF)"}
                onChange={(e) => setSettings({ ...settings, resume_download_label: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={settings.linkedin_url || ""}
                onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.youtube_url || ""}
                onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Homepage Section Visibility */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Homepage Section Visibility Controls
          </h2>
          <p className="text-xs text-slate-500">
            Control which sections appear on the live homepage without code modifications.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {[
              { key: "show_hero_section", label: "Hero Banner" },
              { key: "show_about_section", label: "Professional Summary" },
              { key: "show_experience_section", label: "Selected Experience" },
              { key: "show_skills_section", label: "Skills & Toolsets" },
              { key: "show_projects_section", label: "Featured Projects" },
              { key: "show_youtube_section", label: "YouTube Videos" },
              { key: "show_contact_section", label: "Contact Form" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:border-gold-300 transition-colors"
              >
                <span className="text-xs font-bold text-slate-800">{label}</span>
                <input
                  type="checkbox"
                  checked={Boolean((settings as any)[key] ?? true)}
                  onChange={(e) =>
                    setSettings({ ...settings, [key]: e.target.checked } as any)
                  }
                  className="rounded text-gold-600 focus:ring-gold-500 w-4 h-4"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-all shadow-md disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
