import { SITE_URL } from "@/lib/site";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { experiences } from "@/content/experience";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { AnimatedCursor } from "@/components/layout/AnimatedCursor";
import { LazyCommandPalette } from "@/components/layout/LazyCommandPalette";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BlogsSection } from "@/components/sections/BlogsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}${profile.avatar}`,
  jobTitle: profile.title,
  description:
    "Full-stack software engineer building scalable web and mobile products for US enterprise teams — Next.js, Flutter, Node.js, MongoDB and cloud-ready APIs.",
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: experiences[0].company, url: experiences[0].companyUrl },
  knowsAbout: ["Next.js", "React", "TypeScript", "Flutter", "Node.js"],
  sameAs: socials.filter((s) => s.url.startsWith("http")).map((s) => s.url),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <AnimatedCursor />
      <ScrollProgress />
      <LazyCommandPalette />
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
