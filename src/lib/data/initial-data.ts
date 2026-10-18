import {
  Profile,
  SiteSettings,
  Experience,
  Skill,
  Project,
  ResumeVersion,
  YouTubeVideo,
  ContentSection,
} from "@/types";

export const initialSiteSettings: SiteSettings = {
  id: "a0000000-0000-0000-0000-000000000001",
  site_title: "Avinash Mishra | Senior Graphic Designer & eLearning Specialist",
  site_description:
    "Portfolio of Avinash Mishra — Senior Graphic Designer, eLearning Developer, and Articulate 360 Specialist with extensive BFSI & enterprise corporate experience.",
  contact_email: "avimishra890@gmail.com",
  contact_phone: "+91-8905056633",
  contact_location: "India",
  linkedin_url: "https://linkedin.com/in/avinashmishraa",
  youtube_url: "https://www.youtube.com/@TheEyesChicko",
  github_url: "",
  twitter_url: "",
  youtube_channel_handle: "TheEyesChicko",
  youtube_display_count: 6,
  resume_download_label: "Download Full Resume (PDF)",
  seo_keywords:
    "eLearning Developer, Graphic Designer, Articulate 360 Specialist, Storyline, Adobe Creative Cloud, BFSI Learning, Video Production",
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
  title: "Senior Graphic Designer | eLearning Developer | Articulate 360 Specialist",
  hero_headline: "Turning Complex Ideas into Engaging Experiences",
  hero_description:
    "Creative and detail-oriented Graphic Designer and eLearning Developer with hands-on experience in developing interactive digital learning experiences using Articulate 360 and Adobe Creative Cloud. Specialized in developing high-retention corporate and BFSI learning solutions.",
  about_text:
    "I am a creative and detail-oriented Graphic Designer and eLearning Developer with extensive experience in transforming instructional design storyboards into engaging, visually consistent, and interactive eLearning courses. With deep exposure to Articulate 360, Adobe Creative Cloud, simulations, animations, and LMS-ready publishing, I combine visual design with technical course development to deliver high-impact digital learning solutions.\n\nSpecialized in developing eLearning solutions for BFSI clients, combining visual design, instructional content implementation, and technical course development to deliver effective digital learning experiences. Strong understanding of end-to-end eLearning production workflows, quality standards, cross-functional collaboration, and project delivery within strict guidelines.",
  summary_text:
    "Creative and detail-oriented Graphic Designer and eLearning Developer with hands-on experience in developing interactive digital learning experiences using Articulate 360 and Adobe Creative Cloud. Specialized in BFSI clients, combining visual design, instructional content implementation, and technical course development for effective digital learning experiences.",
  email: "avimishra890@gmail.com",
  phone: "+91-8905056633",
  location: "India",
  avatar_url: null,
  cta_primary_label: "View My Work",
  cta_primary_url: "/projects",
  cta_secondary_label: "Download Resume",
  cta_secondary_url: "/resume",
};

export const initialExperiences: Experience[] = [
  {
    id: "c0000000-0000-0000-0000-000000000001",
    company: "Tata Consultancy Services (TCS) & Professional Projects",
    role: "Graphic Designer / eLearning Developer",
    location: "India",
    start_date: "March 2019",
    end_date: "Present",
    is_current: true,
    description:
      "Spearheading the creation of interactive eLearning courses and digital learning solutions for BFSI and global enterprise clients using Articulate 360 and Adobe Creative Cloud.",
    responsibilities: [
      "Developed interactive eLearning courses using Articulate 360 / Articulate Storyline based on instructional design storyboards and project requirements.",
      "Transformed instructional content into visually engaging and interactive learning experiences while maintaining consistency with established design templates and standards.",
      "Worked on BFSI-focused eLearning projects, developing digital learning content aligned with client requirements and business objectives.",
      "Integrated screenshots, simulations, graphics, multimedia elements, and interactive components into eLearning courses.",
      "Managed the end-to-end course production workflow from storyboard implementation and visual development through testing, quality checks, and LMS-ready publishing.",
      "Collaborated with instructional designers and project stakeholders to understand requirements, resolve design/development issues, and deliver courses within project timelines.",
      "Applied graphic design principles to improve visual hierarchy, readability, learner engagement, and overall course experience.",
      "Performed course-level quality checks to identify visual, functional, and content implementation issues before final delivery.",
      "Supported multimedia requirements including graphics, animation, and video elements for digital learning solutions.",
    ],
    achievements: [
      "Successfully delivered numerous LMS-ready interactive courses adhering to strict SCORM/xAPI packaging standards.",
      "High stakeholder satisfaction scores across BFSI client training curricula and compliance training implementations.",
    ],
    is_featured_home: true,
    display_order: 1,
    published: true,
  },
  {
    id: "c0000000-0000-0000-0000-000000000002",
    company: "Sanskruti TV",
    role: "Content Operation and Marketing Lead",
    location: "India",
    start_date: "May 2016",
    end_date: "March 2019",
    is_current: false,
    description:
      "Directed digital content operations, multimedia assets, and video production to drive audience engagement and maintain strict brand consistency.",
    responsibilities: [
      "Directed content operations and multimedia production, overseeing video and audio editing, graphic design, and brand consistency.",
      "Managed cross-functional teams to streamline content workflows and drive engagement across digital distribution channels.",
    ],
    achievements: [
      "Optimized end-to-end broadcast & digital publishing turnaround time by 30%.",
      "Built consistent brand guidelines across all social and digital channel releases.",
    ],
    is_featured_home: true,
    display_order: 2,
    published: true,
  },
];

export const initialSkills: Skill[] = [
  // eLearning & Authoring
  {
    id: "d0000000-0000-0000-0000-000000000001",
    name: "Articulate 360",
    category: "eLearning & Authoring",
    proficiency_level: "Specialist",
    display_order: 1,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000002",
    name: "Articulate Storyline",
    category: "eLearning & Authoring",
    proficiency_level: "Specialist",
    display_order: 2,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000003",
    name: "Adobe Captivate",
    category: "eLearning & Authoring",
    proficiency_level: "Advanced",
    display_order: 3,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000004",
    name: "Interactive eLearning Development",
    category: "eLearning & Authoring",
    proficiency_level: "Expert",
    display_order: 4,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000005",
    name: "LMS-Ready Course Publishing (SCORM/xAPI)",
    category: "eLearning & Authoring",
    proficiency_level: "Expert",
    display_order: 5,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000006",
    name: "Simulations & Screen-Based Learning",
    category: "eLearning & Authoring",
    proficiency_level: "Expert",
    display_order: 6,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000007",
    name: "Storyboard Implementation",
    category: "eLearning & Authoring",
    proficiency_level: "Specialist",
    display_order: 7,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000008",
    name: "Multimedia Integration",
    category: "eLearning & Authoring",
    proficiency_level: "Expert",
    display_order: 8,
    published: true,
  },

  // Graphic Design
  {
    id: "d0000000-0000-0000-0000-000000000009",
    name: "Adobe Photoshop",
    category: "Graphic Design",
    proficiency_level: "Expert",
    display_order: 9,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000010",
    name: "Adobe Illustrator",
    category: "Graphic Design",
    proficiency_level: "Expert",
    display_order: 10,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000011",
    name: "Adobe InDesign",
    category: "Graphic Design",
    proficiency_level: "Advanced",
    display_order: 11,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000012",
    name: "Visual & Presentation Design",
    category: "Graphic Design",
    proficiency_level: "Expert",
    display_order: 12,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000013",
    name: "Layout & Typography Composition",
    category: "Graphic Design",
    proficiency_level: "Expert",
    display_order: 13,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000014",
    name: "Branding & Design Standards",
    category: "Graphic Design",
    proficiency_level: "Expert",
    display_order: 14,
    published: true,
  },

  // Video & Animation
  {
    id: "d0000000-0000-0000-0000-000000000015",
    name: "Adobe Premiere Pro",
    category: "Video & Animation",
    proficiency_level: "Expert",
    display_order: 15,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000016",
    name: "Video Editing & Post-Production",
    category: "Video & Animation",
    proficiency_level: "Expert",
    display_order: 16,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000017",
    name: "Motion Graphics & Animation",
    category: "Video & Animation",
    proficiency_level: "Advanced",
    display_order: 17,
    published: true,
  },

  // Domain Expertise
  {
    id: "d0000000-0000-0000-0000-000000000018",
    name: "BFSI Domain Learning Solutions",
    category: "Domain Expertise",
    proficiency_level: "Specialist",
    display_order: 18,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000019",
    name: "Corporate Employee Training",
    category: "Domain Expertise",
    proficiency_level: "Expert",
    display_order: 19,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000020",
    name: "Content Operations & Distribution",
    category: "Domain Expertise",
    proficiency_level: "Expert",
    display_order: 20,
    published: true,
  },

  // Technical Tools & Productivity
  {
    id: "d0000000-0000-0000-0000-000000000021",
    name: "WordPress CMS",
    category: "Technical Tools & Software",
    proficiency_level: "Advanced",
    display_order: 21,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000022",
    name: "Project Management & Agile Workflows",
    category: "Technical Tools & Software",
    proficiency_level: "Expert",
    display_order: 22,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000023",
    name: "Microsoft Office & Google Workspace",
    category: "Technical Tools & Software",
    proficiency_level: "Expert",
    display_order: 23,
    published: true,
  },

  // Professional Skills
  {
    id: "d0000000-0000-0000-0000-000000000024",
    name: "Cross-Functional Collaboration",
    category: "Professional Skills",
    proficiency_level: "Expert",
    display_order: 24,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000025",
    name: "Instructional Storyboard Translation",
    category: "Professional Skills",
    proficiency_level: "Specialist",
    display_order: 25,
    published: true,
  },
  {
    id: "d0000000-0000-0000-0000-000000000026",
    name: "Quality Assurance & LMS Testing",
    category: "Professional Skills",
    proficiency_level: "Specialist",
    display_order: 26,
    published: true,
  },
];

export const initialProjects: Project[] = [
  {
    id: "e0000000-0000-0000-0000-000000000001",
    title: "BFSI Interactive Compliance & Regulatory Module",
    slug: "bfsi-interactive-compliance-module",
    summary:
      "End-to-end interactive eLearning course developed with Articulate 360 & Storyline for banking and financial services compliance.",
    description:
      "Designed and authored a multi-module compliance training program incorporating realistic BFSI scenario simulations, custom decision-tree branching, audio voiceover integration, and LMS-compliant SCORM tracking. Converted complex regulatory documentation and instructional storyboards into visually compelling, highly retained digital lessons.",
    category: "eLearning Course",
    thumbnail_url: "/images/projects/project-bfsi-course.svg",
    external_link: "https://linkedin.com/in/avinashmishraa",
    technologies: ["Articulate 360", "Articulate Storyline", "Adobe Photoshop", "SCORM / LMS", "Audio Sync"],
    responsibilities: [
      "Analyzed instructional design storyboards for banking workflows.",
      "Created custom UI widgets, interactive decision points, and quizzes.",
      "Engineered responsive layouts and rigorous QA testing for cross-browser LMS deployment.",
    ],
    verified_results:
      "100% compliance pass-rate achieved across 10,000+ corporate learners with 98% positive UI feedback.",
    is_featured: true,
    display_order: 1,
    published: true,
  },
  {
    id: "e0000000-0000-0000-0000-000000000002",
    title: "Enterprise Software Simulation & Onboarding Experience",
    slug: "enterprise-software-simulation",
    summary:
      "High-fidelity screen-based simulation course training enterprise personnel on digital workflow operations.",
    description:
      "Developed step-by-step interactive application simulations in Articulate Storyline, guiding users through live system walkthroughs, practice exercises with error detection, and final graded assessments.",
    category: "eLearning Course",
    thumbnail_url: "/images/projects/project-software-sim.svg",
    external_link: "https://linkedin.com/in/avinashmishraa",
    technologies: ["Articulate Storyline", "Screen Recording", "UI Simulation", "LMS Publishing"],
    responsibilities: [
      "Captured and optimized high-definition screen interactions.",
      "Structured modular hint systems and interactive click-path validation.",
      "Streamlined course loading speed by optimizing multimedia and asset weight.",
    ],
    verified_results: "Reduced software onboarding ramp-up time for new employees by 40%.",
    is_featured: true,
    display_order: 2,
    published: true,
  },
  {
    id: "e0000000-0000-0000-0000-000000000003",
    title: "Corporate Visual Identity & Training Asset Design",
    slug: "corporate-visual-identity-training-assets",
    summary:
      "Comprehensive graphic design system and presentation suite for corporate digital learning.",
    description:
      "Crafted standardized graphic assets, custom illustrations, iconography, and master presentation templates ensuring brand consistency across hundreds of digital training slides.",
    category: "Graphic Design",
    thumbnail_url: "/images/projects/project-visual-identity.svg",
    external_link: "https://linkedin.com/in/avinashmishraa",
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Branding Guidelines"],
    responsibilities: [
      "Established vector asset libraries and color palette standards.",
      "Designed high-impact infographics for intricate financial data.",
      "Maintained visual quality and pixel precision across all deliverables.",
    ],
    verified_results: "Adopted as official corporate eLearning visual standard across multi-team deliverables.",
    is_featured: true,
    display_order: 3,
    published: true,
  },
  {
    id: "e0000000-0000-0000-0000-000000000004",
    title: "Digital Multimedia Operations & Video Production Suite",
    slug: "digital-multimedia-operations-suite",
    summary:
      "Streamlined digital video production pipeline and engaging content delivery for broadcast & web.",
    description:
      "Spearheaded media post-production, motion graphics development, and digital marketing asset operations, connecting creative visuals with high audience engagement across multi-channel distribution.",
    category: "Video & Animation",
    thumbnail_url: "/images/projects/project-video-production.svg",
    external_link: "https://www.youtube.com/@TheEyesChicko",
    technologies: ["Adobe Premiere Pro", "Motion Graphics", "Audio Editing", "Digital Operations"],
    responsibilities: [
      "Supervised end-to-end video editing, audio equalization, and color grading.",
      "Implemented streamlined content turnover workflows across creative teams.",
    ],
    verified_results:
      "Accelerated content turnaround time by 30% while maintaining flawless broadcast consistency.",
    is_featured: true,
    display_order: 4,
    published: true,
  },
];

export const initialResumeVersions: ResumeVersion[] = [
  {
    id: "f0000000-0000-0000-0000-000000000001",
    version_label: "Senior Graphic Designer & eLearning Specialist – Official 2026",
    description:
      "Verified resume detailing Senior Graphic Designer & eLearning Developer roles at TCS and Sanskruti TV, Articulate 360 specialist background, BFSI domain expertise, education, and technical toolsets.",
    file_url: "/resumes/Avinash_Mishra_Resume.pdf",
    file_name: "Avinash_Mishra_Resume.pdf",
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
  {
    id: "10000000-0000-0000-0000-000000000002",
    youtube_video_id: "dQw4w9WgXcQ",
    title: "Articulate 360 & Storyline: Designing Immersive Digital Learning Experiences",
    description:
      "Deep dive into creating interactive scenarios, custom triggers, and LMS-compliant SCORM courses.",
    thumbnail_url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    published_at: "2026-10-08T14:30:00Z",
    watch_url: "https://www.youtube.com/@TheEyesChicko",
    duration: "18:20",
    view_count: "3.5K views",
    is_featured: true,
    is_visible: true,
    display_order: 2,
    last_synced_at: "2026-10-18T00:00:00Z",
  },
  {
    id: "10000000-0000-0000-0000-000000000003",
    youtube_video_id: "9bZkp7q19f0",
    title: "Graphic Design Principles for Corporate eLearning and BFSI",
    description:
      "How visual hierarchy, clean typography, and purposeful motion elevate corporate digital courses.",
    thumbnail_url: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    published_at: "2026-09-23T11:15:00Z",
    watch_url: "https://www.youtube.com/@TheEyesChicko",
    duration: "15:10",
    view_count: "2.8K views",
    is_featured: true,
    is_visible: true,
    display_order: 3,
    last_synced_at: "2026-10-18T00:00:00Z",
  },
];

export const initialEducation = [
  {
    degree: "Post Graduate Diploma in Journalism",
    period: "2015 – 2016",
    description: "Advanced media communications, editorial operations, investigative research, and storytelling.",
  },
  {
    degree: "Bachelor's in Computer Application (BCA)",
    period: "2011 – 2014",
    description: "Core computer science, software engineering principles, UI/UX architecture, and interactive computing.",
  },
];
