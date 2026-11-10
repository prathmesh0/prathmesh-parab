import { SectionLabel } from "@/components/motion/SectionLabel";
import { SplitLines } from "@/components/motion/SplitLines";
import { RevealLines } from "@/components/motion/RevealLines";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { Reveal } from "@/components/motion/Reveal";

const PILLARS = [
  { title: "Product Thinking", description: "Building solutions that align technology with real business needs." },
  { title: "End-to-End Ownership", description: "From requirements and architecture to deployment and delivery." },
  { title: "Scalable Engineering", description: "Creating maintainable systems focused on performance and growth." },
  { title: "Continuous Learning", description: "Exploring AI, system design, and modern technologies to stay ahead." },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container-grid">
        <div className="grid-12 gap-y-12">
          {/* Sticky left column */}
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel index="01">About</SectionLabel>
              <SplitLines text="Who I Am" em="Am" className="text-heading mt-4" />
              <ScrubWords
                text="Elevate your outcome by nurturing your system."
                className="mt-10 max-w-md border-l border-brand pl-6 text-2xl leading-snug tracking-tight md:text-3xl"
              />
              <p className="mt-4 pl-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Philosophy
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="prose-measure space-y-6 text-lg text-muted-foreground">
              <RevealLines>
                I&apos;m a <strong className="font-medium text-foreground">Software Engineer</strong>&nbsp;passionate about
                building products that solve real problems. Over 2+ years, I&apos;ve shipped enterprise platforms,
                AI-powered solutions, transportation systems and mobile apps, from concept to production.
              </RevealLines>
              <RevealLines>
                I work closely with clients and stakeholders, including US-based teams, turning complex business
                requirements into scalable, user-centric software.
              </RevealLines>
              <RevealLines>
                Outside work, I explore emerging tech and build personal products. Great software goes beyond clean
                code. It creates real value for users and businesses.
              </RevealLines>
            </div>

            <ol className="mt-12 grid border-t border-border sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <li
                  key={p.title}
                  className="list-none border-b border-border py-6 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
                >
                  <Reveal delay={i * 0.05}>
                    <span className="font-mono text-xs text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-medium">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
