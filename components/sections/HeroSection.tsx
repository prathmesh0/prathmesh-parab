"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, ArrowRight, Code2, BookOpen, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { fadeInUp, fadeInRight, staggerContainer } from "@/animations/variants";

const TYPEWRITER_WORDS = profile.taglines;

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Code2,
  BookOpen,
  Mail,
};

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = TYPEWRITER_WORDS[wordIndex];

    if (phase === "typing") {
      if (displayed.length < word.length) {
        typingRef.current = setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length + 1));
        }, 80);
      } else {
        typingRef.current = setTimeout(() => setPhase("pausing"), 1500);
      }
    } else if (phase === "pausing") {
      typingRef.current = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (displayed.length > 0) {
        typingRef.current = setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length - 1));
        }, 45);
      } else {
        setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
        setPhase("typing");
      }
    }

    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [displayed, phase, wordIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background decorations — theme-aware */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "var(--gradient-start)" }} />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ background: "var(--gradient-end)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text block">{profile.name}</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={fadeInUp} className="text-xl sm:text-2xl text-muted-foreground font-medium h-8 flex items-center">
              <span className="text-foreground">{displayed}</span>
              <span className="animate-pulse text-primary ml-0.5 leading-none">|</span>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-lg leading-relaxed max-w-lg"
            >
              {profile.description}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <Button variant="gradient" size="lg" asChild>
                <a href={profile.resume} download>
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-1">
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon] ?? Mail;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Rotating rings — theme-aware border color */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-8 rounded-full border border-dashed border-primary/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-16 rounded-full border border-dashed border-primary/10"
              />

              {/* Avatar container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                {/* Glow — driven by theme CSS vars */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-30 animate-pulse"
                  style={{
                    background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                  }}
                />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-border/50 shadow-2xl">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=Prathmesh+Parab&size=320&background=6366f1&color=fff&bold=true";
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs">Scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

