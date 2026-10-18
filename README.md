# Avinash Mishra — Personal Portfolio & Custom Admin Panel

A production-ready, full-stack personal portfolio website with a secure administrator management console, built with Next.js (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, Storage), and automated YouTube integration via YouTube Data API v3.

---

## 1. Architecture & Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router with Server & Client Components) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS (Navy `#070b14` / `#0b1120`, Gold `#c59b27` / `#e9cf8b`, White/Slate) |
| **Database** | Supabase PostgreSQL with Row Level Security (RLS) & Indexes |
| **Authentication** | Supabase Auth (Email & Password, server-side session cookies) |
| **Storage** | Supabase Storage (`resumes` & `projects` buckets) + local static fallback |
| **Validation** | Zod schemas (Server-side validation on forms & API endpoints) |
| **Automation** | YouTube Data API v3 (`@TheEyesChicko`) & Vercel Cron (`/api/cron/sync-youtube`) |

---

## 2. Directory Structure

```
d:/Learning/AvinashMishra/
├── public/
│   ├── images/
│   │   └── projects/
│   │       ├── project-bfsi-course.svg
│   │       ├── project-software-sim.svg
│   │       ├── project-visual-identity.svg
│   │       └── project-video-production.svg
│   └── resumes/
│       └── Avinash_Mishra_Resume.pdf
├── src/
│   ├── app/
│   │   ├── about/page.tsx
│   │   ├── admin/
│   │   │   ├── experience/page.tsx
│   │   │   ├── login/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── projects/page.tsx
│   │   │   ├── resume/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   ├── skills/page.tsx
│   │   │   ├── videos/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── experiences/route.ts
│   │   │   │   ├── profile/route.ts
│   │   │   │   ├── projects/route.ts
│   │   │   │   ├── resume/route.ts
│   │   │   │   ├── settings/route.ts
│   │   │   │   ├── skills/route.ts
│   │   │   │   └── youtube/route.ts
│   │   │   ├── auth/logout/route.ts
│   │   │   ├── contact/route.ts
│   │   │   ├── cron/sync-youtube/route.ts
│   │   │   └── resume/download/route.ts
│   │   ├── contact/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── resume/page.tsx
│   │   ├── youtube/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminSidebar.tsx
│   │   ├── home/
│   │   │   ├── ContactSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── ResumeSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── SummarySection.tsx
│   │   │   └── YouTubeSection.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── lib/
│   │   ├── data/
│   │   │   ├── index.ts
│   │   │   └── initial-data.ts
│   │   ├── supabase/
│   │   │   ├── admin.ts
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── youtube/
│   │   │   └── sync.ts
│   │   ├── auth.ts
│   │   └── validations.ts
│   └── types/
│       └── index.ts
├── supabase/
│   ├── migrations/
│   │   └── 20261018000001_initial_schema.sql
│   └── seed.sql
├── .env.example
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── README.md
```

---

## 3. Database & Security Setup (Supabase)

### Step 1: Create a Supabase Project
1. Log in to [Supabase](https://supabase.com) and click **"New Project"**.
2. Give it a name (e.g., `avinash-portfolio`) and database password.

### Step 2: Apply Database Schema & Migrations
1. In the Supabase Dashboard, open the **SQL Editor**.
2. Copy and execute the contents of `supabase/migrations/20261018000001_initial_schema.sql`.
   - Creates all 9 tables: `site_settings`, `profile`, `experiences`, `skills`, `projects`, `resume_versions`, `youtube_videos`, `content_sections`, `contact_submissions`.
   - Sets up Row Level Security (RLS) policies allowing public read of published records and restricting mutations strictly to authenticated administrators.
   - Configures the partial unique index guaranteeing only one published resume at a time.
   - Configures storage buckets `resumes` and `projects`.
3. Copy and execute `supabase/seed.sql`.
   - Pre-populates the database with Avinash Mishra's verified resume data (TCS experience, Sanskruti TV role, Articulate 360 & Adobe skills, education, and initial projects).

### Step 3: Create the Administrator Account
1. In Supabase Dashboard, go to **Authentication** -> **Users**.
2. Click **"Add User"** -> **"Create user"**.
3. Enter:
   - **Email:** `avimishra890@gmail.com`
   - **Password:** A strong password of your choice.
   - Check **"Auto Confirm User"** so no verification email is required.

---

## 4. YouTube Data API v3 Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and navigate to **APIs & Services** -> **Library**.
3. Search for **"YouTube Data API v3"** and click **Enable**.
4. Go to **APIs & Services** -> **Credentials** -> **Create Credentials** -> **API Key**.
5. Copy your API Key to `YOUTUBE_API_KEY` in your environment.

The system automatically calls the official channel uploads playlist for `@TheEyesChicko`:
- Resolves the channel uploads playlist ID.
- Retrieves recent uploads without wasting quota on search queries.
- Upserts video title, description, high-resolution thumbnail, and watch URL.
- **Preserves** all admin-selected featured, hidden, and ordering preferences when updating.

---

## 5. Local Development Setup

1. Clone or navigate to the project directory:
   ```bash
   cd d:\Learning\AvinashMishra
   ```
2. Create your local environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in your environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   YOUTUBE_API_KEY=your-youtube-data-api-v3-key
   CRON_SECRET=your-random-32-character-secret
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
4. Run development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.
6. Access the Admin Panel at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 6. Vercel Deployment Instructions

1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com), click **"Add New"** -> **"Project"** and import this repository.
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `YOUTUBE_API_KEY`
   - `CRON_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (e.g., `https://avinashmishra.vercel.app`)
4. Click **Deploy**.

### Verifying Scheduled YouTube Synchronization
- `vercel.json` contains the daily schedule (`0 0 * * *` at midnight UTC).
- To manually trigger the cron job in production or test the authorization:
  ```bash
  curl -H "Authorization: Bearer <CRON_SECRET>" https://your-domain.vercel.app/api/cron/sync-youtube
  ```
- Any unauthorized call without this header will immediately receive `401 Unauthorized`.
- You can also trigger synchronization manually anytime from the Admin Panel at `/admin/videos` by clicking **"Sync Latest Videos"**.

---

## 7. Verification & Test Checklist Results

| Test Category | Description | Result |
|---|---|---|
| **TypeScript Strict Check** | Ran `npx tsc --noEmit` across all App Router routes & server components | **PASS (0 errors)** |
| **Next.js Production Build** | Ran `npm run build` compiling 27 static & dynamic routes | **PASS (27 routes generated)** |
| **Public Homepage (`/`)** | Verified hero, summary, experience, skills, projects, youtube, resume, contact | **PASS (HTTP 200)** |
| **About Page (`/about`)** | Verified biography, delivery workflow, and education | **PASS (HTTP 200)** |
| **Experience Page (`/experience`)** | Verified TCS & Sanskruti TV roles and outcomes | **PASS (HTTP 200)** |
| **Projects Page (`/projects`)** | Verified case studies and responsive media previews | **PASS (HTTP 200)** |
| **YouTube Page (`/youtube`)** | Verified video grid and watch links | **PASS (HTTP 200)** |
| **Resume Page (`/resume`)** | Verified online resume viewer and credentials | **PASS (HTTP 200)** |
| **Contact Page (`/contact`)** | Verified contact channels and form UI | **PASS (HTTP 200)** |
| **Resume Download Route** | Tested `/api/resume/download` -> returned valid PDF with header `%PDF` | **PASS (HTTP 200, 272KB)** |
| **Cron Security Route** | Tested `/api/cron/sync-youtube` without authorization token | **PASS (HTTP 401 Secure)** |
| **Contact Form Anti-Spam & Zod** | Tested empty/malformed payload; verified Zod 400 rejection | **PASS (HTTP 400)** |
| **Valid Contact Submission** | Tested valid inquiry payload; verified submission acceptance | **PASS (HTTP 200)** |
| **SEO & Sitemap** | Generated `/robots.txt` and `/sitemap.xml` | **PASS (HTTP 200)** |
