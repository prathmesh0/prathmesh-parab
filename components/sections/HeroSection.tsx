import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { SplitWords } from "@/components/motion/SplitWords";
import { SlotText } from "@/components/motion/SlotText";
import { Magnetic } from "@/components/motion/Magnetic";
import { LocalTime } from "@/components/shared/LocalTime";
import { ScrollLink } from "@/components/shared/ScrollLink";
import { HeroPortrait } from "@/components/sections/HeroPortrait";
import { HeroSpotlight } from "@/components/sections/HeroSpotlight";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-32 md:pt-40">
      <HeroSpotlight targetId="home" />

      <div className="container-grid">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-8">
            <div className="intro-up">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand" />
                  </span>
                  Available for work
                </span>
                <span aria-hidden className="hidden h-3 w-px bg-border sm:block" />
                <span>Mumbai · <LocalTime /></span>
                <span aria-hidden className="hidden h-3 w-px bg-border sm:block" />
                <span>Currently building VisitLume AI</span>
              </p>
            </div>

            <SplitWords as="h1" delay={0.05} text={profile.name} className="text-display-hero mt-8" />

            <div className="intro-up" style={{ "--d": "0.25s" } as CSSProperties}>
              <p className="prose-measure mt-8 text-lg leading-snug text-foreground">
                Full-stack engineer building web and mobile products for US enterprise teams.
              </p>
              <div className="mt-4 flex items-baseline gap-3 font-mono text-sm text-muted-foreground">
                <span aria-hidden>→</span>
                <SlotText words={profile.taglines} className="min-w-0 text-foreground" />
              </div>
              <p className="prose-measure mt-4 text-muted-foreground">{profile.description}</p>
            </div>

            <div className="intro-up" style={{ "--d": "0.35s" } as CSSProperties}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href={profile.resume}
                    download
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-85"
                  >
                    <ArrowDown className="size-4" />
                    Download Resume
                  </a>
                </Magnetic>
                <Magnetic>
                  <ScrollLink
                    href="#projects"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition-colors hover:border-brand hover:text-accent-ink"
                  >
                    View Projects
                    <ArrowUpRight className="size-4" />
                  </ScrollLink>
                </Magnetic>
              </div>
            </div>
          </div>

          <div className="col-span-12 w-full max-w-[16rem] sm:max-w-[17rem] lg:col-span-4 lg:max-w-[18rem] lg:self-end lg:justify-self-end">
            <HeroPortrait src={profile.avatar} alt={`Portrait of ${profile.name}`} />
          </div>
        </div>

        <div className="intro-up" style={{ "--d": "0.45s" } as CSSProperties}>
          <ul className="mt-16 flex flex-wrap border-t border-border font-mono text-sm">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-1.5 pr-8 pt-4 text-muted-foreground transition-colors hover:text-accent-ink"
                >
                  {s.name}
                  <ArrowUpRight className="size-3.5 transition-transform duration-[240ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
