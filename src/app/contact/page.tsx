import { Metadata } from "next";
import ContactSection from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Avinash Mishra for opportunities where marketing, communication, content, creativity and technology come together.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#faf9f5] min-h-screen pt-28 pb-20">
      <ContactSection />
    </div>
  );
}
