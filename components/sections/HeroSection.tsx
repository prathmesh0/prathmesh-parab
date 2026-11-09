import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
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
            <Reveal duration={0.6}>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand" />
                  </span>
                  Available for work
                </span>
                <span>Mumbai · <LocalTime /></span>
                <span>Currently building VisitLume AI</span>
              </p>
            </Reveal>

            <SplitLines as="h1" immediate delay={0.05} text={profile.name} className="text-display mt-8" />

            <Reveal delay={0.25} duration={0.7}>
              <p className="prose-measure mt-8 text-xl leading-snug text-foreground md:text-2xl">
                Frontend engineer building fast, accessible product UI for US enterprise teams —
                Next.js, TypeScript, Flutter.
              </p>
              <div className="mt-4 flex items-baseline gap-3 font-mono text-sm text-muted-foreground">
                <span aria-hidden>→</span>
                <SlotText words={profile.taglines} className="min-w-0 text-foreground" />
              </div>
              <p className="prose-measure mt-4 text-muted-foreground">{profile.description}</p>
            </Reveal>

            <Reveal delay={0.35} duration={0.7}>
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
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    View Projects
                    <ArrowUpRight className="size-4" />
                  </ScrollLink>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:self-end">
            <HeroPortrait src={profile.avatar} alt={`Portrait of ${profile.name}`} />
          </div>
        </div>

        <Reveal delay={0.45} duration={0.7}>
          <ul className="mt-16 flex flex-wrap border-t border-border font-mono text-sm">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-1.5 pr-8 pt-4 text-muted-foreground transition-colors hover:text-brand"
                >
                  {s.name}
                  <ArrowUpRight className="size-3.5 transition-transform duration-[240ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
