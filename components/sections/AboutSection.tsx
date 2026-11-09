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
                building impactful products that solve real-world problems and deliver meaningful user experiences.
                Over the past 2+ years, I&apos;ve worked on enterprise platforms, AI-powered solutions, transportation
                systems, and mobile applications, contributing from concept to production.
              </RevealLines>
              <RevealLines>
                Beyond coding, I enjoy understanding business needs, collaborating with cross-functional teams, and
                turning complex requirements into scalable, user-centric solutions. I&apos;ve had the opportunity to
                work closely with multiple clients and stakeholders, including US-based organizations, gaining valuable
                experience in translating business goals into successful product outcomes while navigating diverse
                requirements and expectations.
              </RevealLines>
              <RevealLines>
                Outside of work, I enjoy exploring emerging technologies, building personal products, and continuously
                challenging myself to learn and grow. I believe great software goes beyond clean code, it&apos;s about
                solving meaningful problems and creating value for users and businesses.
              </RevealLines>
            </div>

            <ol className="mt-16 grid border-t border-border sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <li
                  key={p.title}
                  className="list-none border-b border-border py-6 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
                >
                  <Reveal delay={i * 0.05}>
                    <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
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
