import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A selection of projects I've built — design systems, dashboards, collaborative tools, and open-source libraries.",
};

export default function WorkPage() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <p
          className="text-sm font-mono tracking-widest uppercase mb-3"
          style={{ color: "var(--accent)" }}
        >
          Portfolio
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Selected Work
        </h1>
        <p
          className="text-lg max-w-2xl leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          A collection of projects spanning marketing sites, mobile apps, multi-tenant platforms, and ecommerce — built across the full stack with a focus on performance, accessibility, and real-world impact.
        </p>
      </div>

      {/* Featured projects */}
      <section className="mb-16">
        <h2
          className="text-xs font-mono tracking-widest uppercase mb-6"
          style={{ color: "var(--muted)" }}
        >
          Featured
        </h2>
        <div className="grid gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>
      </section>

      {/* Other projects */}
      <section>
        <h2
          className="text-xs font-mono tracking-widest uppercase mb-6"
          style={{ color: "var(--muted)" }}
        >
          Other Projects
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {other.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
