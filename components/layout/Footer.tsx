import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";
import { SplitLines } from "@/components/motion/SplitLines";
import { LocalTime } from "@/components/shared/LocalTime";
import { ScrollLink } from "@/components/shared/ScrollLink";

export function Footer() {
  return (
    <footer className="border-t border-border pb-8 pt-16">
      <div className="container-grid">
        <SplitLines
          as="p"
          text={profile.name}
          className="text-[clamp(3rem,11vw,10rem)] font-medium leading-[0.95] tracking-[-0.04em]"
        />

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:pr-16">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>
            {profile.location} · <LocalTime />
          </p>
          <p>Built with Next.js · TypeScript</p>
          <ScrollLink
            href="#home"
            className="group inline-flex min-h-11 items-center gap-1.5 text-foreground transition-colors hover:text-accent-ink"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-[240ms] group-hover:-translate-y-0.5" />
          </ScrollLink>
        </div>
      </div>
    </footer>
  );
}
