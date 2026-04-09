import { withBasePath } from "@/lib/basePath";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: number;
  role: string;
  link?: string;
  github?: string;
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "parachute-site",
    title: "joinparachute.com",
    description:
      "Marketing site, React Native donor app, and Rails backend for a plasma donation network spanning 16 states.",
    longDescription:
      "Sole engineer responsible for the full digital footprint at Parachute, a plasma donation network operating across 16 states. Built and maintained the joinparachute.com marketing site on Gatsby with Prismic CMS, enabling the marketing team to author and publish independently. Contributed features to a React Native mobile app used by donors to book appointments, manage accounts, and track campaigns. Also contributed to the Rails API powering both the mobile app and an internal admin tool used by employees to manage donors, appointments, centers, and payments. Implemented marketing analytics and tooling to support product and marketing team goals throughout.",
    tags: ["Gatsby", "React", "React Native", "Ruby on Rails", "Prismic", "TypeScript"],
    year: 2023,
    role: "Senior Software Engineer",
    link: "https://www.joinparachute.com",
    image: withBasePath("/images/project-parachute-site.png"),
    featured: true,
  },
  {
    id: "parachute-app",
    title: "Parachute — Donor Mobile App",
    description:
      "React Native app for plasma donors to book appointments, track earnings, join campaigns, and manage their account.",
    longDescription:
      "Contributed features to the Parachute mobile app, built in React Native for iOS and Android. The app is where donors could book appointments and see how much they would earn for a given timeslot, update their personal information, join campaigns for bonus incentives, view their total earnings, and review past appointment history.",
    tags: ["React Native", "TypeScript", "iOS", "Android", "Ruby on Rails"],
    year: 2025,
    role: "Senior Software Engineer",
    link: "https://www.joinparachute.com/app/",
    image: withBasePath("/images/project-parachute-app.png"),
    featured: true,
  },
  {
    id: "parachute-locations",
    title: "Join Parachute — Donation Center Locator",
    description:
      "Location discovery feature for a plasma donation marketing site, connecting donors to nearby centers across 16 states.",
    longDescription:
      "Built the Locations section of joinparachute.com — a Gatsby-powered marketing site for a plasma donation network. The feature covers a state-grouped directory page and two families of dynamically generated pages: center detail pages (e.g. /plasma-donation/center/knoxville-tn/) and town-level proximity pages (e.g. /plasma-donation-near/arcadia-la/). Center pages are each their own Prismic document, authored and managed through the CMS. Town-level pages are generated from location data sourced from a CSV, which Gatsby uses at build time to produce thousands of individually addressable, SEO-optimized pages without any manual authoring, allowing Parachute to rank for hyperlocal queries across every town in each center's service radius.",
    tags: ["Gatsby", "React", "TypeScript", "Tailwind CSS", "SEO", "Static Generation"],
    year: 2024,
    role: "Senior Software Engineer",
    link: "https://www.joinparachute.com/plasma-donation/location/",
    image: withBasePath("/images/project-parachute.png"),
    featured: true,
  },
  {
    id: "conde-nast-platform",
    title: "Verso — Condé Nast Multi-Brand Platform",
    description:
      "Multi-tenant web platform powering 20+ brands including WIRED, GQ, and Vanity Fair.",
    longDescription:
      "At Condé Nast, built and maintained Verso, a multi-tenant application enabling scalable support for all brand properties while preserving each brand's distinct design and business requirements. The application was built using an atomic design pattern, with accessibility and performance as first-class concerns throughout.",
    tags: ["React", "JavaScript", "TypeScript", "Component Library", "Multi-tenant", "SEO"],
    year: 2019,
    role: "Software Engineer II",
    link: "https://www.cntraveler.com/destinations/tokyo",
    image: withBasePath("/images/project-conde-nast.png"),
    featured: true,
  },
  {
    id: "conde-nast-component-library",
    title: "Autopilot — Condé Nast Component Library",
    description:
      "Shared component library used across 20+ brand applications including WIRED, GQ, and Vanity Fair.",
    longDescription:
      "Developed and maintained Autopilot, a shared UI component library used across 20+ Condé Nast brand applications — including WIRED, GQ, and Vanity Fair. The library provided a consistent, reusable foundation that each brand could adopt while still expressing its own design identity.",
    tags: ["React", "JavaScript", "Node.js", "Component Library", "Condé Nast"],
    year: 2016,
    role: "Software Engineer II",
    featured: false,
  },
  {
    id: "nikon-usa",
    title: "Nikon USA — eCommerce Catalog",
    description:
      "Product catalog and category pages for Nikon's U.S. ecommerce site, built at Kanban Solutions in collaboration with a Java engineering team.",
    longDescription:
      "Worked as the frontend engineer at Kanban Solutions on the nikonusa.com ecommerce rebuild. Translated designs from a partner agency's PSDs into responsive HTML5, CSS3, and jQuery-based pages, coordinating directly with the agency to ensure the design vision was met. Integrated product data from Java externals and SOLR search, rendering it via XSL, Velocity, and jQuery-TMPL templating. Wrote test cases using jQuery Expect with the Mocha framework. Managed QA and bug tracking through JIRA during the QA and UAT phases.",
    tags: ["JavaScript", "jQuery", "HTML5", "CSS3", "XSL", "Velocity", "SOLR"],
    year: 2014,
    role: "Front End Engineer, Kanban Solutions",
    image: withBasePath("/images/project-nikon.png"),
    featured: false,
  },
  {
    id: "tracfone-net10",
    title: "Tracfone / Net10 — Brand Sites",
    description:
      "Consumer brand sites for Tracfone and Net10, built with HTML5/CSS3/jQuery and integrated into IBM Portal CMS.",
    longDescription:
      "Built consumer-facing pages for Tracfone brand sites including Net10 and the Tracfone corporate site at Kanban Solutions. Pages were developed from client PSDs using HTML5, CSS3, and jQuery, then integrated into IBM Portal CMS — authoring templates, presentation templates, components, and content items to render pages correctly. Some pages required JSP coding and integration with backend data sourced from SOLR. Also set up and configured sites in Teamsite CMS across multiple locales, including page files, page components, template data, and term dictionaries. Managed QA and bug resolution through JIRA.",
    tags: ["JavaScript", "jQuery", "HTML5", "CSS3", "IBM Portal", "Teamsite", "JSP"],
    year: 2014,
    role: "Front End Engineer, Kanban Solutions",
    featured: false,
  },
];
