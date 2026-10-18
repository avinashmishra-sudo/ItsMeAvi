"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  X,
  Calendar,
  Save,
  AlertCircle,
} from "lucide-react";
import { Experience } from "@/types";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/admin/experiences");
      const data = await res.json();
      if (data.experiences) setExperiences(data.experiences);
    } catch {
      setErrorMsg("Failed to load experiences.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingExp({
      company: "",
      role: "",
      location: "India",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      responsibilities: [],
      achievements: [],
      is_featured_home: true,
      display_order: experiences.length + 1,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingExp({ ...exp });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const isEdit = !!editingExp.id;
      const res = await fetch("/api/admin/experiences", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingExp),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to save experience.");
      } else {
        setSuccessMsg(isEdit ? "Experience updated!" : "Experience added!");
        setIsModalOpen(false);
        fetchExperiences();
      }
    } catch {
      setErrorMsg("Error communicating with server.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/experiences?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSuccessMsg("Experience deleted successfully.");
        setDeleteId(null);
        fetchExperiences();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to delete experience.");
      }
    } catch {
      setErrorMsg("Failed to delete experience.");
    }
  };

  const handleTogglePublish = async (exp: Experience) => {
    try {
      const updated = { ...exp, published: !exp.published };
      const res = await fetch("/api/admin/experiences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        fetchExperiences();
      }
    } catch {
      setErrorMsg("Failed to update status.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
            Career Records
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Professional Experience
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your employment history at TCS and other organizations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Experience List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                exp.published ? "border-slate-200/80 shadow-sm" : "border-slate-200/40 opacity-70 bg-slate-50"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-slate-900">{exp.role}</h2>
                    {exp.is_current && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        Current
                      </span>
                    )}
                    {exp.is_featured_home && (
                      <span className="bg-gold-100 text-gold-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        Homepage Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gold-600">{exp.company}</p>
                  <p className="text-xs text-slate-500">
                    {exp.start_date} – {exp.is_current ? "Present" : exp.end_date} • Order: {exp.display_order}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTogglePublish(exp)}
                    className={`p-2 rounded-lg border text-xs font-semibold flex items-center space-x-1 transition-colors ${
                      exp.published
                        ? "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                        : "text-slate-500 bg-slate-100 border-slate-200 hover:bg-slate-200"
                    }`}
                    title={exp.published ? "Unpublish" : "Publish"}
                  >
                    {exp.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span>{exp.published ? "Published" : "Draft"}</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(exp)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Edit Experience"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteId(exp.id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                    title="Delete Experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">Confirm Deletion</h2>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete this experience record? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && editingExp && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {editingExp.id ? "Edit Experience Entry" : "Add Experience Entry"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={editingExp.company || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    placeholder="e.g. Tata Consultancy Services (TCS)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={editingExp.role || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    placeholder="e.g. Graphic Designer / eLearning Developer"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Start Date</label>
                  <input
                    type="text"
                    required
                    value={editingExp.start_date || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                    placeholder="e.g. March 2019"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">End Date</label>
                  <input
                    type="text"
                    disabled={editingExp.is_current}
                    value={editingExp.is_current ? "Present" : editingExp.end_date || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, end_date: e.target.value })}
                    placeholder="e.g. March 2019"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingExp.display_order ?? 0}
                    onChange={(e) => setEditingExp({ ...editingExp, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 py-1">
                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingExp.is_current || false}
                    onChange={(e) => setEditingExp({ ...editingExp, is_current: e.target.checked })}
                    className="rounded text-gold-600 focus:ring-gold-500"
                  />
                  <span>Mark as Current Position</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingExp.is_featured_home || false}
                    onChange={(e) => setEditingExp({ ...editingExp, is_featured_home: e.target.checked })}
                    className="rounded text-gold-600 focus:ring-gold-500"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingExp.published ?? true}
                    onChange={(e) => setEditingExp({ ...editingExp, published: e.target.checked })}
                    className="rounded text-gold-600 focus:ring-gold-500"
                  />
                  <span>Published &amp; Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Summary Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingExp.description || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Responsibilities (one per line)
                </label>
                <textarea
                  rows={4}
                  value={editingExp.responsibilities?.join("\n") || ""}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      responsibilities: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Achievements (one per line)
                </label>
                <textarea
                  rows={2}
                  value={editingExp.achievements?.join("\n") || ""}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      achievements: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none font-mono text-xs"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-all shadow-md disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{saving ? "Saving..." : "Save Entry"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
