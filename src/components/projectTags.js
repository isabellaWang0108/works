import React from "react";

export const AI_RESEARCH_GUIDE_TAGS = ["AI product", "B2B", "Internal tool"];
export const VOICE_TAGS = ["Consumer-facing", "Technical workflow", "Digital marketplace"];
export const DESIGN_SYSTEM_TAGS = ["Design systems", "Platform UX", "DesignOps"];
export const KIOSK_TAGS = ["B2B", "IoT", "Kiosk UX"];
export const PLATFORMS_INTEGRATION_TAGS = ["AI workflow", "Enterprise platform", "Systems thinking"];

function ProjectTags({ tags, className = "badgeRow", style }) {
    return (
        <div className={className} style={style}>
            {tags.map((tag) => (
                <span className="projectBadge" key={tag}>{tag}</span>
            ))}
        </div>
    );
}

export default ProjectTags;
