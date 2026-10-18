import {
  Profile,
  SiteSettings,
  Experience,
  Skill,
  Project,
  ResumeVersion,
  YouTubeVideo,
} from "@/types";

export const initialSiteSettings: SiteSettings = {
  id: "a0000000-0000-0000-0000-000000000001",
  site_title: "Avinash Mishra | Marketing, Communication, Content & Digital Learning",
  site_description:
    "Explore the professional portfolio of Avinash Mishra, a multidisciplinary professional with 10+ years of experience in marketing, communication, content, creative production and digital learning.",
  contact_email: "avimishra890@gmail.com",
  contact_phone: "+91-8905056633",
  contact_location: "India",
  linkedin_url: "https://linkedin.com/in/avinashmishraa/",
  youtube_url: "https://www.youtube.com/@TheEyesChicko",
  github_url: "",
  twitter_url: "",
  youtube_channel_handle: "TheEyesChicko",
  youtube_display_count: 6,
  resume_download_label: "Download Resume",
  seo_keywords:
    "Marketing Manager, Corporate Communications, Content Strategy, Digital Learning, Articulate Storyline, Creative Production, BFSI Marketing, AI-Assisted Creation",
  show_hero_section: true,
  show_about_section: true,
  show_experience_section: true,
  show_skills_section: true,
  show_projects_section: true,
  show_youtube_section: true,
  show_contact_section: true,
};

export const initialProfile: Profile = {
  id: "b0000000-0000-0000-0000-000000000001",
  full_name: "Avinash Mishra",
  title:
    "Multidisciplinary Marketing, Communication, Content, Creative Production & Digital Learning Professional",
  hero_headline: "I Connect Strategy, Stories, Creativity and Technology.",
  hero_description:
    "I’m a marketing, communication and content professional with 10+ years of experience across BFSI, e-commerce, news media and television. I combine strategic thinking with hands-on execution across brand building, digital marketing, content, creative production, e-learning and AI-assisted digital creation.",
  about_text:
    "My career has been shaped by curiosity, adaptability and a willingness to learn by doing. Across marketing, communication, editorial operations and creative production, I have developed a broad set of practical skills that help me contribute beyond a single job function.\n\nWhen a business need arises, I am comfortable learning a new tool or workflow, setting up the basics and taking the work through its initial execution. From independently learning Photoshop and video editing to exploring AI-assisted website and app creation, I focus on turning ideas into practical outcomes.\n\nMy experience also includes working in a television production environment where I learned basic router and switch setup when technical support was unavailable. These experiences reflect my problem-solving mindset and willingness to take ownership.",
  summary_text:
    "Multidisciplinary marketing, communication, content, and creative professional with 10+ years of experience across BFSI, e-commerce, news media, and devotional television post-production. Combines hands-on execution with a self-directed learning mindset across branding, digital marketing, corporate communication, public relations, content development, video production, graphic design, e-learning, and AI-assisted digital creation.",
  email: "avimishra890@gmail.com",
  phone: "+91-8905056633",
  location: "India",
  avatar_url: "/images/profile.jpg",
  cta_primary_label: "Explore My Work",
  cta_primary_url: "/#projects",
  cta_secondary_label: "Download Resume",
  cta_secondary_url: "/resume.pdf",
};

export const initialExperiences: Experience[] = [
  {
    id: "c0000000-0000-0000-0000-000000000001",
    company: "Tata Consultancy Services (TCS)",
    role: "Content Marketing & Communication Manager",
    location: "India",
    start_date: "March 2019",
    end_date: "Present",
    is_current: true,
    description:
      "Contribute to content marketing and communication initiatives across planning, production, distribution and optimization.",
    responsibilities: [
      "Supported content marketing and communication initiatives across planning, production, distribution, and optimization.",
      "Collaborated with stakeholders, agencies, and cross-functional teams to align strategy and delivery.",
      "Used analytics dashboards to monitor campaign performance and optimize content distribution.",
    ],
    achievements: [
      "Contributed to reported organic traffic growth of 53%+.",
      "Supported campaigns associated with 30–40% improvement in campaign ROI across annual budgets exceeding ₹3 crore.",
      "Contributed to a 25% conversion improvement and a 30% reduction in cost per acquisition (CPA).",
    ],
    is_featured_home: true,
    display_order: 1,
    published: true,
  },
  {
    id: "c0000000-0000-0000-0000-000000000002",
    company: "Sanskruti TV",
    role: "Content Operations & Marketing Lead",
    location: "India",
    start_date: "May 2016",
    end_date: "March 2019",
    is_current: false,
    description:
      "Led a 10-member team across content operations and marketing workflows, managing broadcast turnover and digital audience expansion.",
    responsibilities: [
      "Led a 10-member team across content operations and marketing workflows.",
      "Learned practical router and switch configuration in the production-control-room environment when technical support was unavailable, helping handle basic connectivity needs.",
    ],
    achievements: [
      "Contributed to audience engagement growth of 50%+.",
      "Improved operational efficiency by 30% and maintained 100% on-time delivery.",
    ],
    is_featured_home: true,
    display_order: 2,
    published: true,
  },
  {
    id: "c0000000-0000-0000-0000-000000000003",
    company: "Hamari Mahek",
    role: "City Reporter",
    location: "India",
    start_date: "February 2015",
    end_date: "March 2016",
    is_current: false,
    description: "Reported local news and developed editorial content for publication.",
    responsibilities: [
      "Reported local news and developed editorial content for publication.",
      "Covered civic issues, public affairs, and human-interest features under strict deadlines.",
    ],
    achievements: [
      "Maintained regular investigative coverage and factual journalistic accuracy.",
    ],
    is_featured_home: true,
    display_order: 3,
    published: true,
  },
  {
    id: "c0000000-0000-0000-0000-000000000004",
    company: "SareesBazaar.com",
    role: "Content Writer & Marketing Executive",
    location: "India",
    start_date: "January 2014",
    end_date: "February 2015",
    is_current: false,
    description:
      "Created and optimized e-commerce content to support organic search visibility and customer engagement.",
    responsibilities: [
      "Created and optimized e-commerce content to support organic search visibility and customer engagement.",
    ],
    achievements: [
      "Helped achieve first-page search rankings for 50+ keywords.",
      "Contributed to improvements in e-commerce conversion volume.",
    ],
    is_featured_home: true,
    display_order: 4,
    published: true,
  },
];

export const initialSkills: Skill[] = [
  // Brand & Marketing
  { id: "s-1", name: "Branding", category: "Brand & Marketing", proficiency_level: "Expert", display_order: 1, published: true },
  { id: "s-2", name: "Marketing Strategy", category: "Brand & Marketing", proficiency_level: "Expert", display_order: 2, published: true },
  { id: "s-3", name: "Digital Marketing", category: "Brand & Marketing", proficiency_level: "Expert", display_order: 3, published: true },
  { id: "s-4", name: "Campaign Planning", category: "Brand & Marketing", proficiency_level: "Expert", display_order: 4, published: true },
  { id: "s-5", name: "Audience Engagement", category: "Brand & Marketing", proficiency_level: "Expert", display_order: 5, published: true },
  { id: "s-6", name: "SEO & Keyword Research", category: "Brand & Marketing", proficiency_level: "Expert", display_order: 6, published: true },

  // Corporate Communication & PR
  { id: "s-7", name: "Corporate Communications", category: "Corporate Communication & PR", proficiency_level: "Expert", display_order: 7, published: true },
  { id: "s-8", name: "Public Relations", category: "Corporate Communication & PR", proficiency_level: "Expert", display_order: 8, published: true },
  { id: "s-9", name: "Media Relations", category: "Corporate Communication & PR", proficiency_level: "Expert", display_order: 9, published: true },
  { id: "s-10", name: "Stakeholder Coordination", category: "Corporate Communication & PR", proficiency_level: "Expert", display_order: 10, published: true },
  { id: "s-11", name: "Messaging", category: "Corporate Communication & PR", proficiency_level: "Expert", display_order: 11, published: true },

  // Content & Editorial
  { id: "s-12", name: "Content Writing", category: "Content & Editorial", proficiency_level: "Expert", display_order: 12, published: true },
  { id: "s-13", name: "Content Development", category: "Content & Editorial", proficiency_level: "Expert", display_order: 13, published: true },
  { id: "s-14", name: "Editorial Planning", category: "Content & Editorial", proficiency_level: "Expert", display_order: 14, published: true },
  { id: "s-15", name: "Scripts", category: "Content & Editorial", proficiency_level: "Expert", display_order: 15, published: true },
  { id: "s-16", name: "Long-Form & Short-Form Content", category: "Content & Editorial", proficiency_level: "Expert", display_order: 16, published: true },
  { id: "s-17", name: "Content Repurposing", category: "Content & Editorial", proficiency_level: "Expert", display_order: 17, published: true },

  // Creative Production
  { id: "s-18", name: "Video Creation", category: "Creative Production", proficiency_level: "Expert", display_order: 18, published: true },
  { id: "s-19", name: "Video Editing", category: "Creative Production", proficiency_level: "Expert", display_order: 19, published: true },
  { id: "s-20", name: "Graphic Design", category: "Creative Production", proficiency_level: "Expert", display_order: 20, published: true },
  { id: "s-21", name: "Visual Storytelling", category: "Creative Production", proficiency_level: "Expert", display_order: 21, published: true },
  { id: "s-22", name: "Multimedia Production", category: "Creative Production", proficiency_level: "Expert", display_order: 22, published: true },

  // E-learning & Digital Learning
  { id: "s-23", name: "Articulate Storyline", category: "E-learning & Digital Learning", proficiency_level: "Specialist", display_order: 23, published: true },
  { id: "s-24", name: "Rise 360", category: "E-learning & Digital Learning", proficiency_level: "Specialist", display_order: 24, published: true },
  { id: "s-25", name: "Adobe Captivate", category: "E-learning & Digital Learning", proficiency_level: "Advanced", display_order: 25, published: true },

  // AI & Digital Innovation
  { id: "s-26", name: "AI-Assisted Content Creation", category: "AI & Digital Innovation", proficiency_level: "Advanced", display_order: 26, published: true },
  { id: "s-27", name: "Website & App Creation", category: "AI & Digital Innovation", proficiency_level: "Advanced", display_order: 27, published: true },
  { id: "s-28", name: "Digital Prototyping", category: "AI & Digital Innovation", proficiency_level: "Advanced", display_order: 28, published: true },
  { id: "s-29", name: "Independent Tool Learning", category: "AI & Digital Innovation", proficiency_level: "Specialist", display_order: 29, published: true },

  // Analytics & Digital Platforms
  { id: "s-30", name: "GA4 & Looker Studio", category: "Analytics & Platforms", proficiency_level: "Advanced", display_order: 30, published: true },
  { id: "s-31", name: "WordPress & Adobe Experience Manager", category: "Analytics & Platforms", proficiency_level: "Advanced", display_order: 31, published: true },
  { id: "s-32", name: "Salesforce, HubSpot, Mailchimp, Hootsuite", category: "Analytics & Platforms", proficiency_level: "Advanced", display_order: 32, published: true },

  // Creative Tools
  { id: "s-33", name: "Adobe Photoshop", category: "Creative Tools", proficiency_level: "Expert", display_order: 33, published: true },
  { id: "s-34", name: "Adobe Premiere Pro", category: "Creative Tools", proficiency_level: "Expert", display_order: 34, published: true },
  { id: "s-35", name: "Adobe InDesign", category: "Creative Tools", proficiency_level: "Advanced", display_order: 35, published: true },

  // Technical Fundamentals
  { id: "s-36", name: "Networking Fundamentals", category: "Technical Fundamentals", proficiency_level: "Practical", display_order: 36, published: true },
  { id: "s-37", name: "Router & Switch Setup (TV Production)", category: "Technical Fundamentals", proficiency_level: "Practical", display_order: 37, published: true },
  { id: "s-38", name: "IP Management", category: "Technical Fundamentals", proficiency_level: "Practical", display_order: 38, published: true },
];

export const initialProjects: Project[] = [
  {
    id: "e0000000-0000-0000-0000-000000000001",
    title: "AI-Assisted Website Creation",
    slug: "ai-assisted-website-creation",
    summary:
      "Explored AI-assisted development workflows to create websites and turn ideas into functional digital experiences.",
    description:
      "Explored AI-assisted development workflows to create websites and turn ideas into functional digital experiences.",
    category: "Web & AI",
    thumbnail_url: "/images/projects/project-software-sim.svg",
    external_link: "",
    technologies: ["AI-Assisted Development Tools", "Web Technologies (TBC)"],
    responsibilities: [
      "Researched AI coding and web authoring workflows.",
      "Configured rapid deployment setups.",
    ],
    verified_results: "Active Exploration Phase",
    is_featured: true,
    display_order: 1,
    published: true,
  },
  {
    id: "e0000000-0000-0000-0000-000000000002",
    title: "App Development & Prototyping",
    slug: "app-development-prototyping",
    summary:
      "Created app prototypes and explored AI-assisted workflows to move from concept to implementation.",
    description:
      "Created app prototypes and explored AI-assisted workflows to move from concept to implementation.",
    category: "Apps & Digital Innovation",
    thumbnail_url: "/images/projects/project-software-sim.svg",
    external_link: "",
    technologies: ["Prototyping Frameworks", "AI Workflows"],
    responsibilities: [
      "Conceptualized mobile application UX and user flows.",
      "Tested prototype interactions and state management.",
    ],
    verified_results: "Prototype Phase (links to be added)",
    is_featured: true,
    display_order: 2,
    published: true,
  },
  {
    id: "e0000000-0000-0000-0000-000000000003",
    title: "E-learning Development",
    slug: "e-learning-development",
    summary:
      "Developed e-learning content using Articulate Storyline, Rise 360 and Adobe Captivate.",
    description:
      "Developed e-learning content using Articulate Storyline, Rise 360 and Adobe Captivate.",
    category: "Digital Learning",
    thumbnail_url: "/images/projects/project-bfsi-course.svg",
    external_link: "https://linkedin.com/in/avinashmishraa/",
    technologies: ["Articulate Storyline", "Rise 360", "Adobe Captivate", "SCORM"],
    responsibilities: [
      "Authored interactive scenario courses.",
      "Published LMS-ready SCORM modules.",
    ],
    verified_results: "Demonstrations Available",
    is_featured: true,
    display_order: 3,
    published: true,
  },
  {
    id: "e0000000-0000-0000-0000-000000000004",
    title: "YouTube Channel Development",
    slug: "youtube-channel-development",
    summary:
      "Created and developed a YouTube channel, gaining practical experience in content creation and channel development. The channel was later sold after evaluating the investment needed to scale it further.",
    description:
      "Created and developed a YouTube channel, gaining practical experience in content creation and channel development. The channel was later sold after evaluating the investment needed to scale it further. Note: Channel reference https://www.youtube.com/@TheEyesChicko is an independent channel reference listed in the resume and not assumed to be the sold channel.",
    category: "Content & Video",
    thumbnail_url: "/images/projects/project-video-production.svg",
    external_link: "https://www.youtube.com/@TheEyesChicko",
    technologies: ["Video Production", "Audience Engagement", "Post-Production"],
    responsibilities: [
      "Developed video content strategy and pacing.",
      "Managed editing, thumbnails, and publishing operations.",
    ],
    verified_results: "Venture Scaled & Sold",
    is_featured: true,
    display_order: 4,
    published: true,
  },
];

export const initialResumeVersions: ResumeVersion[] = [
  {
    id: "f0000000-0000-0000-0000-000000000001",
    version_label: "Avinash Mishra — Master Resume Draft (10+ Years)",
    description:
      "Master resume draft highlighting 10+ years multidisciplinary experience across marketing, communication, content, creative production, and digital learning.",
    file_url: "/resume.pdf",
    file_name: "resume.pdf",
    file_size_bytes: 272019,
    is_published: true,
    published_at: "2026-10-18T00:00:00Z",
    created_at: "2026-10-18T00:00:00Z",
  },
];

export const initialYouTubeVideos: YouTubeVideo[] = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    youtube_video_id: "kJQP7kiw5Fk",
    title: "Visual Storytelling & Creative Production Breakdown",
    description:
      "Exploring modern creative editing techniques, visual pacing, and multimedia storytelling methods.",
    thumbnail_url: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
    published_at: "2026-10-15T10:00:00Z",
    watch_url: "https://www.youtube.com/@TheEyesChicko",
    duration: "12:45",
    view_count: "1.2K views",
    is_featured: true,
    is_visible: true,
    display_order: 1,
    last_synced_at: "2026-10-18T00:00:00Z",
  },
];

export const initialEducation = [
  {
    degree: "Postgraduate Diploma in Journalism",
    period: "2016",
    description:
      "Journalistic reporting, media ethics, investigative research, and editorial production.",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2014",
    description:
      "Computer science fundamentals, software engineering, databases, and digital systems.",
  },
];
