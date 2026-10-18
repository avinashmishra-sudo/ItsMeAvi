import {
  getProfile,
  getSiteSettings,
  getExperiences,
  getSkills,
  getProjects,
  getYouTubeVideos,
  getPublishedResume,
} from "@/lib/data";
import HeroSection from "@/components/home/HeroSection";
import SummarySection from "@/components/home/SummarySection";
import ExperienceSection from "@/components/home/ExperienceSection";
import SkillsSection from "@/components/home/SkillsSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import YouTubeSection from "@/components/home/YouTubeSection";
import ResumeSection from "@/components/home/ResumeSection";
import ContactSection from "@/components/home/ContactSection";

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  const settings = await getSiteSettings();
  const [profile, experiences, skills, projects, youtubeVideos, publishedResume] =
    await Promise.all([
      getProfile(),
      getExperiences(true), // only featured on home
      getSkills(),
      getProjects(true), // only featured on home
      getYouTubeVideos(settings?.youtube_display_count || 6),
      getPublishedResume(),
    ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* B. Hero Section */}
      {settings.show_hero_section && <HeroSection profile={profile} settings={settings} />}

      {/* C. Professional Summary */}
      {settings.show_about_section && <SummarySection profile={profile} />}

      {/* D. Selected Experience */}
      {settings.show_experience_section && <ExperienceSection experiences={experiences} />}

      {/* E. Skills and Tools */}
      {settings.show_skills_section && <SkillsSection skills={skills} />}

      {/* F. Featured Projects */}
      {settings.show_projects_section && <ProjectsSection projects={projects} />}

      {/* G. Latest YouTube Videos */}
      {settings.show_youtube_section && (
        <YouTubeSection
          videos={youtubeVideos}
          channelHandle={settings.youtube_channel_handle || "TheEyesChicko"}
        />
      )}

      {/* H. Resume Section */}
      <ResumeSection
        resume={publishedResume}
        downloadLabel={settings.resume_download_label || "Download Full Resume (PDF)"}
      />

      {/* I. Contact Section */}
      {settings.show_contact_section && (
        <ContactSection settings={settings} profile={profile} />
      )}
    </div>
  );
}
