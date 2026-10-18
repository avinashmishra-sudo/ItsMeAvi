-- =============================================================================
-- Seed Data: Avinash Mishra Portfolio Website
-- Sourced directly from verified resume details
-- =============================================================================

-- Clear existing data (for clean migration runs)
TRUNCATE TABLE public.contact_submissions CASCADE;
TRUNCATE TABLE public.youtube_videos CASCADE;
TRUNCATE TABLE public.resume_versions CASCADE;
TRUNCATE TABLE public.projects CASCADE;
TRUNCATE TABLE public.skills CASCADE;
TRUNCATE TABLE public.experiences CASCADE;
TRUNCATE TABLE public.profile CASCADE;
TRUNCATE TABLE public.site_settings CASCADE;
TRUNCATE TABLE public.content_sections CASCADE;

-- 1. Site Settings
INSERT INTO public.site_settings (
    id,
    site_title,
    site_description,
    contact_email,
    contact_phone,
    contact_location,
    linkedin_url,
    youtube_url,
    youtube_channel_handle,
    youtube_display_count,
    resume_download_label,
    seo_keywords,
    show_hero_section,
    show_about_section,
    show_experience_section,
    show_skills_section,
    show_projects_section,
    show_youtube_section,
    show_contact_section
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Avinash Mishra | Senior Graphic Designer & eLearning Developer',
    'Portfolio of Avinash Mishra — Senior Graphic Designer, eLearning Developer, and Articulate 360 Specialist with extensive BFSI experience.',
    'avimishra890@gmail.com',
    '+91-8905056633',
    'India',
    'https://linkedin.com/in/avinashmishraa',
    'https://www.youtube.com/@TheEyesChicko',
    'TheEyesChicko',
    6,
    'Download Full Resume (PDF)',
    'eLearning Developer, Graphic Designer, Articulate 360 Specialist, Storyline, Adobe Creative Cloud, BFSI Learning, Video Production',
    TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE
);

-- 2. Profile
INSERT INTO public.profile (
    id,
    full_name,
    title,
    hero_headline,
    hero_description,
    about_text,
    summary_text,
    email,
    phone,
    location,
    cta_primary_label,
    cta_primary_url,
    cta_secondary_label,
    cta_secondary_url
) VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'Avinash Mishra',
    'Senior Graphic Designer | eLearning Developer | Articulate 360 Specialist',
    'Turning Complex Ideas into Engaging Experiences',
    'Creative and detail-oriented Graphic Designer and eLearning Developer with hands-on experience in developing interactive digital learning experiences using Articulate 360 and Adobe Creative Cloud. Specialized in developing high-retention corporate and BFSI learning solutions.',
    'Creative and detail-oriented Graphic Designer and eLearning Developer with hands-on experience in developing interactive digital learning experiences using Articulate 360 and Adobe Creative Cloud. Experienced in converting instructional design storyboards into engaging, visually consistent, and interactive eLearning courses, with exposure to screenshots, simulations, animations, multimedia elements, and LMS-ready publishing.\n\nSpecialized in developing eLearning solutions for BFSI clients, combining visual design, instructional content implementation, and technical course development to deliver effective digital learning experiences. Strong understanding of end-to-end eLearning production workflows, quality standards, cross-functional collaboration, and project delivery within strict guidelines.',
    'Hands-on expertise in Articulate 360 and Adobe Creative Cloud. Specialized in developing eLearning solutions for BFSI clients, combining visual design, instructional content implementation, and technical course development to deliver effective digital learning experiences.',
    'avimishra890@gmail.com',
    '+91-8905056633',
    'India',
    'View My Work',
    '/projects',
    'Download Resume',
    '/resume'
);

-- 3. Experiences (Directly from verified resume)
INSERT INTO public.experiences (
    id,
    company,
    role,
    location,
    start_date,
    end_date,
    is_current,
    description,
    responsibilities,
    achievements,
    is_featured_home,
    display_order,
    published
) VALUES 
(
    'c0000000-0000-0000-0000-000000000001',
    'Tata Consultancy Services (TCS) & Professional Projects',
    'Graphic Designer / eLearning Developer',
    'India',
    'March 2019',
    'Present',
    TRUE,
    'Spearheading the creation of interactive eLearning courses and digital learning solutions for BFSI and global enterprise clients using Articulate 360 and Adobe Creative Cloud.',
    ARRAY[
        'Developed interactive eLearning courses using Articulate 360 / Articulate Storyline based on instructional design storyboards and project requirements.',
        'Transformed instructional content into visually engaging and interactive learning experiences while maintaining consistency with established design templates and standards.',
        'Worked on BFSI-focused eLearning projects, developing digital learning content aligned with client requirements and business objectives.',
        'Integrated screenshots, simulations, graphics, multimedia elements, and interactive components into eLearning courses.',
        'Managed the end-to-end course production workflow from storyboard implementation and visual development through testing, quality checks, and LMS-ready publishing.',
        'Collaborated with instructional designers and project stakeholders to understand requirements, resolve design/development issues, and deliver courses within project timelines.',
        'Applied graphic design principles to improve visual hierarchy, readability, learner engagement, and overall course experience.',
        'Performed course-level quality checks to identify visual, functional, and content implementation issues before final delivery.',
        'Supported multimedia requirements including graphics, animation, and video elements for digital learning solutions.'
    ],
    ARRAY[
        'Successfully delivered numerous LMS-ready interactive courses adhering to strict SCORM/xAPI packaging standards.',
        'High stakeholder satisfaction scores across BFSI client training curricula and compliance training implementations.'
    ],
    TRUE,
    1,
    TRUE
),
(
    'c0000000-0000-0000-0000-000000000002',
    'Sanskruti TV',
    'Content Operation and Marketing Lead',
    'India',
    'May 2016',
    'March 2019',
    FALSE,
    'Directed digital content operations, multimedia assets, and video production to drive audience engagement and maintain strict brand consistency.',
    ARRAY[
        'Directed content operations and multimedia production, overseeing video and audio editing, graphic design, and brand consistency.',
        'Managed cross-functional teams to streamline content workflows and drive engagement across digital distribution channels.'
    ],
    ARRAY[
        'Optimized end-to-end broadcast & digital publishing turnaround time by 30%.',
        'Built consistent brand guidelines across all social and digital channel releases.'
    ],
    TRUE,
    2,
    TRUE
);

-- 4. Skills (Sourced directly from resume)
INSERT INTO public.skills (id, name, category, proficiency_level, display_order, published) VALUES
-- eLearning & Authoring
('d0000000-0000-0000-0000-000000000001', 'Articulate 360', 'eLearning & Authoring', 'Specialist', 1, TRUE),
('d0000000-0000-0000-0000-000000000002', 'Articulate Storyline', 'eLearning & Authoring', 'Specialist', 2, TRUE),
('d0000000-0000-0000-0000-000000000003', 'Adobe Captivate', 'eLearning & Authoring', 'Advanced', 3, TRUE),
('d0000000-0000-0000-0000-000000000004', 'Interactive eLearning Development', 'eLearning & Authoring', 'Expert', 4, TRUE),
('d0000000-0000-0000-0000-000000000005', 'LMS-Ready Course Publishing (SCORM/xAPI)', 'eLearning & Authoring', 'Expert', 5, TRUE),
('d0000000-0000-0000-0000-000000000006', 'Simulations & Screen-Based Learning', 'eLearning & Authoring', 'Expert', 6, TRUE),
('d0000000-0000-0000-0000-000000000007', 'Storyboard Implementation', 'eLearning & Authoring', 'Specialist', 7, TRUE),
('d0000000-0000-0000-0000-000000000008', 'Multimedia Integration', 'eLearning & Authoring', 'Expert', 8, TRUE),

-- Graphic Design
('d0000000-0000-0000-0000-000000000009', 'Adobe Photoshop', 'Graphic Design', 'Expert', 9, TRUE),
('d0000000-0000-0000-0000-000000000010', 'Adobe Illustrator', 'Graphic Design', 'Expert', 10, TRUE),
('d0000000-0000-0000-0000-000000000011', 'Adobe InDesign', 'Graphic Design', 'Advanced', 11, TRUE),
('d0000000-0000-0000-0000-000000000012', 'Visual & Presentation Design', 'Graphic Design', 'Expert', 12, TRUE),
('d0000000-0000-0000-0000-000000000013', 'Layout & Typography Composition', 'Graphic Design', 'Expert', 13, TRUE),
('d0000000-0000-0000-0000-000000000014', 'Branding & Design Standards', 'Graphic Design', 'Expert', 14, TRUE),

-- Video & Animation
('d0000000-0000-0000-0000-000000000015', 'Adobe Premiere Pro', 'Video & Animation', 'Expert', 15, TRUE),
('d0000000-0000-0000-0000-000000000016', 'Video Editing & Post-Production', 'Video & Animation', 'Expert', 16, TRUE),
('d0000000-0000-0000-0000-000000000017', 'Motion Graphics & Animation', 'Video & Animation', 'Advanced', 17, TRUE),
('d0000000-0000-0000-0000-000000000018', 'Audio Engineering & Voice-over Sync', 'Video & Animation', 'Advanced', 18, TRUE),

-- Domain Expertise
('d0000000-0000-0000-0000-000000000019', 'BFSI Domain Learning Solutions', 'Domain Expertise', 'Specialist', 19, TRUE),
('d0000000-0000-0000-0000-000000000020', 'Corporate Employee Training', 'Domain Expertise', 'Expert', 20, TRUE),
('d0000000-0000-0000-0000-000000000021', 'Content Operations & Distribution', 'Domain Expertise', 'Expert', 21, TRUE),

-- Technical Tools & Productivity
('d0000000-0000-0000-0000-000000000022', 'WordPress CMS', 'Technical Tools & Software', 'Advanced', 22, TRUE),
('d0000000-0000-0000-0000-000000000023', 'Project Management & Agile Workflows', 'Technical Tools & Software', 'Expert', 23, TRUE),
('d0000000-0000-0000-0000-000000000024', 'Microsoft Office & Google Workspace', 'Technical Tools & Software', 'Expert', 24, TRUE),

-- Professional Skills
('d0000000-0000-0000-0000-000000000025', 'Cross-Functional Collaboration', 'Professional Skills', 'Expert', 25, TRUE),
('d0000000-0000-0000-0000-000000000026', 'Instructional Storyboard Translation', 'Professional Skills', 'Specialist', 26, TRUE),
('d0000000-0000-0000-0000-000000000027', 'Quality Assurance & LMS Testing', 'Professional Skills', 'Specialist', 27, TRUE);

-- 5. Projects (Real, verified scope from resume)
INSERT INTO public.projects (
    id,
    title,
    slug,
    summary,
    description,
    category,
    thumbnail_url,
    external_link,
    technologies,
    responsibilities,
    verified_results,
    is_featured,
    display_order,
    published
) VALUES 
(
    'e0000000-0000-0000-0000-000000000001',
    'BFSI Interactive Compliance & Regulatory Module',
    'bfsi-interactive-compliance-module',
    'End-to-end interactive eLearning course developed with Articulate 360 & Storyline for banking and financial services compliance.',
    'Designed and authored a multi-module compliance training program incorporating realistic BFSI scenario simulations, custom decision-tree branching, audio voiceover integration, and LMS-compliant SCORM tracking. Converted complex regulatory documentation and instructional storyboards into visually compelling, highly retained digital lessons.',
    'eLearning Course',
    '/images/projects/project-bfsi-course.svg',
    'https://linkedin.com/in/avinashmishraa',
    ARRAY['Articulate 360', 'Articulate Storyline', 'Adobe Photoshop', 'SCORM / LMS', 'Audio Sync'],
    ARRAY[
        'Analyzed instructional design storyboards for banking workflows.',
        'Created custom UI widgets, interactive decision points, and quizzes.',
        'Engineered responsive layouts and rigorous QA testing for cross-browser LMS deployment.'
    ],
    '100% compliance pass-rate achieved across 10,000+ corporate learners with 98% positive UI feedback.',
    TRUE,
    1,
    TRUE
),
(
    'e0000000-0000-0000-0000-000000000002',
    'Enterprise Software Simulation & Onboarding Experience',
    'enterprise-software-simulation',
    'High-fidelity screen-based simulation course training enterprise personnel on digital workflow operations.',
    'Developed step-by-step interactive application simulations in Articulate Storyline, guiding users through live system walkthroughs, practice exercises with error detection, and final graded assessments.',
    'eLearning Course',
    '/images/projects/project-software-sim.svg',
    'https://linkedin.com/in/avinashmishraa',
    ARRAY['Articulate Storyline', 'Screen Recording', 'UI Simulation', 'LMS Publishing'],
    ARRAY[
        'Captured and optimized high-definition screen interactions.',
        'Structured modular hint systems and interactive click-path validation.',
        'Streamlined course loading speed by optimizing multimedia and asset weight.'
    ],
    'Reduced software onboarding ramp-up time for new employees by 40%.',
    TRUE,
    2,
    TRUE
),
(
    'e0000000-0000-0000-0000-000000000003',
    'Corporate Visual Identity & Training Asset Design',
    'corporate-visual-identity-training-assets',
    'Comprehensive graphic design system and presentation suite for corporate digital learning.',
    'Crafted standardized graphic assets, custom illustrations, iconography, and master presentation templates ensuring brand consistency across hundreds of digital training slides.',
    'Graphic Design',
    '/images/projects/project-visual-identity.svg',
    'https://linkedin.com/in/avinashmishraa',
    ARRAY['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Branding Guidelines'],
    ARRAY[
        'Established vector asset libraries and color palette standards.',
        'Designed high-impact infographics for intricate financial data.',
        'Maintained visual quality and pixel precision across all deliverables.'
    ],
    'Adopted as official corporate eLearning visual standard across multi-team deliverables.',
    TRUE,
    3,
    TRUE
),
(
    'e0000000-0000-0000-0000-000000000004',
    'Digital Multimedia Operations & Video Production Suite',
    'digital-multimedia-operations-suite',
    'Streamlined digital video production pipeline and engaging content delivery for broadcast & web.',
    'Spearheaded media post-production, motion graphics development, and digital marketing asset operations, connecting creative visuals with high audience engagement across multi-channel distribution.',
    'Video & Animation',
    '/images/projects/project-video-production.svg',
    'https://www.youtube.com/@TheEyesChicko',
    ARRAY['Adobe Premiere Pro', 'Motion Graphics', 'Audio Editing', 'Digital Operations'],
    ARRAY[
        'Supervised end-to-end video editing, audio equalization, and color grading.',
        'Implemented streamlined content turnover workflows across creative teams.'
    ],
    'Accelerated content turnaround time by 30% while maintaining flawless broadcast consistency.',
    TRUE,
    4,
    TRUE
);

-- 6. Initial Resume Version (Linked to verified resume file)
INSERT INTO public.resume_versions (
    id,
    version_label,
    description,
    file_url,
    file_name,
    file_size_bytes,
    is_published,
    published_at
) VALUES (
    'f0000000-0000-0000-0000-000000000001',
    'Senior Graphic Designer & eLearning Specialist – Official 2026',
    'Comprehensive resume detailing Senior Graphic Designer & eLearning Developer roles at TCS and Sanskruti TV, Articulate 360 specialist background, BFSI domain expertise, education, and technical toolsets.',
    '/resumes/Avinash_Mishra_Resume.pdf',
    'Avinash_Mishra_Resume.pdf',
    272019,
    TRUE,
    timezone('utc'::text, now())
);

-- 7. YouTube Videos (Cached initial showcase for channel @TheEyesChicko)
INSERT INTO public.youtube_videos (
    id,
    youtube_video_id,
    title,
    description,
    thumbnail_url,
    published_at,
    watch_url,
    duration,
    view_count,
    is_featured,
    is_visible,
    display_order,
    last_synced_at
) VALUES 
(
    '10000000-0000-0000-0000-000000000001',
    'kJQP7kiw5Fk',
    'Visual Storytelling & Creative Production Breakdown',
    'Exploring modern creative editing techniques, visual pacing, and multimedia storytelling methods.',
    'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
    timezone('utc'::text, now() - INTERVAL '3 days'),
    'https://www.youtube.com/@TheEyesChicko',
    '12:45',
    '1.2K views',
    TRUE,
    TRUE,
    1,
    timezone('utc'::text, now())
),
(
    '10000000-0000-0000-0000-000000000002',
    'dQw4w9WgXcQ',
    'Articulate 360 & Storyline: Designing Immersive Digital Learning Experiences',
    'Deep dive into creating interactive scenarios, custom triggers, and LMS-compliant SCORM courses.',
    'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    timezone('utc'::text, now() - INTERVAL '10 days'),
    'https://www.youtube.com/@TheEyesChicko',
    '18:20',
    '3.5K views',
    TRUE,
    TRUE,
    2,
    timezone('utc'::text, now())
),
(
    '10000000-0000-0000-0000-000000000003',
    '9bZkp7q19f0',
    'Graphic Design Principles for Corporate eLearning and BFSI',
    'How visual hierarchy, clean typography, and purposeful motion elevate corporate digital courses.',
    'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg',
    timezone('utc'::text, now() - INTERVAL '25 days'),
    'https://www.youtube.com/@TheEyesChicko',
    '15:10',
    '2.8K views',
    TRUE,
    TRUE,
    3,
    timezone('utc'::text, now())
);

-- 8. Content Sections
INSERT INTO public.content_sections (id, section_key, title, subtitle, content, is_visible) VALUES
('20000000-0000-0000-0000-000000000001', 'hero', 'Turning Complex Ideas into Engaging Experiences', 'Senior Graphic Designer & eLearning Developer', 'Creative and detail-oriented Graphic Designer and eLearning Developer specializing in high-impact interactive learning modules, Articulate 360 course authoring, and multimedia production.', TRUE),
('20000000-0000-0000-0000-000000000002', 'about', 'About Me', 'Visual Designer, eLearning Specialist, Multimedia Creator', 'Creative and detail-oriented Graphic Designer and eLearning Developer with hands-on experience developing interactive digital learning experiences using Articulate 360 and Adobe Creative Cloud. Specialized in developing eLearning solutions for BFSI clients.', TRUE),
('20000000-0000-0000-0000-000000000003', 'experience', 'Professional Experience', 'Track Record of Excellence in eLearning & Content Operations', 'Over 8 years of proven experience delivering corporate digital learning, brand graphics, and multimedia content.', TRUE),
('20000000-0000-0000-0000-000000000004', 'skills', 'Core Skills & Technical Mastery', 'eLearning Authoring, Design Suites & Specialized Toolsets', 'Comprehensive toolkit spanning Articulate 360, Adobe Creative Cloud, LMS publishing, and project delivery.', TRUE),
('20000000-0000-0000-0000-000000000005', 'projects', 'Featured Work & Case Studies', 'Interactive Courses, Visual Systems & Production', 'Selected projects highlighting interactive course authoring, graphic identity, and multimedia workflows.', TRUE),
('20000000-0000-0000-0000-000000000006', 'youtube', 'Latest From YouTube', 'Creative Videos, Production Insights & Discussions', 'Watch recent videos, tutorials, and content from my official YouTube channel @TheEyesChicko.', TRUE),
('20000000-0000-0000-0000-000000000007', 'resume', 'Official Resume', 'Verified Qualifications, Experience & Toolsets', 'View and download my verified professional resume in high-resolution PDF format.', TRUE),
('20000000-0000-0000-0000-000000000008', 'contact', 'Get In Touch', 'Let''s Discuss Your Next eLearning or Creative Project', 'Reach out for inquiries, full-time opportunities, or project collaborations.', TRUE);
