"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("@/components/sections/ContactForm").then((m) => m.ContactForm), {
  ssr: false,
});

const FIELDS = ["Name", "Email", "Subject", "Message"];

function FormSkeleton() {
  return (
    <div aria-hidden className="space-y-8">
      {FIELDS.map((f) => (
        <div key={f}>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{f}</p>
          <div className={f === "Message" ? "h-24 border-b border-border" : "h-10 border-b border-border"} />
        </div>
      ))}
    </div>
  );
}

/** The form (react-hook-form + zod) loads only when it is about to scroll into view. */
export function LazyContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "1000px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className="min-h-[27rem]">{show ? <ContactForm /> : <FormSkeleton />}</div>;
}
