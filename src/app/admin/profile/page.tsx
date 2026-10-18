"use client";

import { useState, useEffect } from "react";
import { UserCheck, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Profile } from "@/types";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      if (data.profile) {
        setProfile(data.profile);
      }
    } catch {
      setErrorMessage("Failed to load profile data.");
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
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to update profile.");
      } else {
        setMessage("Profile and Hero section updated successfully!");
        if (data.profile) setProfile(data.profile);
      }
    } catch {
      setErrorMessage("Network error while updating profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
            Content Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Profile &amp; Hero Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit your headline, introductory bio, hero CTA buttons, and contact details.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-all shadow-sm disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? "Saving Changes..." : "Save Profile"}</span>
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
        {/* Basic Identification */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Professional Identification
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profile.full_name || ""}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Professional Title
              </label>
              <input
                type="text"
                required
                value={profile.title || ""}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-slate-900 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Hero Section Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Hero Section Text &amp; CTAs
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Hero Headline
            </label>
            <input
              type="text"
              required
              value={profile.hero_headline || ""}
              onChange={(e) => setProfile({ ...profile, hero_headline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-slate-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Hero Supporting Description
            </label>
            <textarea
              rows={3}
              required
              value={profile.hero_description || ""}
              onChange={(e) => setProfile({ ...profile, hero_description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-slate-900 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Primary Button Label
              </label>
              <input
                type="text"
                required
                value={profile.cta_primary_label || ""}
                onChange={(e) => setProfile({ ...profile, cta_primary_label: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 outline-none text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Primary Button URL
              </label>
              <input
                type="text"
                required
                value={profile.cta_primary_url || ""}
                onChange={(e) => setProfile({ ...profile, cta_primary_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 outline-none text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Secondary Button Label
              </label>
              <input
                type="text"
                required
                value={profile.cta_secondary_label || ""}
                onChange={(e) => setProfile({ ...profile, cta_secondary_label: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 outline-none text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Secondary Button URL
              </label>
              <input
                type="text"
                required
                value={profile.cta_secondary_url || ""}
                onChange={(e) => setProfile({ ...profile, cta_secondary_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 outline-none text-slate-900 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Narrative & Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Narrative &amp; Summary
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Homepage Professional Summary
            </label>
            <textarea
              rows={3}
              required
              value={profile.summary_text || ""}
              onChange={(e) => setProfile({ ...profile, summary_text: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 outline-none text-slate-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Full About Me Story
            </label>
            <textarea
              rows={6}
              required
              value={profile.about_text || ""}
              onChange={(e) => setProfile({ ...profile, about_text: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 outline-none text-slate-900 text-sm"
            />
          </div>
        </div>

        {/* Direct Contact Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={profile.email || ""}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 outline-none text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={profile.phone || ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 outline-none text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Location
              </label>
              <input
                type="text"
                value={profile.location || ""}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 outline-none text-slate-900 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-all shadow-md disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? "Saving Changes..." : "Save Profile & Hero"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
