"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, Copy, Loader2, Send } from "lucide-react";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { submitContact } from "@/actions/contact";
import { EASE_OUT, SPRING_UI } from "@/lib/motion";
import { SectionLabel } from "@/components/motion/SectionLabel";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const linkedinUrl = socials.find((s) => s.name === "LinkedIn")?.url ?? "#";
const githubUrl = socials.find((s) => s.name === "GitHub")?.url ?? "#";

type Status = "idle" | "loading" | "success" | "error";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  type?: string;
  placeholder: string;
  multiline?: boolean;
}

/** Underline field: the accent underline draws in on focus. */
function Field({ id, label, error, registration, type = "text", placeholder, multiline }: FieldProps) {
  const shared = {
    id,
    placeholder,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "peer w-full bg-transparent pb-3 pt-2 text-base outline-none placeholder:text-muted-foreground/70 resize-none",
    ...registration,
  };
  return (
    <div>
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </label>
      <div className="relative border-b border-border">
        {multiline ? <textarea rows={4} {...shared} /> : <input type={type} {...shared} />}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 transition-transform duration-[240ms] ease-[var(--ease-out)] peer-focus:scale-x-100",
            error ? "scale-x-100 bg-destructive" : "bg-brand",
          )}
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

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
        {toast === "copied" ? <Check className="size-4 text-brand" /> : <Copy className="size-4" />}
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
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema), mode: "onChange" });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const result = await submitContact(data);
      if (result.success) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const label =
    status === "loading" ? (
      <>
        <Loader2 className="size-4 animate-spin" /> Sending…
      </>
    ) : status === "success" ? (
      <>
        <Check className="size-4" /> Sent
      </>
    ) : (
      <>
        <Send className="size-4" /> Send Message
      </>
    );

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
                    <a href={`mailto:${profile.email}`} className="truncate transition-colors hover:text-brand">
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
                          className="group inline-flex min-h-11 items-center gap-1 transition-colors hover:text-brand"
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <Field id="name" label="Name" placeholder="John Doe" registration={register("name")} error={errors.name?.message} />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  registration={register("email")}
                  error={errors.email?.message}
                />
              </div>
              <Field
                id="subject"
                label="Subject"
                placeholder="Project inquiry"
                registration={register("subject")}
                error={errors.subject?.message}
              />
              <Field
                id="message"
                label="Message"
                multiline
                placeholder="Tell me about your project..."
                registration={register("message")}
                error={errors.message?.message}
              />

              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  layout
                  transition={SPRING_UI}
                  type="submit"
                  disabled={!isValid || status === "loading"}
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium transition-colors duration-[240ms] disabled:cursor-not-allowed disabled:opacity-50",
                    status === "success" ? "bg-brand text-background" : "bg-foreground text-background",
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={status === "loading" ? "l" : status === "success" ? "s" : "i"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.14 }}
                      className="inline-flex items-center gap-2"
                    >
                      {label}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>

                <p role="status" aria-live="polite" className="text-sm">
                  {status === "success" && <span className="text-foreground">Message sent! I&apos;ll get back to you soon.</span>}
                  {status === "error" && <span className="text-destructive">Something went wrong. Please try again.</span>}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
