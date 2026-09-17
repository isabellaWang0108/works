import React from "react";
import { AllProjectCard, projects } from "../views/projects";

function RelatedProjects({ currentProjectId, count = 2 }) {
  const currentIndex = projects.findIndex((project) => project.id === currentProjectId);
  const orderedProjects = currentIndex >= 0
    ? [...projects.slice(currentIndex + 1), ...projects.slice(0, currentIndex)]
    : projects;
  const relatedProjects = orderedProjects
    .filter((project) => project.id !== currentProjectId)
    .slice(0, count);

  if (!relatedProjects.length) {
    return null;
  }

  return (
    <section className="related-projects-section" aria-label="Other projects">
      <h2>Other projects</h2>
      <div className="projectRow all-projects-card-grid related-projects-grid">
        {relatedProjects.map((project) => (
          <AllProjectCard
            key={project.id}
            project={project}
            index={projects.findIndex((item) => item.id === project.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedProjects;
