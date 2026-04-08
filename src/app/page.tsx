import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { getRecentPosts } from "@/lib/blog";

const skills = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Ruby on Rails", "HTML", "CSS"] },
  { category: "Frameworks", items: ["React", "Ruby on Rails", "Gatsby", "React Native", "Node.js"] },
  { category: "Styling", items: ["Tailwind CSS", "Sass", "LESS", "Stylus", "CSS Modules", "styled-components"] },
  { category: "Hotwire / Rails", items: ["Stimulus", "Turbo", "Hotwire", "ERB"] },
  { category: "APIs & Data", items: ["REST API", "GraphQL", "MongoDB", "Active Record"] },
  { category: "Testing", items: ["Jest", "RSpec", "Mocha", "Enzyme", "Selenium"] },
  { category: "CMS & Platforms", items: ["Prismic", "WordPress", "Teamsite", "IBM Portal"] },
  { category: "Tooling & VCS", items: ["Git", "Webpack", "Vite", "Storybook", "JIRA", "Netlify", "Jenkins", "VCL", "AI (Claude, ChatGPT)"] },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const recentPosts = getRecentPosts(3);

  return (
    <div>
      {/* ─── Hero ───────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <p
            className="text-sm font-mono tracking-widest uppercase mb-5"
            style={{ color: "var(--accent)" }}
          >
            Available for work
          </p>

          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
            style={{ color: "var(--foreground)" }}
          >
            Hi, I&apos;m Michael Warren AKA Mdub.
            <br />
            <span style={{ color: "var(--accent)" }}>Software</span> engineer.
          </h1>

          <p
            className="text-xl leading-relaxed mb-8"
            style={{ color: "var(--muted)" }}
          >
            Full-stack software engineer with a strong frontend focus. I build fast, accessible web products. Specializing in React, TypeScript, and Ruby on Rails - with 15+ years delivering high-quality work for world-class brands.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/work"
              className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              View my work
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="btn-outline inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ───────────────────────────────────────────────────── */}
      <section className="border-y" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "15+", label: "Years experience" },
            { value: "Countless", label: "Projects shipped" },
            { value: "Multiple", label: "Design systems built" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-3xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
                {stat.value}
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured Work ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
              Portfolio
            </p>
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Featured Work
            </h2>
          </div>
          <Link
            href="/work"
            className="link-accent text-sm hidden md:inline-flex items-center gap-1"
          >
            All projects →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="card-hover rounded-xl border flex flex-col h-full overflow-hidden"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              {/* Thumbnail */}
              {project.image ? (
                <div className="w-full h-40 overflow-hidden flex-shrink-0 border-b" style={{ borderColor: "var(--border)" }}>
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    width={400}
                    height={160}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div
                  className="w-full h-40 flex items-center justify-center text-4xl font-bold flex-shrink-0 border-b"
                  style={{ background: "var(--surface-raised)", color: "var(--accent)", borderColor: "var(--border)" }}
                >
                  {project.title.charAt(0)}
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>
                  {project.title}
                </h3>
                <p className="text-sm flex-1 leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "var(--surface-raised)", color: "var(--muted)", border: "1px solid var(--border)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link href="/work" className="text-sm" style={{ color: "var(--accent)" }}>
            View all projects →
          </Link>
        </div>
      </section>

      {/* ─── Skills ──────────────────────────────────────────────────── */}
      <section className="border-y" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="mb-10">
            <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
              Toolkit
            </p>
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Skills & Technologies
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "var(--muted)" }}>
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1 rounded-full"
                      style={{ background: "var(--surface-raised)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Recent Posts ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
              Writing
            </p>
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Recent Posts
            </h2>
          </div>
          <Link href="/blog" className="link-accent text-sm hidden md:inline-flex items-center gap-1">
            All posts →
          </Link>
        </div>

        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-hover flex items-start justify-between gap-4 p-5 rounded-xl border"
              style={{ background: "var(--surface)", borderColor: "var(--border)", color: "inherit", textDecoration: "none" }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>
                  {post.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--muted)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
                  {post.excerpt}
                </p>
              </div>
              <div className="text-xs font-mono flex-shrink-0 mt-0.5" style={{ color: "var(--muted)" }}>
                {formatDate(post.date)}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link href="/blog" className="text-sm" style={{ color: "var(--accent)" }}>
            View all posts →
          </Link>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
            Let&apos;s build something.
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
            I&apos;m open to senior front-end and full-stack roles. If you have a project or feature worth building, let&apos;s talk.
          </p>
          <a
            href="mailto:hello@mdub.dev"
            className="btn-accent inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Get in touch
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7-5 7 5v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8z" />
              <path d="M8 18V12h4v6" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
