import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { ExperienceEducationSection } from "@/components/sections/ExperienceEducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <main>
        <AboutSection />
        <NewsSection />
        <FeaturedProjectsSection />
        <PublicationsSection />
        <ExperienceEducationSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
