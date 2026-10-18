import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  initialProfile,
  initialSiteSettings,
  initialExperiences,
  initialSkills,
  initialProjects,
  initialResumeVersions,
  initialYouTubeVideos,
} from "./initial-data";
import {
  Profile,
  SiteSettings,
  Experience,
  Skill,
  Project,
  ResumeVersion,
  YouTubeVideo,
  DashboardStats,
  ContactSubmission,
  BlogPost,
} from "@/types";

// =============================================================================
// PUBLIC & DATA ACCESS REPOSITORY
// =============================================================================

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return initialSiteSettings;

    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      return initialSiteSettings;
    }
    return data as SiteSettings;
  } catch (err) {
    console.warn("Using initial site settings fallback:", err);
    return initialSiteSettings;
  }
}

export async function getProfile(): Promise<Profile> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return initialProfile;

    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      return initialProfile;
    }
    return data as Profile;
  } catch (err) {
    console.warn("Using initial profile fallback:", err);
    return initialProfile;
  }
}

export async function getExperiences(onlyFeatured = false): Promise<Experience[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return onlyFeatured
        ? initialExperiences.filter((e) => e.is_featured_home && e.published)
        : initialExperiences.filter((e) => e.published);
    }

    let query = supabase
      .from("experiences")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (onlyFeatured) {
      query = query.eq("is_featured_home", true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return onlyFeatured
        ? initialExperiences.filter((e) => e.is_featured_home && e.published)
        : initialExperiences.filter((e) => e.published);
    }
    return data as Experience[];
  } catch {
    return onlyFeatured
      ? initialExperiences.filter((e) => e.is_featured_home && e.published)
      : initialExperiences.filter((e) => e.published);
  }
}

export async function getAllExperiences(): Promise<Experience[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return initialExperiences;

    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data) return initialExperiences;
    return data as Experience[];
  } catch {
    return initialExperiences;
  }
}

export async function getSkills(category?: string): Promise<Skill[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      let filtered = initialSkills.filter((s) => s.published);
      if (category) {
        filtered = filtered.filter((s) => s.category.toLowerCase() === category.toLowerCase());
      }
      return filtered.sort((a, b) => a.display_order - b.display_order);
    }

    let query = supabase
      .from("skills")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      let filtered = initialSkills.filter((s) => s.published);
      if (category) {
        filtered = filtered.filter((s) => s.category.toLowerCase() === category.toLowerCase());
      }
      return filtered.sort((a, b) => a.display_order - b.display_order);
    }
    return data as Skill[];
  } catch {
    let filtered = initialSkills.filter((s) => s.published);
    if (category) {
      filtered = filtered.filter((s) => s.category.toLowerCase() === category.toLowerCase());
    }
    return filtered.sort((a, b) => a.display_order - b.display_order);
  }
}

export async function getAllSkills(): Promise<Skill[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return initialSkills;

    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("category", { ascending: true })
      .order("display_order", { ascending: true });

    if (error || !data) return initialSkills;
    return data as Skill[];
  } catch {
    return initialSkills;
  }
}

export async function getProjects(onlyFeatured = false): Promise<Project[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return onlyFeatured
        ? initialProjects.filter((p) => p.is_featured && p.published)
        : initialProjects.filter((p) => p.published);
    }

    let query = supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (onlyFeatured) {
      query = query.eq("is_featured", true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return onlyFeatured
        ? initialProjects.filter((p) => p.is_featured && p.published)
        : initialProjects.filter((p) => p.published);
    }
    return data as Project[];
  } catch {
    return onlyFeatured
      ? initialProjects.filter((p) => p.is_featured && p.published)
      : initialProjects.filter((p) => p.published);
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return initialProjects;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data) return initialProjects;
    return data as Project[];
  } catch {
    return initialProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return initialProjects.find((p) => p.slug === slug && p.published) || null;
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return initialProjects.find((p) => p.slug === slug && p.published) || null;
    }
    return data as Project;
  } catch {
    return initialProjects.find((p) => p.slug === slug && p.published) || null;
  }
}

import fs from "fs";
import path from "path";

function getLocalResumeVersions(): ResumeVersion[] {
  try {
    const filePath = path.join(process.cwd(), "src", "lib", "data", "resume-versions.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as ResumeVersion[];
      }
    }
  } catch (err) {
    console.error("Error reading local resume-versions.json", err);
  }
  return initialResumeVersions;
}

export async function getPublishedResume(): Promise<ResumeVersion | null> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      const versions = getLocalResumeVersions();
      return versions.find((r) => r.is_published) || versions[0] || null;
    }

    const { data, error } = await supabase
      .from("resume_versions")
      .select("*")
      .eq("is_published", true)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      const versions = getLocalResumeVersions();
      return versions.find((r) => r.is_published) || versions[0] || null;
    }
    return data as ResumeVersion;
  } catch {
    const versions = getLocalResumeVersions();
    return versions.find((r) => r.is_published) || versions[0] || null;
  }
}

export async function getAllResumeVersions(): Promise<ResumeVersion[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return getLocalResumeVersions();

    const { data, error } = await supabase
      .from("resume_versions")
      .select("*")
      .order("is_published", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return getLocalResumeVersions();
    return data as ResumeVersion[];
  } catch {
    return getLocalResumeVersions();
  }
}

export function getLocalYouTubeVideos(): YouTubeVideo[] {
  try {
    const filePath = path.join(process.cwd(), "src", "lib", "data", "youtube-videos.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as YouTubeVideo[];
      }
    }
  } catch (err) {
    console.error("Error reading youtube-videos.json:", err);
  }
  return initialYouTubeVideos;
}

export async function getYouTubeVideos(limit = 6): Promise<YouTubeVideo[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      const videos = getLocalYouTubeVideos();
      return videos.filter((v) => v.is_visible).slice(0, limit);
    }

    const { data, error } = await supabase
      .from("youtube_videos")
      .select("*")
      .eq("is_visible", true)
      .order("is_featured", { ascending: false })
      .order("display_order", { ascending: true })
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data || data.length === 0) {
      const videos = getLocalYouTubeVideos();
      return videos.filter((v) => v.is_visible).slice(0, limit);
    }
    return data as YouTubeVideo[];
  } catch {
    const videos = getLocalYouTubeVideos();
    return videos.filter((v) => v.is_visible).slice(0, limit);
  }
}

export async function getAllYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return getLocalYouTubeVideos();

    const { data, error } = await supabase
      .from("youtube_videos")
      .select("*")
      .order("display_order", { ascending: true })
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) return getLocalYouTubeVideos();
    return data as YouTubeVideo[];
  } catch {
    return getLocalYouTubeVideos();
  }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return {
        totalProjects: initialProjects.length,
        publishedProjects: initialProjects.filter((p) => p.published).length,
        totalExperiences: initialExperiences.length,
        totalSkills: initialSkills.length,
        totalResumes: initialResumeVersions.length,
        publishedResumeName:
          initialResumeVersions.find((r) => r.is_published)?.version_label || null,
        totalVideos: initialYouTubeVideos.length,
        lastVideoSync: initialYouTubeVideos[0]?.last_synced_at || null,
        unreadInquiries: 0,
      };
    }

    const [
      { count: totalProjects },
      { count: publishedProjects },
      { count: totalExperiences },
      { count: totalSkills },
      { count: totalResumes },
      { data: publishedResume },
      { count: totalVideos },
      { data: lastVideo },
      { count: unreadInquiries },
    ] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }).eq("published", true),
      supabase.from("experiences").select("*", { count: "exact", head: true }),
      supabase.from("skills").select("*", { count: "exact", head: true }),
      supabase.from("resume_versions").select("*", { count: "exact", head: true }),
      supabase.from("resume_versions").select("version_label").eq("is_published", true).maybeSingle(),
      supabase.from("youtube_videos").select("*", { count: "exact", head: true }),
      supabase.from("youtube_videos").select("last_synced_at").order("last_synced_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("is_read", false),
    ]);

    return {
      totalProjects: totalProjects ?? initialProjects.length,
      publishedProjects: publishedProjects ?? initialProjects.filter((p) => p.published).length,
      totalExperiences: totalExperiences ?? initialExperiences.length,
      totalSkills: totalSkills ?? initialSkills.length,
      totalResumes: totalResumes ?? initialResumeVersions.length,
      publishedResumeName: publishedResume?.version_label || initialResumeVersions[0]?.version_label || null,
      totalVideos: totalVideos ?? initialYouTubeVideos.length,
      lastVideoSync: lastVideo?.last_synced_at || initialYouTubeVideos[0]?.last_synced_at || null,
      unreadInquiries: unreadInquiries ?? 0,
    };
  } catch {
    return {
      totalProjects: initialProjects.length,
      publishedProjects: initialProjects.filter((p) => p.published).length,
      totalExperiences: initialExperiences.length,
      totalSkills: initialSkills.length,
      totalResumes: initialResumeVersions.length,
      publishedResumeName: initialResumeVersions[0]?.version_label || null,
      totalVideos: initialYouTubeVideos.length,
      lastVideoSync: initialYouTubeVideos[0]?.last_synced_at || null,
      unreadInquiries: 0,
    };
  }
}

export async function submitContactInquiry(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip_address?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      console.log("Contact submission received (Local/Demo mode):", data);
      return { success: true };
    }

    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      ip_address: data.ip_address || "",
    });

    if (error) {
      console.error("Error inserting contact submission:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to submit inquiry" };
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as ContactSubmission[];
  } catch {
    return [];
  }
}

export function getLocalBlogPosts(): BlogPost[] {
  try {
    const filePath = path.join(process.cwd(), "src", "lib", "data", "blog-posts.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as BlogPost[];
    }
  } catch (err) {
    console.error("Error reading blog-posts.json:", err);
  }
  return [];
}

export async function getBlogPosts(onlyPublished = true): Promise<BlogPost[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      const posts = getLocalBlogPosts();
      return onlyPublished ? posts.filter((p) => p.is_published) : posts;
    }

    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (onlyPublished) {
      query = query.eq("is_published", true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      const posts = getLocalBlogPosts();
      return onlyPublished ? posts.filter((p) => p.is_published) : posts;
    }
    return data as BlogPost[];
  } catch {
    const posts = getLocalBlogPosts();
    return onlyPublished ? posts.filter((p) => p.is_published) : posts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      const posts = getLocalBlogPosts();
      return posts.find((p) => p.slug === slug && p.is_published) || null;
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) {
      const posts = getLocalBlogPosts();
      return posts.find((p) => p.slug === slug && p.is_published) || null;
    }
    return data as BlogPost;
  } catch {
    const posts = getLocalBlogPosts();
    return posts.find((p) => p.slug === slug && p.is_published) || null;
  }
}

