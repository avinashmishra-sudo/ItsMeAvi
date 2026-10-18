-- =============================================================================
-- Migration: 20261018000001_initial_schema.sql
-- Comprehensive Database Schema for Avinash Mishra's Portfolio Website
-- =============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_title TEXT NOT NULL DEFAULT 'Avinash Mishra | Senior Graphic Designer & eLearning Developer',
    site_description TEXT NOT NULL DEFAULT 'Portfolio of Avinash Mishra, Senior Graphic Designer and eLearning Specialist with expertise in Articulate 360, Adobe Creative Cloud, and instructional multimedia.',
    contact_email TEXT NOT NULL DEFAULT 'avimishra890@gmail.com',
    contact_phone TEXT DEFAULT '+91-8905056633',
    contact_location TEXT DEFAULT 'India',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/in/avinashmishraa',
    youtube_url TEXT DEFAULT 'https://www.youtube.com/@TheEyesChicko',
    github_url TEXT DEFAULT '',
    twitter_url TEXT DEFAULT '',
    youtube_channel_handle TEXT DEFAULT 'TheEyesChicko',
    youtube_display_count INTEGER NOT NULL DEFAULT 6,
    resume_download_label TEXT NOT NULL DEFAULT 'Download Full Resume (PDF)',
    seo_keywords TEXT DEFAULT 'Graphic Design, eLearning Developer, Articulate 360, Storyline, Adobe Captivate, BFSI, Video Production',
    show_hero_section BOOLEAN NOT NULL DEFAULT TRUE,
    show_about_section BOOLEAN NOT NULL DEFAULT TRUE,
    show_experience_section BOOLEAN NOT NULL DEFAULT TRUE,
    show_skills_section BOOLEAN NOT NULL DEFAULT TRUE,
    show_projects_section BOOLEAN NOT NULL DEFAULT TRUE,
    show_youtube_section BOOLEAN NOT NULL DEFAULT TRUE,
    show_contact_section BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Profile
CREATE TABLE IF NOT EXISTS public.profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL DEFAULT 'Avinash Mishra',
    title TEXT NOT NULL DEFAULT 'Senior Graphic Designer | eLearning Developer | Articulate 360 Specialist',
    hero_headline TEXT NOT NULL DEFAULT 'Turning Complex Ideas into Engaging Experiences',
    hero_description TEXT NOT NULL DEFAULT 'Creative and detail-oriented Graphic Designer and eLearning Developer with hands-on experience in developing interactive digital learning experiences using Articulate 360 and Adobe Creative Cloud. Specialized in BFSI clients and high-retention corporate learning.',
    about_text TEXT NOT NULL DEFAULT 'I am a creative and detail-oriented Graphic Designer and eLearning Developer with extensive experience in transforming instructional design storyboards into engaging, visually consistent, and interactive eLearning courses. With deep exposure to Articulate 360, Adobe Creative Cloud, simulations, animations, and LMS-ready publishing, I combine visual design with technical course development to deliver high-impact digital learning solutions.',
    summary_text TEXT NOT NULL DEFAULT 'Hands-on experience in Articulate 360 and Adobe Creative Cloud. Specialized in BFSI eLearning solutions, combining visual design, instructional content implementation, and technical course development for effective digital learning experiences.',
    email TEXT NOT NULL DEFAULT 'avimishra890@gmail.com',
    phone TEXT DEFAULT '+91-8905056633',
    location TEXT DEFAULT 'India',
    avatar_url TEXT DEFAULT '',
    cta_primary_label TEXT NOT NULL DEFAULT 'View My Work',
    cta_primary_url TEXT NOT NULL DEFAULT '/projects',
    cta_secondary_label TEXT NOT NULL DEFAULT 'Download Resume',
    cta_secondary_url TEXT NOT NULL DEFAULT '/resume',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Experiences
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT DEFAULT '',
    start_date TEXT NOT NULL,
    end_date TEXT DEFAULT '',
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT NOT NULL,
    responsibilities TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    achievements TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    is_featured_home BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Skills
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'eLearning & Authoring', 'Graphic Design', 'Video & Animation', 'Domain Expertise', 'Technical Tools & Software', 'Professional Skills'
    proficiency_level TEXT DEFAULT 'Expert',
    display_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    description TEXT DEFAULT '',
    category TEXT NOT NULL, -- 'eLearning Course', 'Graphic Design', 'Video & Animation', 'Corporate Training'
    thumbnail_url TEXT DEFAULT '',
    external_link TEXT DEFAULT '',
    technologies TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    responsibilities TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    verified_results TEXT DEFAULT '',
    is_featured BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Resume Versions
CREATE TABLE IF NOT EXISTS public.resume_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_label TEXT NOT NULL,
    description TEXT DEFAULT '',
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Partial Unique Index: only one resume version can have is_published = TRUE
CREATE UNIQUE INDEX IF NOT EXISTS unique_published_resume_idx 
ON public.resume_versions (is_published) 
WHERE is_published = TRUE;

-- 7. YouTube Videos
CREATE TABLE IF NOT EXISTS public.youtube_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    youtube_video_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    thumbnail_url TEXT NOT NULL,
    published_at TIMESTAMPTZ NOT NULL,
    watch_url TEXT NOT NULL,
    duration TEXT DEFAULT '',
    view_count TEXT DEFAULT '',
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    last_synced_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Content Sections
CREATE TABLE IF NOT EXISTS public.content_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT DEFAULT '',
    content TEXT DEFAULT '',
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Contact Submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    ip_address TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_experiences_published_order ON public.experiences (published, display_order);
CREATE INDEX IF NOT EXISTS idx_skills_category_order ON public.skills (category, published, display_order);
CREATE INDEX IF NOT EXISTS idx_projects_featured_order ON public.projects (is_featured, published, display_order);
CREATE INDEX IF NOT EXISTS idx_youtube_visibility_date ON public.youtube_videos (is_visible, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_resume_published ON public.resume_versions (is_published);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read for published/public records
-- 1. Site Settings: Public can read
CREATE POLICY "Public can view site settings" 
ON public.site_settings FOR SELECT TO public USING (true);

CREATE POLICY "Admin can update site settings" 
ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Profile: Public can read
CREATE POLICY "Public can view profile" 
ON public.profile FOR SELECT TO public USING (true);

CREATE POLICY "Admin can update profile" 
ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Experiences: Public can read published
CREATE POLICY "Public can view published experiences" 
ON public.experiences FOR SELECT TO public USING (published = TRUE);

CREATE POLICY "Admin can manage experiences" 
ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Skills: Public can read published
CREATE POLICY "Public can view published skills" 
ON public.skills FOR SELECT TO public USING (published = TRUE);

CREATE POLICY "Admin can manage skills" 
ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Projects: Public can read published
CREATE POLICY "Public can view published projects" 
ON public.projects FOR SELECT TO public USING (published = TRUE);

CREATE POLICY "Admin can manage projects" 
ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Resume Versions: Public can ONLY read published version
CREATE POLICY "Public can view published resume only" 
ON public.resume_versions FOR SELECT TO public USING (is_published = TRUE);

CREATE POLICY "Admin can manage all resume versions" 
ON public.resume_versions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. YouTube Videos: Public can view visible videos
CREATE POLICY "Public can view visible youtube videos" 
ON public.youtube_videos FOR SELECT TO public USING (is_visible = TRUE);

CREATE POLICY "Admin can manage youtube videos" 
ON public.youtube_videos FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. Content Sections: Public can read visible sections
CREATE POLICY "Public can view visible content sections" 
ON public.content_sections FOR SELECT TO public USING (is_visible = TRUE);

CREATE POLICY "Admin can manage content sections" 
ON public.content_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 9. Contact Submissions: Public can insert; Admin can read and manage
CREATE POLICY "Public can submit contact inquiries" 
ON public.contact_submissions FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admin can view and manage contact inquiries" 
ON public.contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 10. Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Content & Strategy',
    tags TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    reading_time_minutes INTEGER DEFAULT 3,
    published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    cover_image TEXT DEFAULT '/images/projects/project-visual-identity.svg',
    author JSONB DEFAULT '{"name": "Avinash Mishra", "role": "Multidisciplinary Marketing & Communication Professional", "avatar": "/images/profile.jpg"}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date ON public.blog_posts (is_published, published_at DESC);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published blog posts" 
ON public.blog_posts FOR SELECT TO public USING (is_published = TRUE);

CREATE POLICY "Admin can manage all blog posts" 
ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket configuration for resumes and project assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view published resume / projects
CREATE POLICY "Public can read resumes" 
ON storage.objects FOR SELECT TO public USING (bucket_id = 'resumes');

CREATE POLICY "Authenticated users can upload resumes" 
ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'resumes') WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Public can read project images" 
ON storage.objects FOR SELECT TO public USING (bucket_id = 'projects');

CREATE POLICY "Authenticated users can upload project images" 
ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'projects') WITH CHECK (bucket_id = 'projects');
