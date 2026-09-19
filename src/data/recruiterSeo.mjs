export const SITE_URL = "https://isabellawang.info";
export const SITE_NAME = "Isabella Wang Portfolio";
export const AUTHOR = "Isabella Wang";
export const CONTACT_EMAIL = "wangxbella0108@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/isabella-wang-310181149/";
export const MEDIUM_URL = "https://medium.com/@wangxbella0108";
export const NY_TANGO_URL = "https://www.newyorktango.com/";
export const TERRA_URL = "https://terra.vts.com/";

export const TARGET_TITLES = [
  "Senior Product Designer",
  "Product Designer",
  "UX Designer",
  "Product Design Lead",
  "AI Product Designer",
  "AI UX Designer",
  "B2B SaaS Product Designer",
  "Enterprise Product Designer",
  "Design Systems Designer",
  "Founding Product Designer",
  "0 to 1 Product Designer",
];

export const CORE_SKILLS = [
  "Product strategy",
  "0 to 1 product design",
  "AI product design",
  "AI-assisted workflows",
  "Human-AI interaction",
  "B2B SaaS",
  "Enterprise UX",
  "Design systems",
  "Interaction design",
  "Information architecture",
  "User research",
  "Usability testing",
  "Accessibility",
  "WCAG 2.0",
  "Frontend prototyping",
  "React",
  "Next.js",
  "Figma",
  "AI prototyping",
  "Marketplace UX",
  "CMS workflows",
  "Kiosk UX",
];

export const SHARED_KEYWORDS = [
  AUTHOR,
  ...TARGET_TITLES,
  ...CORE_SKILLS,
  "New York Product Designer",
  "NYC Product Designer",
  "Parsons School of Design",
  "Cornell Tech",
];

export const RECRUITER_SUMMARY =
  "Isabella Wang is a New York City Senior Product Designer with 5+ years of experience turning ambiguous product problems into shipped 0 to 1 products, AI-assisted workflows, B2B SaaS platforms, enterprise tools, marketplaces, design systems, and frontend prototypes.";

export const HIRING_PREFERENCES = [
  "Senior Product Designer or Product Designer roles",
  "New York City, NYC-hybrid, or remote roles",
  "Product teams with real ownership, clear product goals, autonomy, and healthy Product/Engineering collaboration",
  "Strongest matches: AI products, data-heavy workflows, enterprise tools, productivity tools, consumer/community products, healthcare, marketplaces, design systems, and 0 to 1 products",
];

export const PROJECT_PROFILES = [
  {
    name: "AI Research Guide",
    url: `${SITE_URL}/ai-research-guide`,
    description:
      "Designed an AI-assisted knowledge platform that reduced consulting discovery from hours to minutes and reduced manual research by approximately 60%.",
    skills: ["AI product design", "AI UX", "Information architecture", "Enterprise workflows", "Research tools"],
  },
  {
    name: "VTS Terra Design System",
    url: `${SITE_URL}/design-system`,
    description:
      "Expanded design-system coverage from 45% to 90% across 4 products, created 20+ reusable components, reduced spec-writing time by 88%, and improved shared-component WCAG 2.0 compliance to 100%.",
    skills: ["Design systems", "B2B SaaS", "Accessibility", "Enterprise UX", "Component governance"],
  },
  {
    name: "NY Tango Event Discovery and CMS",
    url: `${SITE_URL}/event-discovery-cms`,
    description:
      "Independently designed and shipped a 0 to 1 event discovery product and CMS/admin workflow, automating recurring listings and reducing manual operations by approximately 80%.",
    skills: ["0 to 1 product design", "Consumer UX", "CMS workflows", "Frontend development", "AI-assisted development"],
  },
  {
    name: "Enterprise AI Workspace",
    url: `${SITE_URL}/platforms-integration`,
    description:
      "Designed AI-assisted enterprise workflow concepts for cross-tool consulting operations, centralized file management, permissions, and systems UX.",
    skills: ["Enterprise UX", "AI workflows", "Systems thinking", "Platform design"],
  },
  {
    name: "Visitor Kiosk",
    url: `${SITE_URL}/kiosk`,
    description:
      "Designed kiosk and iPad self-service check-in workflows for office arrival, visitor management, and service blueprinting.",
    skills: ["Kiosk UX", "iPad UX", "Service design", "B2B workflows"],
  },
  {
    name: "Voice NFT Marketplace",
    url: `${SITE_URL}/voice`,
    description:
      "Designed a 0 to 1 marketplace MVP for creators, reduced the creation flow from approximately 10 to 5 steps, and reduced creator abandonment by 50%.",
    skills: ["Marketplace UX", "Creator tools", "Consumer product design", "Onboarding UX"],
  },
];

export const routeSeo = {
  "/": {
    title: "Isabella Wang | Senior Product Designer for AI, 0 to 1 Products and Design Systems",
    description:
      "Portfolio of Isabella Wang, a New York City Senior Product Designer with 5+ years across AI product design, 0 to 1 launches, B2B SaaS, enterprise UX, marketplaces, design systems, and frontend prototyping.",
    keywords: [
      "Product design portfolio",
      "AI product design portfolio",
      "B2B SaaS design portfolio",
      "recruiter product designer",
      "hire product designer",
      "senior product designer portfolio",
    ],
  },
  "/projects": {
    title: "Product Design Case Studies | Isabella Wang",
    description:
      "Product design case studies covering AI workflows, B2B SaaS platforms, enterprise design systems, marketplace UX, CMS tools, kiosk experiences, and 0 to 1 product launches.",
    keywords: ["Product design case studies", "UX case studies", "AI UX case study", "B2B SaaS UX portfolio"],
  },
  "/ai-research-guide": {
    title: "AI Product Design Case Study | Isabella Wang",
    description:
      "AI knowledge platform case study by Isabella Wang: designed a 0 to 1 AI research workflow that reduced consulting discovery from hours to minutes and reduced manual research by 60%.",
    keywords: ["AI product designer", "AI UX case study", "AI research workflow", "LLM UX", "consulting platform UX"],
  },
  "/design-system": {
    title: "Enterprise Design System Case Study | Isabella Wang",
    description:
      "Design system case study by Isabella Wang: expanded coverage from 45% to 90% across 4 B2B products, reduced spec-writing by 88%, and improved WCAG compliance.",
    keywords: ["Design systems designer", "enterprise design system", "B2B SaaS design system", "WCAG product design"],
  },
  "/platforms-integration": {
    title: "Enterprise AI Workflow UX Case Study | Isabella Wang",
    description:
      "Enterprise platform UX case study by Isabella Wang: AI-assisted workspace concepts for cross-tool consulting operations, source-heavy research, and systems design.",
    keywords: ["Enterprise UX designer", "AI workflow designer", "platform UX", "systems thinking product designer"],
  },
  "/event-discovery-cms": {
    title: "0 to 1 Product and CMS Case Study | Isabella Wang",
    description:
      "0 to 1 product design and full-stack build case study by Isabella Wang: event discovery app and CMS that automated recurring listings and reduced organizer manual work by 80%.",
    keywords: ["0 to 1 product designer", "CMS UX", "full-stack product designer", "consumer product design"],
  },
  "/kiosk": {
    title: "Kiosk and iPad UX Case Study | Isabella Wang",
    description:
      "Kiosk UX case study by Isabella Wang: self-service visitor check-in experience for office arrival workflows across kiosk and iPad surfaces.",
    keywords: ["Kiosk UX designer", "iPad UX", "service design", "visitor management UX"],
  },
  "/voice": {
    title: "Marketplace UX Case Study | Isabella Wang",
    description:
      "Marketplace product design case study by Isabella Wang: 0 to 1 NFT creator workflow that reduced the creation flow from 10 to 5 steps and lowered creator abandonment by 50%.",
    keywords: ["Marketplace UX designer", "creator tools UX", "onboarding UX", "0 to 1 marketplace design"],
  },
  "/contact": {
    title: "Contact Isabella Wang | Senior Product Designer",
    description:
      "Contact Isabella Wang for Senior Product Designer and Product Designer roles focused on AI products, 0 to 1 launches, B2B SaaS, enterprise UX, marketplaces, and design systems.",
    keywords: ["Contact Isabella Wang", "hire product designer", "Senior Product Designer available"],
  },
};

export const getRouteSeo = (pathname) => routeSeo[pathname] || routeSeo["/"];

export const absoluteUrl = (path) => `${SITE_URL}${path === "/" ? "/" : path}`;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR,
  url: SITE_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  jobTitle: "Senior Product Designer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  sameAs: [LINKEDIN_URL, MEDIUM_URL, NY_TANGO_URL, TERRA_URL],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Parsons School of Design" },
    { "@type": "CollegeOrUniversity", name: "Cornell University" },
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Senior Product Designer",
    occupationLocation: {
      "@type": "City",
      name: "New York City",
    },
    skills: CORE_SKILLS.join(", "),
  },
  knowsAbout: CORE_SKILLS,
  description: RECRUITER_SUMMARY,
  mainEntityOfPage: SITE_URL,
};

export const buildPageSchema = ({ pathname, title, description }) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: title,
  description,
  url: absoluteUrl(pathname),
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  about: personSchema,
  mainEntity: personSchema,
});

export const projectItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Isabella Wang product design case studies",
  itemListElement: PROJECT_PROFILES.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.name,
      url: project.url,
      description: project.description,
      keywords: project.skills.join(", "),
      creator: {
        "@type": "Person",
        name: AUTHOR,
        url: SITE_URL,
      },
    },
  })),
};

export const profileData = {
  name: AUTHOR,
  location: "New York City",
  portfolio: SITE_URL,
  email: CONTACT_EMAIL,
  linkedin: LINKEDIN_URL,
  targetTitles: TARGET_TITLES,
  summary: RECRUITER_SUMMARY,
  hiringPreferences: HIRING_PREFERENCES,
  skills: CORE_SKILLS,
  education: ["MS Computer and Information Sciences, Cornell University", "BFA Digital Design, Parsons School of Design"],
  caseStudies: PROJECT_PROFILES,
};
