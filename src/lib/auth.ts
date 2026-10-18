import { createServerSupabaseClient } from "./supabase/server";

export interface AdminUser {
  id: string;
  email: string;
  isDemo?: boolean;
}

export async function getAuthenticatedUser(): Promise<AdminUser | null> {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    // If Supabase credentials are not yet configured in local environment,
    // allow local development access for previewing admin features.
    if (process.env.NODE_ENV === "development") {
      return {
        id: "local-dev-admin-id",
        email: "avimishra890@gmail.com",
        isDemo: true,
      };
    }
    return null;
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email || "admin@portfolio.local",
      isDemo: false,
    };
  } catch (err) {
    console.error("Auth check failed:", err);
    return null;
  }
}
