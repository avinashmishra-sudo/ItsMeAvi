"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  Eye,
  Loader2,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { ResumeVersion } from "@/types";

export default function AdminResumePage() {
  const [resumes, setResumes] = useState<ResumeVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [versionLabel, setVersionLabel] = useState("");
  const [description, setDescription] = useState("");
  const [publishImmediately, setPublishImmediately] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await fetch("/api/admin/resume");
      const data = await res.json();
      if (data.resumes) setResumes(data.resumes);
    } catch {
      setErrorMsg("Failed to load resume versions.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Please select a PDF resume file to upload.");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMsg("Only PDF files are supported.");
      return;
    }

    setUploading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("version_label", versionLabel);
    formData.append("description", description);
    formData.append("is_published", publishImmediately ? "true" : "false");

    try {
      const res = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to upload resume.");
      } else {
        setSuccessMsg(
          publishImmediately
            ? "New resume uploaded and published as the active public download!"
            : "Resume version uploaded successfully as draft."
        );
        // Reset form
        setFile(null);
        setVersionLabel("");
        setDescription("");
        // Reset file input element
        const fileInput = document.getElementById("resume-file-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        fetchResumes();
      }
    } catch {
      setErrorMsg("Network error during file upload.");
    } finally {
      setUploading(false);
    }
  };

  const handlePublish = async (id: string) => {
    setActionLoadingId(id);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "publish" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to publish version.");
      } else {
        setSuccessMsg("Published resume version updated. The public site now points to this version.");
        fetchResumes();
      }
    } catch {
      setErrorMsg("Network error.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`/api/admin/resume?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to delete resume version.");
      } else {
        setSuccessMsg("Resume version removed.");
        setDeleteConfirmId(null);
        fetchResumes();
      }
    } catch {
      setErrorMsg("Network error.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
          Document Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Resume Version Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload new revisions, archive older versions, and control which PDF is published for instant public download.
        </p>
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

      {/* Upload New Version Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Upload className="w-5 h-5 text-gold-600" />
          <span>Upload New Resume Version</span>
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Select PDF File <span className="text-red-500">*</span>
              </label>
              <input
                id="resume-file-input"
                type="file"
                required
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setFile(f);
                  if (f && !versionLabel) {
                    setVersionLabel(`Senior Graphic Designer Resume – ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`);
                  }
                }}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-navy-950 file:text-gold-400 hover:file:bg-navy-900 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Server validates PDF magic bytes and enforces a 10MB maximum file size limit.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Version Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={versionLabel}
                onChange={(e) => setVersionLabel(e.target.value)}
                placeholder="e.g. Senior Graphic Designer Resume – October 2026"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Internal Description &amp; Revision Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Added latest BFSI compliance course authoring results and TCS senior leadership project."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-gold-500 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={publishImmediately}
                onChange={(e) => setPublishImmediately(e.target.checked)}
                className="rounded text-gold-600 focus:ring-gold-500"
              />
              <span>Publish immediately as the active public download</span>
            </label>

            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wide transition-all shadow-md disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>{uploading ? "Validating & Uploading..." : "Upload Version"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Version History List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Resume Version History &amp; Status
        </h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map((res) => (
              <div
                key={res.id}
                className={`p-6 rounded-2xl border transition-all ${
                  res.is_published
                    ? "bg-gold-50/40 border-gold-400/80 shadow-sm"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-base font-bold text-slate-900">{res.version_label}</h3>
                      {res.is_published ? (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full flex items-center space-x-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Current Published</span>
                        </span>
                      ) : (
                        <span className="bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          Archived Version
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500">
                      File: {res.file_name} • Size: {(res.file_size_bytes / 1024).toFixed(0)} KB •{" "}
                      {res.published_at
                        ? `Published on ${new Date(res.published_at).toLocaleDateString()}`
                        : "Unpublished draft"}
                    </p>

                    {res.description && (
                      <p className="text-xs text-slate-600 mt-1">{res.description}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <a
                      href={res.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-gold-600 hover:border-gold-300 text-xs font-semibold flex items-center space-x-1 transition-colors"
                      title="Preview PDF"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </a>

                    {!res.is_published ? (
                      <button
                        onClick={() => handlePublish(res.id)}
                        disabled={actionLoadingId === res.id}
                        className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold uppercase tracking-wide flex items-center space-x-1 transition-all disabled:opacity-50"
                      >
                        {actionLoadingId === res.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <RotateCcw className="w-3.5 h-3.5" />
                        )}
                        <span>Publish</span>
                      </button>
                    ) : (
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Active Download</span>
                      </div>
                    )}

                    {!res.is_published && (
                      <button
                        onClick={() => setDeleteConfirmId(res.id)}
                        className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                        title="Delete Archived Version"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">Confirm Version Deletion</h2>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete this archived resume version?
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
