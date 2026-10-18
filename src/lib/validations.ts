import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please provide a valid email address").max(255),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
  honeypot: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const profileSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  title: z.string().min(2, "Professional title is required"),
  hero_headline: z.string().min(5, "Hero headline is required"),
  hero_description: z.string().min(10, "Hero description is required"),
  about_text: z.string().min(20, "About text is required"),
  summary_text: z.string().min(10, "Summary is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  cta_primary_label: z.string().min(1, "Primary button label is required"),
  cta_primary_url: z.string().min(1, "Primary button URL is required"),
  cta_secondary_label: z.string().min(1, "Secondary button label is required"),
  cta_secondary_url: z.string().min(1, "Secondary button URL is required"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const siteSettingsSchema = z.object({
  site_title: z.string().min(2, "Site title is required"),
  site_description: z.string().min(10, "Site description is required"),
  contact_email: z.string().email("Valid email required"),
  contact_phone: z.string().nullable().optional(),
  contact_location: z.string().nullable().optional(),
  linkedin_url: z.string().url("Must be a valid URL").nullable().or(z.literal("")).optional(),
  youtube_url: z.string().url("Must be a valid URL").nullable().or(z.literal("")).optional(),
  github_url: z.string().url("Must be a valid URL").nullable().or(z.literal("")).optional(),
  twitter_url: z.string().url("Must be a valid URL").nullable().or(z.literal("")).optional(),
  youtube_channel_handle: z.string().min(1, "YouTube handle is required"),
  youtube_display_count: z.coerce.number().min(1).max(24),
  resume_download_label: z.string().min(2, "Resume download label is required"),
  seo_keywords: z.string().nullable().optional(),
  show_hero_section: z.boolean().default(true),
  show_about_section: z.boolean().default(true),
  show_experience_section: z.boolean().default(true),
  show_skills_section: z.boolean().default(true),
  show_projects_section: z.boolean().default(true),
  show_youtube_section: z.boolean().default(true),
  show_contact_section: z.boolean().default(true),
});

export type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;

export const experienceSchema = z.object({
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),
  location: z.string().optional().default(""),
  start_date: z.string().min(2, "Start date is required"),
  end_date: z.string().optional().default(""),
  is_current: z.boolean().default(false),
  description: z.string().min(10, "Description is required"),
  responsibilities: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  is_featured_home: z.boolean().default(true),
  display_order: z.coerce.number().default(0),
  published: z.boolean().default(true),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

export const skillSchema = z.object({
  name: z.string().min(2, "Skill name is required"),
  category: z.string().min(2, "Category is required"),
  proficiency_level: z.string().default("Expert"),
  display_order: z.coerce.number().default(0),
  published: z.boolean().default(true),
});

export type SkillFormData = z.infer<typeof skillSchema>;

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  summary: z.string().min(10, "Summary is required"),
  description: z.string().optional().default(""),
  category: z.string().min(2, "Category is required"),
  thumbnail_url: z.string().optional().default(""),
  external_link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  technologies: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),
  verified_results: z.string().optional().default(""),
  is_featured: z.boolean().default(true),
  display_order: z.coerce.number().default(0),
  published: z.boolean().default(true),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export const resumeVersionSchema = z.object({
  version_label: z.string().min(3, "Version label is required (e.g. October 2026 Edition)"),
  description: z.string().optional().default(""),
  is_published: z.boolean().default(false),
});

export type ResumeVersionFormData = z.infer<typeof resumeVersionSchema>;
