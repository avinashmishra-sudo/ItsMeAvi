import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import YouTubeSection from "@/components/home/YouTubeSection";
import BlogSection from "@/components/home/BlogSection";
import IndustryExperienceSection from "@/components/home/IndustryExperienceSection";
import StrengthsSection from "@/components/home/StrengthsSection";
import EducationSection from "@/components/home/EducationSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Expertise Section & Skill Groups */}
      <ExpertiseSection />

      {/* 4. Professional Experience Timeline */}
      <ExperienceSection />

      {/* 5. Selected Projects & Prototypes */}
      <ProjectsSection />

      {/* 6. Creative Media & Video Storytelling (YouTube) */}
      <YouTubeSection />

      {/* 7. Articles & Perspective (Blog) */}
      <BlogSection />

      {/* 8. Industry Experience (BFSI, E-comm, Media, TV) */}
      <IndustryExperienceSection />

      {/* 7. Professional Strengths ("What I Bring to a Team") */}
      <StrengthsSection />

      {/* 8. Education */}
      <EducationSection />

      {/* 9. Contact Section */}
      <ContactSection />
    </div>
  );
}
