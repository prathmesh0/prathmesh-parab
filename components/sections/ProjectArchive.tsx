"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/types";
import { CursorPreview } from "@/components/motion/CursorPreview";
import { ProjectLinks } from "@/components/sections/ProjectLinks";
import { EASE_OUT, SPRING_UI } from "@/lib/motion";

/** Archive list; hovering a row shows a thumbnail that follows the cursor (desktop). */
export function ProjectArchive({ projects }: { projects: Project[] }) {
  const [shown, setShown] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ul className="border-t border-border">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: EASE_OUT, layout: SPRING_UI }}
              onPointerEnter={() => {
                setShown(p.image);
                setVisible(true);
              }}
              onPointerLeave={() => setVisible(false)}
              className="border-b border-border"
            >
              <div className="grid gap-x-6 gap-y-1 py-6 md:grid-cols-12 md:items-baseline">
                <h4 className="flex flex-wrap items-center gap-3 text-xl font-medium tracking-tight md:col-span-4">
                  {p.title}
                  {p.featured && (
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] font-normal text-muted-foreground">
                      Featured
                    </span>
                  )}
                </h4>
                <p className="font-mono text-xs text-muted-foreground md:col-span-3">{p.category}</p>
                <p className="font-mono text-xs text-muted-foreground md:col-span-5">
                  {p.technologies.slice(0, 5).join(" · ")}
                </p>
                <p className="mt-2 max-w-[62ch] text-sm text-muted-foreground md:col-span-7 md:col-start-1">
                  {p.description}
                </p>
                <ProjectLinks project={p} className="md:col-span-5 md:justify-end" />
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <CursorPreview src={shown} visible={visible} />
    </>
  );
}
