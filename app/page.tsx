import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { AnimatedCursor } from "@/components/layout/AnimatedCursor";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BlogsSection } from "@/components/sections/BlogsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <AnimatedCursor />
      <ScrollProgress />
      <CommandPalette />
      <Navbar />

      <main id="main">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogsSection />
        <ContactSection />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
