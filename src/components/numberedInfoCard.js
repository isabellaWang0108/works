import React from "react";

const NumberedInfoCard = ({ index, title, children, className = "" }) => {
    const classes = ["numbered-info-card", className].filter(Boolean).join(" ");

    return (
        <article className={classes}>
            <span className="numbered-info-card-index">{index}</span>
            <h3 className="numbered-info-card-title">{title}</h3>
            <p className="numbered-info-card-body">{children}</p>
        </article>
    );
};

export default NumberedInfoCard;
