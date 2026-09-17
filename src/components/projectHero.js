import React from "react";
import ProjectContext from "./projectContext";
import ProjectTags from "./projectTags";

const buildContextStats = ({ duration, role, team }) => {
  const stats = [];

  if (duration) {
    stats.push({ label: "Duration", value: duration });
  }

  if (role) {
    stats.push({ label: "Role", value: role });
  }

  if (team) {
    stats.push({ label: "Team", value: team });
  }

  return stats;
};

function ProjectHero({
  title,
  titleLines,
  kicker = "Case study / 0→1 product",
  tags = [],
  duration,
  role,
  team,
  summary,
  outcome,
  ownership,
  stats,
  image,
  imageAlt,
  className = "",
}) {
  const resolvedStats = stats || buildContextStats({ duration, role, team });
  const subtitleContent = [summary, outcome].filter(Boolean).join(" ");
  const titleContent = titleLines?.length
    ? titleLines.map((line) => (
      <span className="project-hero-title-line" key={line}>{line}</span>
    ))
    : title;

  return (
    <section className={`project-hero-shell project-detail-hero ${className}`.trim()}>
      <div className="project-hero-heading">
        <ProjectTags tags={tags} />
        <h1 id="title" className="fade-in">{titleContent}</h1>
        {subtitleContent && <div className="project-hero-subtitle fade-in">{subtitleContent}</div>}
        {ownership && (
          <div className="project-hero-meta fade-in">
            <p className="project-hero-meta-row">
              <span className="project-hero-meta-label">Ownership</span>
              <span>{ownership}</span>
            </p>
          </div>
        )}
      </div>

      <div className="inpage_hero_container fade-in">
        <div className="inpage_hero_box">
          {(duration || role || team) && (
            <ProjectContext duration={duration} team={team} role={role} />
          )}
          {subtitleContent && <div className="project-hero-mobile-summary">{subtitleContent}</div>}
        </div>

        <div className="inpage_hero_box">
          <img src={image} className="inpage_hero_img" alt={imageAlt} decoding="async" fetchPriority="high" />
        </div>
      </div>

      {resolvedStats.length > 0 && (
        <dl className="project-hero-stats fade-in" aria-label="Project summary" data-count={resolvedStats.length}>
          {resolvedStats.map((item) => (
            <div key={`${item.label}-${item.value}`}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

export default ProjectHero;
