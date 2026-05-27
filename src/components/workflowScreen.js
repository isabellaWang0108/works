import React, { useEffect, useRef, useState } from "react";

function WorkflowScreen({ image, alt, index, title, children }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ref.current || isVisible) {
            return undefined;
        }

        if (!("IntersectionObserver" in window)) {
            setIsVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.18 });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [isVisible]);

    return (
        <figure ref={ref} className={`workflow-screen ${isVisible ? "is-visible" : ""}`}>
            <div className="workflow-screen-image">
                <img src={image} alt={alt} />
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
