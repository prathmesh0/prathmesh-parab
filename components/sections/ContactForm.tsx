"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Send } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { submitContact } from "@/actions/contact";
import { SPRING_UI } from "@/lib/motion";
import { cn } from "@/lib/utils";

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

export function ContactForm() {
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
  );
}
