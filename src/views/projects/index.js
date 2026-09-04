import React from "react";
import { Link } from "react-router-dom";

import NavigationBar from "../../components/navigation";
import {
  AI_RESEARCH_GUIDE_TAGS,
  DESIGN_SYSTEM_TAGS,
  KIOSK_TAGS,
  PLATFORMS_INTEGRATION_TAGS,
  VOICE_TAGS,
} from "../../components/projectTags";
import WireframeBackground from "../../components/WireframeBackground";

import KioskProduct from "../../assets/images/home/kiosk.png";
import PlatformsIntegrationProduct from "../../assets/images/home/Janus.svg";
import NYTangoProduct from "../../assets/images/home/Project card/NYTango_product.png";
import NYTangoBackground from "../../assets/images/home/Project card/NY_Tango_Background.webp";
import VoiceProduct from "../../assets/images/home/Project card/Voice_product.png";
import VoiceBackground from "../../assets/images/home/Project card/Voice_background.webp";
import AIPlatformProduct from "../../assets/images/home/Project card/AIPlatform_product.png";
import AIPlatformBackground from "../../assets/images/home/Project card/AIPlatform_background.webp";
import DesignSystemProduct from "../../assets/images/home/Project card/DS_product.png";
import DesignSystemBackground from "../../assets/images/home/Project card/DS_background.webp";

const projectCardTags = ["Consumer app", "0 to 1 product", "AI-assisted design"];

const projects = [
  {
    id: "NYTango",
    href: "https://nytango.vercel.app/",
    isExternal: true,
    tags: projectCardTags,
    product: NYTangoProduct,
    background: NYTangoBackground,
    alt: "NY Tango project calendar interface",
    summary: "Designed a community event discovery and management platform that streamlined organizer workflows and reduced manual operations by 80%.",
  },
  {
    id: "AIResearchGuide",
    href: "/ai-research-guide",
    tags: AI_RESEARCH_GUIDE_TAGS,
    product: AIPlatformProduct,
    background: AIPlatformBackground,
    alt: "AI knowledge platform interface",
    summary: "AI-powered knowledge platform that turns consulting discovery from hours into minutes.",
  },
  {
    id: "Voice",
    href: "/voice",
    tags: VOICE_TAGS,
    product: VoiceProduct,
    background: VoiceBackground,
    alt: "NFT creator tool interface",
    summary: "A creator marketplace that makes minting and selling NFT artwork feel clear, guided, and effortless.",
  },
  {
    id: "Design-system",
    href: "/design-system",
    tags: DESIGN_SYSTEM_TAGS,
    product: DesignSystemProduct,
    background: DesignSystemBackground,
    alt: "design system interface",
    summary: "Scaled shared UI from 45% to 90% across 4 products, cutting spec-writing time by 88% and raising WCAG 2.0 compliance to 100%.",
  },
  {
    id: "Kiosk",
    href: "/kiosk",
    tags: KIOSK_TAGS,
    product: KioskProduct,
    alt: "office visitor kiosk check-in interface",
    summary: "Designed an iPad check-in flow that reduced front desk workload, improved guest arrival, and balanced usability with real-world office security constraints.",
  },
  {
    id: "PlatformsIntegration",
    href: "/platforms-integration",
    tags: PLATFORMS_INTEGRATION_TAGS,
    product: PlatformsIntegrationProduct,
    alt: "AI-assisted consulting workspace concept",
    summary: "Connected fragmented consulting tools into a standardized, AI-assisted assessment workspace for complex enterprise workflows.",
  },
];

function AllProjectCard({ project }) {
  const content = (
    <>
      <div className="all-projects-card-media">
        {project.background && (
          <img loading="lazy" src={project.background} alt="" className="all-projects-card-backdrop" aria-hidden="true" />
        )}
        <img loading="lazy" decoding="async" src={project.product} alt={project.alt} className="all-projects-card-product" />
      </div>
      <div className="all-projects-card-copy">
        <p className="all-projects-tagline">{project.tags.join(" | ")}</p>
        <h1>{project.summary}</h1>
      </div>
    </>
  );

  if (project.isExternal) {
    return (
      <a
        id={project.id}
        className="sessionContainer bg-project-card all-projects-portfolio-card"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.id} project`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      id={project.id}
      className="sessionContainer bg-project-card all-projects-portfolio-card"
      to={project.href}
      aria-label={`Open ${project.id} case study`}
    >
      {content}
    </Link>
  );
}

function AllProjects() {
  return (
    <div className="page-container project-page all-projects-page">
      <NavigationBar />
      <div className="content-background-grid" aria-hidden="true">
        <WireframeBackground />
      </div>
      <main className="all-projects-content">
        <header className="all-projects-header">
          <h1>All projects</h1>
        </header>

        <section className="projectRow all-projects-card-grid" aria-label="All projects">
          {projects.map((project) => (
            <AllProjectCard key={project.id} project={project} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default AllProjects;
