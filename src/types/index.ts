export interface SiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  contact_email: string;
  contact_phone: string | null;
  contact_location: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  youtube_channel_handle: string;
  youtube_display_count: number;
  resume_download_label: string;
  seo_keywords: string | null;
  show_hero_section: boolean;
  show_about_section: boolean;
  show_experience_section: boolean;
  show_skills_section: boolean;
  show_projects_section: boolean;
  show_youtube_section: boolean;
  show_contact_section: boolean;
  updated_at?: string;
}

export interface Profile {
  id: string;
  full_name: string;
  title: string;
  hero_headline: string;
  hero_description: string;
  about_text: string;
  summary_text: string;
  email: string;
  phone: string | null;
  location: string | null;
  avatar_url: string | null;
  cta_primary_label: string;
  cta_primary_url: string;
  cta_secondary_label: string;
  cta_secondary_url: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  is_featured_home: boolean;
  display_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string; // 'eLearning & Authoring' | 'Graphic Design' | 'Video & Animation' | 'Domain Expertise' | 'Technical Tools & Software' | 'Professional Skills'
  proficiency_level: string; // 'Specialist' | 'Expert' | 'Advanced'
  display_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description?: string | null;
  category: string;
  thumbnail_url?: string | null;
  external_link?: string | null;
  technologies: string[];
  responsibilities: string[];
  verified_results?: string | null;
  is_featured: boolean;
  display_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ResumeVersion {
  id: string;
  version_label: string;
  description?: string | null;
  file_url: string;
  file_name: string;
  file_size_bytes: number;
  is_published: boolean;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface YouTubeVideo {
  id: string;
  youtube_video_id: string;
  title: string;
  description?: string | null;
  thumbnail_url: string;
  published_at: string;
  watch_url: string;
  duration?: string | null;
  view_count?: string | null;
  is_featured: boolean;
  is_visible: boolean;
  display_order: number;
  last_synced_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContentSection {
  id: string;
  section_key: string;
  title: string;
  subtitle?: string | null;
  content?: string | null;
  is_visible: boolean;
  updated_at?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  ip_address?: string | null;
  created_at?: string;
}

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  totalExperiences: number;
  totalSkills: number;
  totalResumes: number;
  publishedResumeName: string | null;
  totalVideos: number;
  lastVideoSync: string | null;
  unreadInquiries: number;
  totalBlogPosts?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  reading_time_minutes: number;
  published_at: string;
  is_published: boolean;
  is_featured?: boolean;
  cover_image?: string | null;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
}

