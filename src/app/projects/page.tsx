import { Metadata } from "next";
import ProjectsSection from "@/components/home/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects & Prototypes",
  description:
    "Selected independent projects, digital learning courseware, and AI-assisted workflows created by Avinash Mishra.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-[#faf9f5] min-h-screen pt-16 pb-12">
      <ProjectsSection />
    </div>
  );
}
