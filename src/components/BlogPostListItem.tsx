"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/blog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostListItem({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group rounded-xl p-5 -mx-5 transition-colors"
      style={{ color: "inherit" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "var(--surface)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "transparent")
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2
            className="text-lg font-semibold mb-1.5 leading-snug"
            style={{ color: "var(--foreground)" }}
          >
            {post.title}
          </h2>
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{
              color: "var(--muted)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
              {formatDate(post.date)}
            </span>
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
              {post.readingTime} min read
            </span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--surface-raised)",
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <svg
          className="w-5 h-5 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "var(--accent)" }}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 10h12M10 4l6 6-6 6" />
        </svg>
      </div>
    </Link>
  );
}
