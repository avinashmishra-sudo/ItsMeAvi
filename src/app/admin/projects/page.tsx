"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  X,
  ExternalLink,
  Save,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Project } from "@/types";

const projectCategories = [
  "eLearning Course",
  "Graphic Design",
  "Video & Animation",
  "Corporate Training",
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProj, setEditingProj] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch {
      setErrorMsg("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProj({
      title: "",
      slug: "",
      summary: "",
      description: "",
      category: "eLearning Course",
      thumbnail_url: "/images/projects/project-bfsi-course.svg",
      external_link: "https://linkedin.com/in/avinashmishraa",
      technologies: ["Articulate 360", "Storyline"],
      responsibilities: [],
      verified_results: "",
      is_featured: true,
      display_order: projects.length + 1,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProj({ ...proj });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProj) return;

    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Auto-generate slug if blank
      if (!editingProj.slug) {
        editingProj.slug = (editingProj.title || "project")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }

      const isEdit = !!editingProj.id;
      const res = await fetch("/api/admin/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProj),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to save project.");
      } else {
        setSuccessMsg(isEdit ? "Project updated!" : "Project created!");
        setIsModalOpen(false);
        fetchProjects();
      }
    } catch {
      setErrorMsg("Error communicating with server.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSuccessMsg("Project removed successfully.");
        setDeleteId(null);
        fetchProjects();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to delete project.");
      }
    } catch {
      setErrorMsg("Failed to delete project.");
    }
  };

  const handleTogglePublish = async (proj: Project) => {
    try {
      const updated = { ...proj, published: !proj.published };
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        fetchProjects();
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
            Portfolio
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Projects &amp; Case Studies
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showcase your Articulate Storyline courses, simulations, and graphic frameworks.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
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

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                proj.published ? "border-slate-200/80 shadow-sm" : "border-slate-200/40 opacity-60 bg-slate-50"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 bg-gold-50 border border-gold-200 px-2.5 py-0.5 rounded-full">
                    {proj.category}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    {proj.is_featured && (
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">Order: {proj.display_order}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-20 h-14 bg-navy-950 rounded-lg overflow-hidden relative flex-shrink-0 border border-slate-200">
                    {proj.thumbnail_url ? (
                      <Image
                        src={proj.thumbnail_url}
                        alt={proj.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                        None
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 leading-snug">{proj.title}</h2>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{proj.summary}</p>
                  </div>
                </div>

                {proj.verified_results && (
                  <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 font-medium flex items-center space-x-2 border border-slate-200/60">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="line-clamp-1">{proj.verified_results}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <button
                  onClick={() => handleTogglePublish(proj)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border flex items-center space-x-1 ${
                    proj.published
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : "text-slate-500 bg-slate-100 border-slate-200"
                  }`}
                >
                  {proj.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{proj.published ? "Published" : "Draft"}</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(proj.id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">Confirm Project Deletion</h2>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete this project?
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
      {isModalOpen && editingProj && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {editingProj.id ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProj.title || ""}
                  onChange={(e) => setEditingProj({ ...editingProj, title: e.target.value })}
                  placeholder="e.g. BFSI Interactive Compliance Module"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={editingProj.category || projectCategories[0]}
                    onChange={(e) => setEditingProj({ ...editingProj, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none bg-white"
                  >
                    {projectCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thumbnail Path / URL</label>
                  <input
                    type="text"
                    value={editingProj.thumbnail_url || ""}
                    onChange={(e) => setEditingProj({ ...editingProj, thumbnail_url: e.target.value })}
                    placeholder="/images/projects/project-bfsi-course.svg"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Project Summary</label>
                <textarea
                  rows={2}
                  required
                  value={editingProj.summary || ""}
                  onChange={(e) => setEditingProj({ ...editingProj, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProj.description || ""}
                  onChange={(e) => setEditingProj({ ...editingProj, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Verified Results / Impact
                </label>
                <input
                  type="text"
                  value={editingProj.verified_results || ""}
                  onChange={(e) => setEditingProj({ ...editingProj, verified_results: e.target.value })}
                  placeholder="e.g. 100% compliance pass-rate across 10,000+ corporate learners"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">External Link</label>
                  <input
                    type="text"
                    value={editingProj.external_link || ""}
                    onChange={(e) => setEditingProj({ ...editingProj, external_link: e.target.value })}
                    placeholder="https://linkedin.com/in/avinashmishraa"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingProj.display_order ?? 0}
                    onChange={(e) =>
                      setEditingProj({
                        ...editingProj,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 py-2">
                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProj.is_featured || false}
                    onChange={(e) => setEditingProj({ ...editingProj, is_featured: e.target.checked })}
                    className="rounded text-gold-600 focus:ring-gold-500"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProj.published ?? true}
                    onChange={(e) => setEditingProj({ ...editingProj, published: e.target.checked })}
                    className="rounded text-gold-600 focus:ring-gold-500"
                  />
                  <span>Published &amp; Public</span>
                </label>
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
                  <span>{saving ? "Saving..." : "Save Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
