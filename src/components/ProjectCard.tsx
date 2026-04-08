import Image from "next/image";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const tagColors: Record<string, string> = {
  React: "#61dafb",
  "Next.js": "#ffffff",
  TypeScript: "#3178c6",
  "Tailwind CSS": "#38bdf8",
  "D3.js": "#f9a03c",
  GraphQL: "#e535ab",
  "React Native": "#61dafb",
  "CSS-in-JS": "#b74cdb",
  Storybook: "#ff4785",
  "Radix UI": "#8b5cf6",
  WebSockets: "#10b981",
  "Canvas API": "#f59e0b",
  "Slate.js": "#64748b",
  "Open Source": "#22c55e",
};

function Tag({ label }: { label: string }) {
  const color = tagColors[label] || "var(--muted)";
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full font-medium"
      style={{
        background: `${color}18`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  if (featured) {
    return (
      <div
        className="card-hover rounded-xl p-6 md:p-8 border"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Project image or letter placeholder */}
          {project.image ? (
            <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                width={192}
                height={128}
                className="w-full h-full object-cover object-top"
              />
            </div>
          ) : (
          <div
            className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg flex items-center justify-center text-4xl font-bold"
            style={{
              background: "var(--surface-raised)",
              color: "var(--accent)",
              border: "1px solid var(--border)",
            }}
          >
            {project.title.charAt(0)}
          </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                {project.title}
              </h3>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ color: "var(--muted)", background: "var(--surface-raised)" }}
              >
                {project.year}
              </span>
            </div>

            <p className="text-sm mb-1 font-medium" style={{ color: "var(--accent)" }}>
              {project.role}
            </p>

            <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>

            <div className="flex gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent inline-flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-md font-medium"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 1h6m0 0v6m0-6L7 9" />
                  </svg>
                  Live Site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost inline-flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-md font-medium border"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact card for non-featured projects
  return (
    <div
      className="card-hover rounded-xl p-5 border flex flex-col h-full"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0"
          style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
        >
          {project.title.charAt(0)}
        </div>
        <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
          {project.year}
        </span>
      </div>

      <h3 className="text-base font-semibold mb-1" style={{ color: "var(--foreground)" }}>
        {project.title}
      </h3>
      <p className="text-xs mb-3 leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.slice(0, 3).map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
        {project.tags.length > 3 && (
          <span className="text-xs px-2 py-1" style={{ color: "var(--muted)" }}>
            +{project.tags.length - 3}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline underline-offset-2"
            style={{ color: "var(--accent)" }}
          >
            Live
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline underline-offset-2"
            style={{ color: "var(--muted)" }}
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
