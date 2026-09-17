import React from "react";

import ProjectTriggerIconButton from "./ProjectTriggerIconButton";

const WorkImpactTrigger = ({
    index,
    isActive,
    onOpen,
    onPreview,
    previewId,
    project
}) => (
    <div
        className={`case-study-trigger-item case-study-trigger-item-${index}${isActive ? " is-active" : ""}`}
    >
        <button
            type="button"
            className={`case-study-trigger${isActive ? " is-active" : ""}`}
            onClick={onOpen}
            onFocus={onPreview}
            onMouseEnter={onPreview}
            aria-label={`Open ${project.title} case study`}
            aria-describedby={previewId}
        >
            <span className="case-study-trigger-copy">
                <span className="case-study-trigger-heading">
                    <strong>{project.triggerMetric}</strong>
                    <span>{project.triggerMetricLabel}</span>
                </span>
                <span className="case-study-trigger-subtitle">{project.triggerSubtitle}</span>
            </span>
            <ProjectTriggerIconButton
                as="span"
                decorative
            />
        </button>
    </div>
);

export default WorkImpactTrigger;
