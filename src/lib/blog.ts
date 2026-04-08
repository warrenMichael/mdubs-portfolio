export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "thousands-of-dynamic-location-pages",
    title: "How I Created Thousands of Dynamic Location Pages for Our Marketing Site",
    excerpt:
      "When every plasma donation center serves hundreds of surrounding towns, you need a scalable way to generate SEO-optimized location pages without burying your content team in manual work. Here's how we solved it with Gatsby, Prismic, and a CSV.",
    date: "2024-09-15",
    readingTime: 7,
    tags: ["Gatsby", "Prismic", "SEO", "Static Generation", "React"],
    content: `
When we set out to build the locations section of the JoinParachute marketing site, the problem seemed straightforward on the surface: show users where they can donate plasma. But the scale of it quickly made things interesting.

Parachute operates donation centers across 16 states, and each center doesn't just serve its home city — it serves a wide radius of surrounding towns and localities. A single facility might be the closest option for well over a hundred different communities. Multiply that across all our centers and you're talking about thousands of individual location pages that needed to exist, be findable via search, and contain accurate, location-specific information.

We needed a solution that was scalable, maintainable, and didn't require a content team member to manually create a new page every time we expanded into a new market.

## The Stack

The marketing site was built on **Gatsby** with content managed through **Prismic CMS**. Gatsby's static site generation and its \`createPage\` API made it a natural fit for this kind of page factory pattern. Prismic gave our product and marketing teams a friendly authoring interface without requiring any engineering involvement for routine content updates.

## Modeling the Data in Prismic

Each donation center already had its own Prismic document — a facility page type with fields for the center's name, address, operating hours, and other details. To support the locality generation, we added a new field to that document type: a **CSV upload field**.

The CSV format was simple: each row represented a locality that the center served, with columns for the town name, state, latitude, longitude, and any other data we needed to populate the generated page. When a new center was onboarded, the content team would drop in a CSV alongside the rest of the facility's information. That was the entirety of their workflow — no code, no pull requests, no page-by-page creation.

## Generating Pages at Build Time

On the Gatsby side, we used the \`createPages\` API to wire everything together. During the build, Gatsby queries Prismic for all facility documents. For each facility, it pulls the attached CSV, parses every row, and calls \`createPage\` for each locality — passing the facility data and the locality row as page context.

We also deduplicated localities across facilities. If two centers both served the same town, we'd consolidate rather than produce conflicting pages, making sure we weren't cannibalizing our own SEO.

\`\`\`js
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(FACILITY_QUERY);

  const seen = new Set();

  for (const facility of result.data.allPrismicFacility.nodes) {
    const csvRows = parseCSV(facility.data.locality_csv.text);

    for (const row of csvRows) {
      const slug = toSlug(row.town, row.state);
      if (seen.has(slug)) continue;
      seen.add(slug);

      createPage({
        path: \`/plasma-donation-near/\${slug}/\`,
        component: localityTemplate,
        context: { facility: facility.data, locality: row },
      });
    }
  }
};
\`\`\`

Each generated page received a unique path under \`/plasma-donation-near/[town-state]/\`, a consistent URL structure that search engines could crawl and index predictably.

## Building the Pages

The locality page template used the context data to render content specific to that town and facility combination. The nearest center's name, address, and distance from the locality were all pulled in. Surrounding town names from the same CSV populated a "nearby locations" section, creating internal links between related pages and strengthening the overall site graph.

The goal was for each page to read as genuinely useful to someone in that town searching for a plasma donation center nearby — not like a thin, templated SEO placeholder.

## Structured Data with JSON-LD

To give search crawlers the richest possible signal about these pages, we added **JSON-LD structured data** to each one. We used the \`LocalBusiness\` schema type, populated with the facility's name, address, geo coordinates, and opening hours. This gave Google and other crawlers a machine-readable summary of the page's subject matter without having to infer it from the HTML alone.

\`\`\`jsx
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": facility.name,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": facility.address,
    "addressLocality": locality.town,
    "addressRegion": locality.state,
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": locality.lat,
    "longitude": locality.lng,
  },
  "openingHoursSpecification": facility.hours,
};
\`\`\`

## The Result

The end result was a system that could produce thousands of unique, SEO-optimized, content-rich pages from a single CSV upload. Adding a new facility meant filling out a Prismic document and attaching a CSV — the next Gatsby build would handle the rest. No engineering intervention required.

It's a good example of how leaning into a static site generator's strengths, and designing the right workflow for your content team, can turn what looks like a scaling problem into a solved one.
    `.trim(),
  },
];

export function getRecentPosts(count: number): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
