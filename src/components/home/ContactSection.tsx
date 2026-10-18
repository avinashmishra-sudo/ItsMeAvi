"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Youtube, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { SiteSettings, Profile } from "@/types";

interface ContactSectionProps {
  settings: SiteSettings;
  profile: Profile;
}

export default function ContactSection({ settings, profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const email = profile.email || settings.contact_email;
  const phone = profile.phone || settings.contact_phone;
  const location = profile.location || settings.contact_location || "India";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.issues) {
          setFieldErrors(data.issues);
        } else {
          setErrorMessage(data.error || "Failed to send message. Please try again.");
        }
      } else {
        setSuccessMessage(data.message || "Thank you! Your message has been sent successfully.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        });
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-md border border-gold-200">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Let&apos;s Discuss Your Next Project
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Reach out for senior eLearning developer opportunities, instructional design collaborations, or creative multimedia consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 bg-navy-950 text-white rounded-3xl p-8 sm:p-10 space-y-8 border border-navy-800 shadow-xl">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Direct Contact Channels</h3>
              <p className="text-sm text-gray-400">
                Messages sent via this form or direct channels reach my inbox directly.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-navy-900 text-gold-400 border border-gold-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">
                    Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-base text-gray-100 hover:text-gold-300 font-medium transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {phone && (
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-navy-900 text-gold-400 border border-gold-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">
                      Telephone
                    </span>
                    <a
                      href={`tel:${phone}`}
                      className="text-base text-gray-100 hover:text-gold-300 font-medium transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-navy-900 text-gold-400 border border-gold-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">
                    Location
                  </span>
                  <span className="text-base text-gray-100 font-medium">{location}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-navy-800 space-y-3">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Professional Networks
              </span>
              <div className="flex items-center space-x-3">
                {settings.linkedin_url && (
                  <a
                    href={settings.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-navy-900 border border-navy-800 text-gray-300 hover:text-gold-400 hover:border-gold-500/40 text-xs font-semibold transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-gold-400" />
                    <span>LinkedIn Profile</span>
                  </a>
                )}
                {settings.youtube_url && (
                  <a
                    href={settings.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-navy-900 border border-navy-800 text-gray-300 hover:text-red-400 hover:border-red-500/40 text-xs font-semibold transition-colors"
                  >
                    <Youtube className="w-4 h-4 text-red-400" />
                    <span>YouTube Channel</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Send an Inquiry</h3>
            <p className="text-sm text-slate-500 mb-8">
              Fill in your details and project outline below. All inquiries are answered promptly.
            </p>

            {successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Anti-spam honeypot (invisible to real users) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none text-slate-900 text-sm transition-all"
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-red-600 mt-1">{fieldErrors.name[0]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. jane@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none text-slate-900 text-sm transition-all"
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-600 mt-1">{fieldErrors.email[0]}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. eLearning Module Development Inquiry"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none text-slate-900 text-sm transition-all"
                />
                {fieldErrors.subject && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.subject[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your requirements, project scope, or opportunity..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none text-slate-900 text-sm transition-all resize-y"
                />
                {fieldErrors.message && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.message[0]}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 disabled:opacity-50 text-navy-950 font-bold text-sm tracking-wide uppercase shadow-lg shadow-gold-500/20 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
