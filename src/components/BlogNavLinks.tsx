"use client";

import Link from "next/link";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors"
      style={{ color: "var(--muted)" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
      }
    >
      <svg
        className="w-4 h-4"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M16 10H4M10 16l-6-6 6-6" />
      </svg>
      {label}
    </Link>
  );
}

export function FooterBackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm transition-colors"
      style={{ color: "var(--muted)" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
      }
    >
      {label}
    </Link>
  );
}
