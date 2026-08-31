import React from "react";

function WorkflowScreen({ image, alt, index, title, children }) {
    return (
        <figure className="workflow-screen">
            <div className="workflow-screen-image">
                <img loading="lazy" decoding="async" src={image} alt={alt} />
            </div>
            <figcaption>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{children}</p>
            </figcaption>
        </figure>
    );
}

export default WorkflowScreen;
