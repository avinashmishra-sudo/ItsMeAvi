export interface ProjectItem {
  id: string;
  title: string;
  category: "Web & AI" | "Apps & Digital Innovation" | "Digital Learning" | "Content & Video";
  description: string;
  tools: string;
  statusText?: string;
  detailsConfirmed: boolean;
  externalLink?: string;
  channelReference?: string;
  imagePlaceholderText: string;
  imageUrl?: string;
  badge?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  metrics?: { label: string; value: string }[];
  highlights?: string[];
  isCurrent?: boolean;
}

export interface ExpertiseArea {
  id: string;
  title: string;
  description: string;
  skills: string[];
  iconName: string;
}

export const portfolioData = {
  meta: {
    name: "Avinash Mishra",
    title: "Avinash Mishra | Marketing, Communication, Content & Digital Learning",
    description:
      "Explore the professional portfolio of Avinash Mishra, a multidisciplinary professional with 10+ years of experience in marketing, communication, content, creative production and digital learning.",
    eyebrow: "MULTIDISCIPLINARY PROFESSIONAL",
    headline: "I Connect Strategy, Stories, Creativity and Technology.",
    supportingText:
      "I’m a marketing, communication and content professional with 10+ years of experience across BFSI, e-commerce, news media and television. I combine strategic thinking with hands-on execution across brand building, digital marketing, content, creative production, e-learning and AI-assisted digital creation.",
    capabilityLine:
      "Brand & Marketing · Communication & PR · Content & Creative · Digital Learning · AI-Assisted Projects",
    primaryCta: "Explore My Work",
    secondaryCta: "Download Resume",
    viewResumeCta: "View Resume",
    avatarUrl: "/images/profile.jpg",
  },

  contact: {
    email: "avimishra890@gmail.com",
    phone: "+91-8905056633",
    location: "India",
    linkedin: "https://linkedin.com/in/avinashmishraa/",
    youtubeChannel: "https://www.youtube.com/@TheEyesChicko",
    resumeUrl: "/resume.pdf",
    heading: "Have a Project or Opportunity in Mind?",
    supportingText:
      "I'm interested in opportunities where marketing, communication, content, creativity and technology come together.",
  },

  about: {
    heading: "Strategy Meets Hands-On Execution",
    copy: [
      "My career has been shaped by curiosity, adaptability and a willingness to learn by doing. Across marketing, communication, editorial operations and creative production, I have developed a broad set of practical skills that help me contribute beyond a single job function.",
      "When a business need arises, I am comfortable learning a new tool or workflow, setting up the basics and taking the work through its initial execution. From independently learning Photoshop and video editing to exploring AI-assisted website and app creation, I focus on turning ideas into practical outcomes.",
      "My experience also includes working in a television production environment where I learned basic router and switch setup when technical support was unavailable. These experiences reflect my problem-solving mindset and willingness to take ownership.",
    ],
    principles: [
      {
        title: "Learn Independently",
        description:
          "Self-directed mastery of new tools, frameworks, and workflows when business needs emerge.",
      },
      {
        title: "Execute Practically",
        description:
          "Comfortable handling early-stage setup and taking projects from zero to initial execution.",
      },
      {
        title: "Adapt Across Disciplines",
        description:
          "Synthesizing marketing strategy, editorial narrative, creative assets, and technical fundamentals.",
      },
    ],
  },

  expertise: [
    {
      id: "brand-marketing",
      title: "Brand & Marketing",
      description:
        "Branding, marketing strategy, digital marketing, campaign planning, audience engagement and SEO.",
      skills: ["Branding", "Marketing Strategy", "Digital Marketing", "Campaign Planning", "Audience Engagement", "SEO"],
      iconName: "TrendingUp",
    },
    {
      id: "corporate-comm-pr",
      title: "Corporate Communication & PR",
      description:
        "Corporate communications, public relations, media relations, stakeholder coordination and messaging.",
      skills: ["Corporate Communications", "Public Relations", "Media Relations", "Stakeholder Coordination", "Executive Messaging"],
      iconName: "Megaphone",
    },
    {
      id: "content-editorial",
      title: "Content & Editorial",
      description:
        "Content writing, content development, editorial planning, scripts, long-form content, short-form content and content repurposing.",
      skills: ["Content Writing", "Content Development", "Editorial Planning", "Scripts", "Long-Form Content", "Short-Form Content", "Content Repurposing"],
      iconName: "FileText",
    },
    {
      id: "creative-production",
      title: "Creative Production",
      description:
        "Video creation, video editing, graphic design, visual storytelling and multimedia production.",
      skills: ["Video Creation", "Video Editing", "Graphic Design", "Visual Storytelling", "Multimedia Production"],
      iconName: "Video",
    },
    {
      id: "digital-learning",
      title: "E-learning & Digital Learning",
      description:
        "E-learning course development using Articulate Storyline, Rise 360 and Adobe Captivate.",
      skills: ["Articulate Storyline", "Rise 360", "Adobe Captivate", "Interactive Course Authoring", "Simulations"],
      iconName: "GraduationCap",
    },
    {
      id: "ai-digital-innovation",
      title: "AI & Digital Innovation",
      description:
        "AI-assisted content creation, website creation, app prototyping, digital experimentation and independent tool learning.",
      skills: ["AI-Assisted Content", "Website Creation", "App Prototyping", "Digital Experimentation", "Independent Tool Learning"],
      iconName: "Cpu",
    },
  ] as ExpertiseArea[],

  skillGroups: [
    {
      title: "Analytics & Platforms",
      items: [
        "GA4",
        "Looker Studio",
        "WordPress",
        "Adobe Experience Manager",
        "Salesforce",
        "HubSpot",
        "Mailchimp",
        "Hootsuite",
      ],
      iconName: "BarChart3",
    },
    {
      title: "Creative Tools",
      items: ["Adobe Photoshop", "Adobe Premiere Pro", "Adobe InDesign"],
      iconName: "Palette",
    },
    {
      title: "Technical Fundamentals",
      items: [
        "Basic Networking",
        "Router & Switch Setup (TV Production Environment)",
        "IP Management",
      ],
      iconName: "Server",
    },
  ],

  experience: [
    {
      id: "tcs",
      company: "Tata Consultancy Services (TCS)",
      role: "Content Marketing & Communication Manager",
      duration: "March 2019 – Present",
      isCurrent: true,
      description:
        "Contribute to content marketing and communication initiatives across planning, production, distribution and optimization.",
      metrics: [
        { label: "Reported Organic Traffic Growth", value: "53%+" },
        { label: "Campaign ROI Improvement", value: "30–40%" },
        { label: "Conversion Improvement", value: "25%" },
        { label: "Cost Per Acquisition (CPA) Reduction", value: "30%" },
        { label: "Campaign Budgets Managed", value: "> ₹3 Crore" },
      ],
      highlights: [
        "Collaborated with stakeholders, agencies, and cross-functional teams to align strategy and delivery.",
        "Monitored performance metrics using enterprise analytics dashboards to optimize conversion funnels.",
        "Delivered multi-channel content strategies across global enterprise and BFSI client portfolios.",
      ],
    },
    {
      id: "sanskruti-tv",
      company: "Sanskruti TV",
      role: "Content Operations & Marketing Lead",
      duration: "May 2016 – March 2019",
      isCurrent: false,
      description:
        "Led a 10-member team across content operations and marketing workflows, managing broadcast turnover and digital audience expansion.",
      metrics: [
        { label: "Audience Engagement Growth", value: "50%+" },
        { label: "Operational Efficiency Improvement", value: "30%" },
        { label: "On-Time Broadcast Delivery", value: "100%" },
      ],
      highlights: [
        "Led a 10-member team across content operations and digital distribution channels.",
        "Learned practical router and switch configuration in the production-control-room environment when technical support was unavailable, helping handle basic connectivity needs.",
        "Streamlined post-production turnover and enforced high visual and brand standards across broadcasts.",
      ],
    },
    {
      id: "hamari-mahek",
      company: "Hamari Mahek",
      role: "City Reporter",
      duration: "February 2015 – March 2016",
      isCurrent: false,
      description: "Reported local news and developed editorial content for publication.",
      highlights: [
        "Covered local civic affairs, investigative beats, and daily human-interest news stories.",
        "Honed journalistic ethics, strict deadline discipline, and factual storytelling.",
      ],
    },
    {
      id: "sareesbazaar",
      company: "SareesBazaar.com",
      role: "Content Writer & Marketing Executive",
      duration: "January 2014 – February 2015",
      isCurrent: false,
      description:
        "Created and optimized e-commerce content to support organic search visibility and customer engagement.",
      metrics: [
        { label: "First-Page Search Rankings", value: "50+ Keywords" },
      ],
      highlights: [
        "Authored engaging product descriptions, category guides, and promotional email copies.",
        "Helped achieve first-page search rankings for 50+ keywords through on-page SEO optimization.",
        "Contributed to noticeable improvements in e-commerce conversion volume.",
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "project-1",
      title: "AI-Assisted Website Creation & Architecture",
      category: "Web & AI",
      description:
        "Modern responsive web applications and landing systems built using Next.js, Tailwind CSS, Supabase, and AI acceleration workflows.",
      tools: "Next.js, Tailwind CSS, TypeScript, Supabase, AI Acceleration",
      statusText: "Live Application",
      detailsConfirmed: true,
      imagePlaceholderText: "AI Web Workflow Interface",
      imageUrl: "/images/projects/project-visual-identity.svg",
      badge: "Full-Stack System",
    },
    {
      id: "project-2",
      title: "App Development & Interactive UI Prototyping",
      category: "Apps & Digital Innovation",
      description:
        "High-fidelity UI/UX simulation and interactive application components engineered for digital workflows and multi-device usability.",
      tools: "UI/UX Architecture, Interactive State Management, Component Design",
      statusText: "Interactive Prototype",
      detailsConfirmed: true,
      imagePlaceholderText: "Mobile & Web App Prototyping",
      imageUrl: "/images/projects/project-software-sim.svg",
      badge: "Interactive UI",
    },
    {
      id: "project-3",
      title: "BFSI E-Learning Courseware & Compliance Simulation",
      category: "Digital Learning",
      description:
        "End-to-end interactive modules with custom decision-tree branching, scenario assessments, and SCORM tracking for banking personnel.",
      tools: "Articulate Storyline, Rise 360, Adobe Photoshop, SCORM / LMS",
      statusText: "Enterprise Deployed",
      detailsConfirmed: true,
      imagePlaceholderText: "Articulate 360 Interactive Courseware",
      imageUrl: "/images/projects/project-bfsi-course.svg",
      badge: "Enterprise Standard",
    },
    {
      id: "project-4",
      title: "YouTube Digital Media & Video Production",
      category: "Content & Video",
      description:
        "Comprehensive channel strategy, editorial pacing, motion graphics, and video production across brand campaigns and case studies.",
      tools: "Premiere Pro, After Effects, Storyboarding, Audience Analytics",
      statusText: "Active Channel",
      detailsConfirmed: true,
      channelReference:
        "Official Channel: https://www.youtube.com/@TheEyesChicko",
      externalLink: "https://www.youtube.com/@TheEyesChicko",
      imagePlaceholderText: "YouTube Content Operations",
      imageUrl: "/images/projects/project-video-production.svg",
      badge: "Creative Media",
    },
  ] as ProjectItem[],

  industries: [
    {
      name: "BFSI",
      description: "Banking, Financial Services & Insurance corporate communications and marketing.",
      icon: "Landmark",
    },
    {
      name: "E-Commerce",
      description: "Conversion copywriting, organic search rankings, and customer acquisition.",
      icon: "ShoppingCart",
    },
    {
      name: "News & Digital Media",
      description: "Print journalism, civic reporting, and multi-channel editorial operations.",
      icon: "Newspaper",
    },
    {
      name: "Devotional TV & Post-Production",
      description: "Broadcast turnaround, control room networking, and video production.",
      icon: "Tv",
    },
  ],

  strengths: [
    "Self-directed learner who independently learns tools and workflows when business needs arise.",
    "Hands-on contributor who can take early-stage work from setup to initial execution.",
    "Cross-functional mindset spanning marketing, communication, content, creative production and digital learning.",
    "Practical problem-solver who learns through experimentation and real-world challenges.",
    "Cost-conscious approach to early-stage project execution and reduced dependence on external support where appropriate.",
  ],

  education: [
    {
      degree: "Postgraduate Diploma in Journalism",
      year: "2016",
      description: "Journalistic reporting, media ethics, investigative research, and editorial production.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      year: "2014",
      description: "Computer science fundamentals, software engineering, databases, and digital systems.",
    },
  ],
};
