import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog";
import { BlogPostListItem } from "@/components/BlogPostListItem";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on frontend engineering, design systems, performance, accessibility, and software architecture.",
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <p
          className="text-sm font-mono tracking-widest uppercase mb-3"
          style={{ color: "var(--accent)" }}
        >
          Writing
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Blog
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          Long-form thoughts on frontend engineering, design systems, performance,
          and building software that lasts.
        </p>
      </div>

      {/* Post list */}
      <ul className="space-y-2">
        {sorted.map((post, index) => (
          <li key={post.slug}>
            {index > 0 && (
              <div
                className="h-px mb-2"
                style={{ background: "var(--border)" }}
              />
            )}
            <BlogPostListItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
