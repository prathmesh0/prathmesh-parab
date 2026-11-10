import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const linkClass =
  "group inline-flex min-h-11 items-center gap-1.5 font-mono text-sm text-foreground transition-colors hover:text-accent-ink";

/** Live Demo / View Code links, or the In Progress state. */
export function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6", className)}>
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Live Demo
          <ArrowUpRight className="size-3.5 transition-transform duration-[240ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ) : project.inProgress ? (
        <span className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted-foreground">
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          In Progress
        </span>
      ) : null}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <GithubIcon className="size-3.5" />
          View Code
          <ArrowUpRight className="size-3.5 transition-transform duration-[240ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}
