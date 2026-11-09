"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { EASE_OUT } from "@/lib/motion";
import { LazyContactForm } from "@/components/sections/LazyContactForm";
import { SectionLabel } from "@/components/motion/SectionLabel";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";

const linkedinUrl = socials.find((s) => s.name === "LinkedIn")?.url ?? "#";
const githubUrl = socials.find((s) => s.name === "GitHub")?.url ?? "#";

function CopyEmail() {
  const [toast, setToast] = useState<"copied" | "failed" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast("copied");
    } catch {
      setToast("failed"); // clipboard unavailable: the mailto link still works
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 1800);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Copy email address"
      >
        {toast === "copied" ? <Check className="size-4 text-accent-ink" /> : <Copy className="size-4" />}
      </button>
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-8 z-[90] flex justify-center">
        <AnimatePresence>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.24, ease: EASE_OUT }}
              className="rounded-full border border-border bg-popover px-4 py-2 font-mono text-xs shadow-lg"
            >
              {toast === "copied" ? "Copied" : "Couldn’t copy — use the email link"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

const DETAILS = [
  { label: "Location", value: profile.location, href: null },
  { label: "LinkedIn", value: "Prathmesh Parab", href: linkedinUrl },
  { label: "GitHub", value: "prathmesh0", href: githubUrl },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="container-grid">
        <div className="grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-5">
            <SectionLabel index="06">Contact</SectionLabel>
            <SplitLines text={"Let’s build something."} em="something." className="text-display mt-4 !text-[clamp(3rem,7vw,6rem)]" />

            <Reveal delay={0.15}>
              <p className="prose-measure mt-8 text-lg text-muted-foreground">
                Have a project in mind or just want to say hi? I&apos;m always open to new opportunities and
                collaborations. Whether you have a project, an opportunity, or just want to connect — feel free to reach
                out. I typically respond within 24 hours.
              </p>

              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
                <span aria-hidden className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                Open to New Opportunities
              </p>

              <dl className="mt-10 border-t border-border">
                <div className="flex items-center justify-between gap-4 border-b border-border py-3">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Email</dt>
                  <dd className="flex min-w-0 items-center gap-1">
                    <a href={`mailto:${profile.email}`} className="truncate transition-colors hover:text-accent-ink">
                      {profile.email}
                    </a>
                    <CopyEmail />
                  </dd>
                </div>
                {DETAILS.map((d) => (
                  <div key={d.label} className="flex items-center justify-between gap-4 border-b border-border py-3">
                    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{d.label}</dt>
                    <dd>
                      {d.href ? (
                        <a
                          href={d.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex min-h-11 items-center gap-1 transition-colors hover:text-accent-ink"
                        >
                          {d.value}
                          <ArrowUpRight className="size-3.5 transition-transform duration-[240ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7">
            <LazyContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
