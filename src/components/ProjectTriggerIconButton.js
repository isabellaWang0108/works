import React from "react";

const ProjectTriggerIconButton = ({ ariaDescribedBy, ariaLabel, onClick, onFocus, onMouseEnter }) => (
    <button
        type="button"
        className="case-study-trigger-icon secondary-icon-button"
        onClick={onClick}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
    >
        <svg viewBox="0 0 24 24" focusable="false">
            <path d="M6.7 18.7 5.3 17.3 15.6 7H8V5h11v11h-2V8.4L6.7 18.7Z" />
        </svg>
    </button>
);

export default ProjectTriggerIconButton;
