import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { BackLink, FooterBackLink } from "@/components/BlogNavLinks";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Minimal markdown-to-HTML converter for the blog post content.
 * Handles headings, bold, inline code, code blocks, blockquotes,
 * unordered lists, horizontal rules, tables, and paragraphs.
 */
function renderMarkdown(md: string): string {
  const lines = md.trim().split("\n");
  const html: string[] = [];
  let i = 0;

  function escapeHtml(str: string) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function inlineFormat(text: string): string {
    // Code spans
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return text;
  }

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      i++; // skip closing ```
      html.push(
        `<pre><code class="language-${lang}">${codeLines.join("\n")}</code></pre>`
      );
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      html.push(`<h${level}>${inlineFormat(escapeHtml(headingMatch[2]))}</h${level}>`);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      html.push(
        `<blockquote>${inlineFormat(escapeHtml(quoteLines.join(" ")))}</blockquote>`
      );
      continue;
    }

    // HR
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      html.push("<hr />");
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(
          `<li>${inlineFormat(escapeHtml(lines[i].slice(2)))}</li>`
        );
        i++;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    // Simple table (starts with |)
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      // First row = header, second row = separator, rest = body
      const rows = tableLines.filter((r) => !/^\|[\s|:-]+\|$/.test(r.trim()));
      const [headerRow, ...bodyRows] = rows;
      const parseRow = (row: string) =>
        row
          .split("|")
          .slice(1, -1)
          .map((cell) => cell.trim());

      const headerCells = parseRow(headerRow)
        .map((c) => `<th>${inlineFormat(escapeHtml(c))}</th>`)
        .join("");
      const bodyRowsHtml = bodyRows
        .map(
          (row) =>
            `<tr>${parseRow(row)
              .map((c) => `<td>${inlineFormat(escapeHtml(c))}</td>`)
              .join("")}</tr>`
        )
        .join("");

      html.push(
        `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRowsHtml}</tbody></table>`
      );
      continue;
    }

    // Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("> ") &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("|") &&
      !/^(-{3,}|\*{3,})$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      html.push(
        `<p>${inlineFormat(escapeHtml(paraLines.join(" ")))}</p>`
      );
    }
  }

  return html.join("\n");
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const contentHtml = renderMarkdown(post.content);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Back link */}
      <BackLink href="/blog" label="All posts" />

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: "var(--accent-dim)",
                color: "var(--accent)",
                border: "1px solid rgba(124,106,247,0.3)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4"
          style={{ color: "var(--foreground)" }}
        >
          {post.title}
        </h1>

        <p
          className="text-lg leading-relaxed mb-6"
          style={{ color: "var(--muted)" }}
        >
          {post.excerpt}
        </p>

        <div
          className="flex items-center gap-4 text-sm font-mono pb-8 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          <span>{formatDate(post.date)}</span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: "var(--border)" }}
          />
          <span>{post.readingTime} min read</span>
        </div>
      </header>

      {/* Content */}
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Footer nav */}
      <div
        className="mt-16 pt-8 border-t flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}
      >
        <FooterBackLink href="/blog" label="← Back to blog" />
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Written by Mdub
        </p>
      </div>
    </div>
  );
}
