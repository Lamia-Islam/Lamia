import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ResearchInterestsSection } from "@/components/sections/ResearchInterestsSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { ExperienceEducationSection } from "@/components/sections/ExperienceEducationSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ServiceHonorsSection } from "@/components/sections/ServiceHonorsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Top menu (sticky) */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero (name, one-line headline, buttons, photo) */}
        <HeroSection />

        {/* 3. Stats strip (4 numbers) */}
        <StatsSection />

        {/* 4. About */}
        <AboutSection />

        {/* 5. Research Interests */}
        <ResearchInterestsSection />

        {/* 6. Featured Projects (4 cards, detail links, more projects) */}
        <FeaturedProjectsSection />

        {/* 7. Publications (categorized, bold name, DOIs) */}
        <PublicationsSection />

        {/* 8. & 9. Experience and Education (timelines, newest first) */}
        <ExperienceEducationSection />

        {/* 10. Skills (grouped chips, no progress bars) */}
        <SkillsSection />

        {/* 11. & 12. Academic Service, Leadership, Honors & Certifications */}
        <ServiceHonorsSection />

        {/* 13. Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
