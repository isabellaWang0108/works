import React from "react";

export const AI_RESEARCH_GUIDE_TAGS = ["AI product", "B2B", "Internal tool"];
export const EVENT_DISCOVERY_CMS_TAGS = ["Consumer-facing", "AI workflow", "Event Discovery"];
export const VOICE_TAGS = ["Consumer-facing", "Marketplace", "Creation Workflow"];
export const DESIGN_SYSTEM_TAGS = ["Design systems", "Platform UX", "B2B SaaS"];
export const KIOSK_TAGS = ["B2B", "IoT", "Kiosk UX"];
export const PLATFORMS_INTEGRATION_TAGS = ["AI workflow", "Enterprise platform", "Systems thinking"];

function ProjectTags({ tags, className = "", style, accent = false }) {
    const classes = ["project-label-row", "badgeRow", accent ? "project-tags-accent" : "", className].filter(Boolean).join(" ");

    return (
        <div className={classes} style={style}>
            {tags.map((tag) => (
                <span className="project-label projectBadge" key={tag}>{tag}</span>
            ))}
        </div>
    );
}

export default ProjectTags;
