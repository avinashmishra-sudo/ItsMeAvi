import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getBlogPosts, getLocalBlogPosts } from "@/lib/data";
import { BlogPost } from "@/types";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function saveLocalBlogPosts(posts: BlogPost[]) {
  try {
    const filePath = path.join(process.cwd(), "src", "lib", "data", "blog-posts.json");
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving blog-posts.json:", err);
  }
}

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await getBlogPosts(false);
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, summary, content, category, tags, is_published, is_featured } = body;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Title and article content are required." },
        { status: 400 }
      );
    }

    const slug =
      body.slug?.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    const now = new Date().toISOString();

    const newPost: BlogPost = {
      id: "post-" + Date.now(),
      title: title.trim(),
      slug,
      summary: summary?.trim() || title.trim(),
      content: content.trim(),
      category: category?.trim() || "Content & Strategy",
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      reading_time_minutes: readingTime,
      published_at: now,
      is_published: is_published !== false,
      is_featured: !!is_featured,
      cover_image: "/images/projects/project-visual-identity.svg",
      author: {
        name: "Avinash Mishra",
        role: "Multidisciplinary Marketing & Communication Professional",
        avatar: "/images/profile.jpg",
      },
    };

    const adminClient = createAdminClient();
    if (adminClient) {
      await adminClient.from("blog_posts").insert(newPost);
    }

    const localPosts = getLocalBlogPosts();
    localPosts.unshift(newPost);
    saveLocalBlogPosts(localPosts);

    return NextResponse.json({ success: true, post: newPost });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create blog post" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, action, is_published, title, summary, content, category, tags } = body;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required." }, { status: 400 });
    }

    const localPosts = getLocalBlogPosts();
    const targetPost = localPosts.find((p) => p.id === id);

    if (!targetPost) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    if (action === "toggle_publish") {
      targetPost.is_published = !targetPost.is_published;
    } else {
      if (title !== undefined) targetPost.title = title.trim();
      if (summary !== undefined) targetPost.summary = summary.trim();
      if (content !== undefined) {
        targetPost.content = content.trim();
        const wordCount = content.trim().split(/\s+/).length;
        targetPost.reading_time_minutes = Math.max(1, Math.ceil(wordCount / 200));
      }
      if (category !== undefined) targetPost.category = category.trim();
      if (tags !== undefined) {
        targetPost.tags = Array.isArray(tags) ? tags : tags.split(",").map((t: string) => t.trim()).filter(Boolean);
      }
      if (is_published !== undefined) targetPost.is_published = is_published;
    }

    saveLocalBlogPosts(localPosts);

    const adminClient = createAdminClient();
    if (adminClient) {
      await adminClient.from("blog_posts").update(targetPost).eq("id", id);
    }

    return NextResponse.json({ success: true, post: targetPost });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required." }, { status: 400 });
    }

    const localPosts = getLocalBlogPosts();
    const filtered = localPosts.filter((p) => p.id !== id);
    saveLocalBlogPosts(filtered);

    const adminClient = createAdminClient();
    if (adminClient) {
      await adminClient.from("blog_posts").delete().eq("id", id);
    }

    return NextResponse.json({ success: true, message: "Post deleted." });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to delete blog post" }, { status: 500 });
  }
}
