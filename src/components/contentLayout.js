import React from "react";

class ContentLayout extends React.Component {
    layoutRef = React.createRef();
    observer = null;

    componentDidMount() {
        const layout = this.layoutRef.current;

        if (!layout) {
            return;
        }

        const revealItems = layout.querySelectorAll([
            "#title",
            ".badgeRow",
            ".inpage_hero_container",
            ".content-block:not(.left-nav)"
        ].join(", "));

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
            revealItems.forEach((item) => item.classList.add("is-scroll-visible"));
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-scroll-visible");
                }
            });
        }, {
            root: layout.closest(".page-container"),
            rootMargin: "0px 0px -12% 0px",
            threshold: 0.12,
        });

        revealItems.forEach((item) => {
            item.classList.add("scroll-reveal");
            this.observer.observe(item);
        });
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    render() {
        return (
            <div className="content-layout" ref={this.layoutRef}>
                <div className="content-background-grid" aria-hidden="true">
                    <span>0101</span>
                    <span>AI_FLOW</span>
                    <span>SYS</span>
                    <span>UX</span>
                    <span>1010</span>
                    <span>MODEL</span>
                    <span>0101</span>
                    <span>DESIGN</span>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default ContentLayout;
