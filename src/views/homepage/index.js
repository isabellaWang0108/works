import React, { useEffect, useRef, useState } from "react";

import NavigationBar from "../../components/navigation"
import InpageContactMe from "../../components/inpage_contactme"
import WireframeBackground from "../../components/WireframeBackground"
import HeroBuckyballGraph from "../../components/HeroBuckyballGraph"
import PortfolioChat from "../../components/PortfolioChat"
import ProjectTags, { AI_RESEARCH_GUIDE_TAGS, DESIGN_SYSTEM_TAGS, KIOSK_TAGS, PLATFORMS_INTEGRATION_TAGS, VOICE_TAGS } from "../../components/projectTags"

import KioskProduct from "../../assets/images/home/kiosk.png"
import PlatformsIntegrationProduct from "../../assets/images/home/Janus.svg"
import NYTangoProduct from "../../assets/images/home/Project card/NYTango_product.png"
import NYTangoBackground from "../../assets/images/home/Project card/NY_Tango_Background.webp"
import VoiceProduct from "../../assets/images/home/Project card/Voice_product.png"
import VoiceBackground from "../../assets/images/home/Project card/Voice_background.webp"
import AIPlatformProduct from "../../assets/images/home/Project card/AIPlatform_product.png"
import AIPlatformBackground from "../../assets/images/home/Project card/AIPlatform_background.webp"
import DesignSystemProduct from "../../assets/images/home/Project card/DS_product.png"
import DesignSystemBackground from "../../assets/images/home/Project card/DS_background.webp"

const isCompactViewport = window.innerWidth < 990;

const windowHeight = {
    height: isCompactViewport ? 'auto' : Math.max(window.innerHeight * 0.92, 680),
    minHeight: isCompactViewport ? 'auto' : 680,
    position: 'relative',
}

const aboutCardSpacing = {
    marginBottom: '0.25rem',
    lineHeight: '1.375rem'
}

const projectCardTags = ["Consumer app", "0 to 1 product", "AI-assisted design"];

const heroRecommendations = {
    NYTango: {
        title: "NY Tango",
        description: "Designed a community event discovery and management platform that streamlined organizer workflows and reduced manual operations by 80%.",
        triggerMetric: "Solo",
        triggerMetricLabel: "0→ 1 product launch",
        triggerSubtitle: "Event discovery + CMS",
        tags: projectCardTags,
        product: NYTangoProduct,
        background: NYTangoBackground,
        alt: "NY Tango project calendar interface",
        link: "https://nytango.vercel.app/",
        isExternal: true
    },
    PlatformsIntegration: {
        title: "AI-assisted Workspace",
        description: "Connected fragmented consulting tools into a standardized, AI-assisted assessment workspace for complex enterprise workflows.",
        triggerMetric: "AI",
        triggerMetricLabel: "workflow system",
        triggerSubtitle: "Enterprise platform strategy",
        tags: PLATFORMS_INTEGRATION_TAGS,
        product: PlatformsIntegrationProduct,
        alt: "AI-assisted consulting workspace concept",
        link: "platforms-integration"
    },
    Kiosk: {
        title: "Automating Office Check-in",
        description: "Designed an iPad check-in flow that reduced front desk workload, improved guest arrival, and balanced usability with real-world office security constraints.",
        triggerMetric: "Self",
        triggerMetricLabel: "service check-in",
        triggerSubtitle: "Visitor kiosk + iPad UX",
        tags: KIOSK_TAGS,
        product: KioskProduct,
        alt: "office visitor kiosk check-in interface",
        link: "kiosk"
    },
    AIResearchGuide: {
        title: "AI Knowledge Platform",
        description: "AI-powered knowledge platform that turns consulting discovery from hours into minutes.",
        triggerMetric: "60%",
        triggerMetricLabel: "time saved",
        triggerSubtitle: "AI-powered research tool",
        tags: AI_RESEARCH_GUIDE_TAGS,
        product: AIPlatformProduct,
        background: AIPlatformBackground,
        alt: "AI knowledge platform interface",
        link: "ai-research-guide"
    },
    Voice: {
        title: "Voice",
        description: "A creator marketplace that makes minting and selling NFT artwork feel clear, guided, and effortless.",
        triggerMetric: "2x",
        triggerMetricLabel: "faster activation",
        triggerSubtitle: "0 → 1 NFT marketplace",
        tags: VOICE_TAGS,
        product: VoiceProduct,
        background: VoiceBackground,
        alt: "NFT creator tool interface",
        link: "voice"
    },
    "Design-system": {
        title: "Design System",
        description: "Scaled shared UI from 45% to 90% across 4 products, cutting spec-writing time by 88% and raising WCAG 2.0 compliance to 100%.",
        triggerMetric: "90%",
        triggerMetricLabel: "less spec-writing",
        triggerSubtitle: "Design system across 4 products",
        tags: DESIGN_SYSTEM_TAGS,
        product: DesignSystemProduct,
        background: DesignSystemBackground,
        alt: "design system interface",
        link: "https://terra.vts.com/",
        searchLink: "design-system",
        searchIsExternal: false,
        isExternal: true
    }
};

const heroTriggerOrder = ["AIResearchGuide", "Voice", "Design-system", "NYTango"];

const LazyProductImage = ({ src, alt, className }) => {
    const imgRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const image = imgRef.current;

        if (!image || isReady) {
            return undefined;
        }

        if (!("IntersectionObserver" in window)) {
            setIsReady(true);
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsReady(true);
                observer.disconnect();
            }
        }, { rootMargin: "360px 0px" });

        observer.observe(image);

        return () => observer.disconnect();
    }, [isReady]);

    return (
        <img
            ref={imgRef}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            src={isReady ? src : undefined}
            alt={alt}
            className={className}
        />
    );
};

class Homepage extends React.Component {
    landingRef = React.createRef();
    previousBodyOverflow = "";
    previousHtmlOverflow = "";
    wheelStepTimeout = null;
    lastWheelStepAt = 0;
    touchStartY = null;
    isLandingInteractionLocked = false;

    state = {
        heroRecommendationId: null,
        isTriggerPreviewActive: false,
        isChatExpanded: false,
        hasNoSearchMatch: false
    }

    openProject = (link, isExternal = false) => {
        if (isExternal) {
            window.open(link, "_blank", "noopener,noreferrer");
            return;
        }

        window.location.assign(`/${link}`);
    }

    handleCardKeyDown = (event, link, isExternal = false) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.openProject(link, isExternal);
        }
    }

    handleRecommendation = (heroRecommendationId, isTriggerPreviewActive = false) => {
        this.setState({ heroRecommendationId, isTriggerPreviewActive, hasNoSearchMatch: false });
    }

    handleNoSearchMatch = () => {
        this.setState({
            heroRecommendationId: null,
            isTriggerPreviewActive: false,
            hasNoSearchMatch: true
        });
    }

    expandChat = () => {
        this.setState({
            heroRecommendationId: null,
            isTriggerPreviewActive: false,
            isChatExpanded: true,
            hasNoSearchMatch: false
        });
    }

    collapseChat = () => {
        this.setState({
            heroRecommendationId: null,
            isTriggerPreviewActive: false,
            isChatExpanded: false,
            hasNoSearchMatch: false
        });
    }

    clearRecommendation = () => {
        this.setState({ heroRecommendationId: null, isTriggerPreviewActive: false, hasNoSearchMatch: false });
    }

    handleTriggerBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            this.clearRecommendation();
        }
    }

    stepHeroPreview = (deltaY) => {
        if (this.state.isChatExpanded || Math.abs(deltaY) < 8) {
            return;
        }

        const now = window.performance?.now?.() ?? Date.now();
        if (now - this.lastWheelStepAt < 420) {
            return;
        }
        this.lastWheelStepAt = now;

        const currentIndex = heroTriggerOrder.indexOf(this.state.heroRecommendationId);
        const isScrollingDown = deltaY > 0;
        let nextRecommendationId = null;

        if (isScrollingDown) {
            nextRecommendationId = currentIndex === -1
                ? heroTriggerOrder[0]
                : heroTriggerOrder[currentIndex + 1] ?? null;
        } else {
            nextRecommendationId = currentIndex === -1
                ? heroTriggerOrder[heroTriggerOrder.length - 1]
                : heroTriggerOrder[currentIndex - 1] ?? null;
        }

        this.setState({
            heroRecommendationId: nextRecommendationId,
            isTriggerPreviewActive: Boolean(nextRecommendationId),
            hasNoSearchMatch: false
        });

        window.clearTimeout(this.wheelStepTimeout);
        this.wheelStepTimeout = window.setTimeout(() => {
            this.clearRecommendation();
        }, 2600);
    }

    handleLandingWheel = (event) => {
        event.preventDefault();
        this.stepHeroPreview(event.deltaY);
    }

    handleLandingTouchStart = (event) => {
        this.touchStartY = event.touches?.[0]?.clientY ?? null;
    }

    handleLandingTouchMove = (event) => {
        event.preventDefault();

        if (this.touchStartY === null) {
            return;
        }

        const currentY = event.touches?.[0]?.clientY;
        if (typeof currentY !== "number") {
            return;
        }

        this.stepHeroPreview(this.touchStartY - currentY);
    }

    componentDidMount() {
        this.isLandingInteractionLocked = !window.matchMedia("(max-width: 990px)").matches;

        if (this.isLandingInteractionLocked) {
            this.previousBodyOverflow = document.body.style.overflow;
            this.previousHtmlOverflow = document.documentElement.style.overflow;
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            document.body.classList.add("homepage-scroll-locked");
            window.addEventListener("wheel", this.handleLandingWheel, { passive: false });
            window.addEventListener("touchstart", this.handleLandingTouchStart, { passive: false });
            window.addEventListener("touchmove", this.handleLandingTouchMove, { passive: false });
        }

        const scrollTarget = sessionStorage.getItem("homepageScrollTarget");
        if (scrollTarget) {
            sessionStorage.removeItem("homepageScrollTarget");
            sessionStorage.removeItem("homepageScrollPosition");
            window.setTimeout(() => {
                const targetElement = document.getElementById(scrollTarget);
                targetElement?.scrollIntoView({ block: "start" });
                targetElement?.focus({ preventScroll: true });
            }, 80);
            return;
        }

        const savedScrollPosition = sessionStorage.getItem("homepageScrollPosition");
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
            sessionStorage.removeItem("homepageScrollPosition");
        }
    }

    // Save scroll position when the homepage is about to unmount
    componentWillUnmount() {
        window.clearTimeout(this.wheelStepTimeout);

        if (this.isLandingInteractionLocked) {
            window.removeEventListener("wheel", this.handleLandingWheel);
            document.body.style.overflow = this.previousBodyOverflow;
            document.documentElement.style.overflow = this.previousHtmlOverflow;
            document.body.classList.remove("homepage-scroll-locked");
            window.removeEventListener("touchstart", this.handleLandingTouchStart);
            window.removeEventListener("touchmove", this.handleLandingTouchMove);
        }

        sessionStorage.setItem("homepageScrollPosition", window.pageYOffset);
    }

    render() {
        const activeHeroProject = heroRecommendations[this.state.heroRecommendationId];
        const hasSearchFeedback = Boolean(activeHeroProject) || this.state.hasNoSearchMatch;
        const activeHeroProjectLink = !this.state.isTriggerPreviewActive && activeHeroProject?.searchLink
            ? activeHeroProject.searchLink
            : activeHeroProject?.link;
        const activeHeroProjectIsExternal = !this.state.isTriggerPreviewActive && typeof activeHeroProject?.searchIsExternal === "boolean"
            ? activeHeroProject.searchIsExternal
            : activeHeroProject?.isExternal;

        return (

            <div id="parallaxScroll" >

                {/* navigation bar */}

                <NavigationBar href="#contactPart" contact />

                <div id="HP_container" className='HP_container'>
                    {/* landing page */}
                    <div
                        style={windowHeight}
                        className="sessionContainer landing-session"
                    >
                        <div className="landing-tech-layer" aria-hidden="true">
                            <WireframeBackground />
                        </div>
                        {!this.state.isTriggerPreviewActive && (
                            <HeroBuckyballGraph rich={this.state.isChatExpanded || isCompactViewport} />
                        )}
                        <div
                            id="landingPart"
                            ref={this.landingRef}
                            className={`${this.state.isChatExpanded ? "is-search-centric" : ""}${hasSearchFeedback ? " has-hero-preview" : ""}`}
                        >
                            <div className={`landingpage_Intro${this.state.isChatExpanded ? " is-searching" : ""}`}>
                                <h1 className={`landing-title${this.state.isTriggerPreviewActive || this.state.isChatExpanded ? " is-previewing" : ""}${this.state.isChatExpanded ? " is-searching" : ""}`}>
                                    <span className="landing-title-word">
                                        Ambiguity to Product
                                    </span>
                                    <span className="landing-title-outcome">
                                        AI-powered Design
                                        <svg className="landing-title-chevron" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" focusable="false" aria-hidden="true">
                                            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                                        </svg>
                                        Frontend
                                    </span>
                                </h1>
                                <div className="mobile-legacy-hero" aria-label="Portfolio intro">
                                    <span className="heroTitleLine">AI Fluent.</span>
                                    <span className="heroTitleLine heroTitleLine-secondary">Systems Driven.</span>
                                    <h3>
                                        Product Designer shaping complex data and ambiguous workflows into intuitive UX that speed up critical work.
                                    </h3>
                                </div>
                                {!this.state.isChatExpanded && (
                                <div className="case-study-triggers" aria-label="Preview case studies">
                                    {heroTriggerOrder.map((projectId, index) => {
                                        const project = heroRecommendations[projectId];
                                        const isActive = this.state.heroRecommendationId === projectId;

                                        return (
                                            <div
                                                key={projectId}
                                                className={`case-study-trigger-item case-study-trigger-item-${index}${isActive ? " is-active" : ""}`}
                                                onMouseEnter={() => this.handleRecommendation(projectId, true)}
                                                onFocus={() => this.handleRecommendation(projectId, true)}
                                                onMouseLeave={this.clearRecommendation}
                                                onBlur={this.handleTriggerBlur}
                                            >
                                                <button
                                                    type="button"
                                                    className={`case-study-trigger${isActive ? " is-active" : ""}`}
                                                    onClick={() => this.openProject(project.link, project.isExternal)}
                                                    aria-label={`Open ${project.title} case study`}
                                                    aria-describedby={`${projectId}-preview`}
                                                >
                                                    <span className="case-study-trigger-copy">
                                                        <span className="case-study-trigger-heading">
                                                            <strong>{project.triggerMetric}</strong>
                                                            <span>{project.triggerMetricLabel}</span>
                                                        </span>
                                                        <span className="case-study-trigger-subtitle">{project.triggerSubtitle}</span>
                                                    </span>
                                                    <span className="case-study-trigger-icon" aria-hidden="true">↗</span>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                                )}
                            </div>
                            {activeHeroProject && (
                                <div
                                    id={`${this.state.heroRecommendationId}-preview`}
                                    className="hero-recommendation-card trigger-preview-card"
                                    role="link"
                                    tabIndex="0"
                                    onClick={() => this.openProject(activeHeroProjectLink, activeHeroProjectIsExternal)}
                                    onKeyDown={(event) => this.handleCardKeyDown(
                                        event,
                                        activeHeroProjectLink,
                                        activeHeroProjectIsExternal
                                    )}
                                    aria-label={`Open ${activeHeroProject.title} case study`}
                                >
                                    {activeHeroProject.background && (
                                        <img loading="lazy" src={activeHeroProject.background} alt="" className="hero-recommendation-backdrop" aria-hidden="true" />
                                    )}
                                    <LazyProductImage src={activeHeroProject.product} alt={activeHeroProject.alt} className="hero-recommendation-img" />
                                    <div className="hero-recommendation-content">
                                        <ProjectTags tags={activeHeroProject.tags} />
                                        <h2>{activeHeroProject.title}</h2>
                                        <p>{activeHeroProject.description}</p>
                                    </div>
                                </div>
                            )}
                            {this.state.hasNoSearchMatch && (
                                <div
                                    className="hero-recommendation-card trigger-preview-card no-search-match-card"
                                    role="status"
                                    aria-live="polite"
                                >
                                    <div className="no-search-match-content">
                                        <span className="no-search-match-emoji" aria-hidden="true">😢</span>
                                        <h2>No Project matches your criteria.</h2>
                                        <p>Try broader keywords.</p>
                                    </div>
                                </div>
                            )}
                            <PortfolioChat
                                isExpanded={this.state.isChatExpanded}
                                onExpand={this.expandChat}
                                onCollapse={this.collapseChat}
                                onRecommend={this.handleRecommendation}
                                onNoMatch={this.handleNoSearchMatch}
                            />
                        </div>
                    </div>


                    <div id="projectsPart" className="projectRow" tabIndex="-1" aria-label="Selected projects">
                        {/* NY Tango */}
                        <div
                            id="NYTango"
                            className="sessionContainer bg-project-card"
                            role="link"
                            tabIndex="0"
                            onClick={() => this.openProject("https://nytango.vercel.app/", true)}
                            onKeyDown={(event) => this.handleCardKeyDown(event, "https://nytango.vercel.app/", true)}
                        >
                            <div className="contentblock">
                                <img loading="lazy" src={NYTangoBackground} alt="" className="img project-card-backdrop" aria-hidden="true" />
                                <LazyProductImage src={NYTangoProduct} alt="NY Tango project calendar interface" className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <ProjectTags tags={projectCardTags} />
                                <h1>
                                    Designed a community event discovery and management platform that streamlined organizer workflows and reduced manual operations by 80%.
                                </h1>
                            </div>
                            <div className="contentblock"></div>
                        </div>

                        {/* AI Research Guide */}
                        <div
                            id="AIResearchGuide"
                            className="sessionContainer bg-project-card"
                            role="link"
                            tabIndex="0"
                            onClick={() => this.openProject("ai-research-guide")}
                            onKeyDown={(event) => this.handleCardKeyDown(event, "ai-research-guide")}
                        >
                            <div className="contentblock">
                                <img loading="lazy" src={AIPlatformBackground} alt="" className="img project-card-backdrop" aria-hidden="true" />
                                <LazyProductImage src={AIPlatformProduct} alt="AI knowledge platform interface" className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <ProjectTags tags={AI_RESEARCH_GUIDE_TAGS} />
                                <h1>
                                    AI-powered knowledge platform that turns consulting discovery from hours into minutes.
                                </h1>
                            </div>
                            <div className="contentblock"></div>
                        </div>

                    </div>


                    <div className="projectRow">
                        
                        {/* Voice */}
                        <div
                            id="Voice"
                            className="sessionContainer bg-project-card"
                            role="link"
                            tabIndex="0"
                            onClick={() => this.openProject("voice")}
                            onKeyDown={(event) => this.handleCardKeyDown(event, "voice")}
                        >
                            <div className="contentblock">
                                <img loading="lazy" src={VoiceBackground} alt="" className="img project-card-backdrop" aria-hidden="true" />
                                <LazyProductImage src={VoiceProduct} alt="NFT creator tool interface" className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <ProjectTags tags={VOICE_TAGS} />
                                <h1>
                                    A creator marketplace that makes minting and selling NFT artwork feel clear, guided, and effortless.
                                </h1>
                            </div>
                            <div className="contentblock"></div>
                        </div>
                        

                        {/* Design system */}
                        <div
                            id="Design-system"
                            className="sessionContainer bg-project-card"
                            role="link"
                            tabIndex="0"
                            onClick={() => this.openProject("https://terra.vts.com/", true)}
                            onKeyDown={(event) => this.handleCardKeyDown(event, "https://terra.vts.com/", true)}
                        >
                            <div className="contentblock">
                                <img loading="lazy" src={DesignSystemBackground} alt="" className="img project-card-backdrop" aria-hidden="true" />
                                <LazyProductImage src={DesignSystemProduct} alt="design system interface" className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <ProjectTags tags={DESIGN_SYSTEM_TAGS} />
                                <h1>
                                    Scaled shared UI from 45% to 90% across 4 products, cutting spec-writing time by 88% and raising WCAG 2.0 compliance to 100%.
                                </h1>
                            </div>
                            <div className="contentblock"></div>
                        </div>
                    </div>

                    <div className="sessionContainer extra-projects-section">
                        <div className="seeMore">
                            <div className="threecolumn">
                                <div className="threecolumn-row">
                                    <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@wangxbella0108/experiment-of-chatgpts-effects-on-decisions-confidence-399ae25c3ad1" className="AboutProj bg-seeMore">
                                        <div className="AboutProj-content">
                                            <span className="passion-project-tag">AI Research</span>
                                            <div className="text-black bold" style={aboutCardSpacing}>AI's impact on decision making</div>
                                            <div className="text-black" style={aboutCardSpacing}>
                                                Studying how AI advice shapes decision confidence.
                                            </div>
                                        </div>
                                    </a>
                                    <p> </p>

                                    <a target="_blank" rel="noopener noreferrer" href="https://www.figma.com/proto/BGDErRAzTp8rVP3IySHUH4/GPT-Explanation?page-id=10%3A2&node-id=33-2&viewport=492%2C81%2C0.03&t=EmuS1i0dIl5eAal3-1&scaling=scale-down-width&content-scaling=fixed" className="AboutProj bg-seeMore">
                                        <div className="AboutProj-content">
                                            <span className="passion-project-tag">ML research</span>
                                            <div className="text-black bold" style={aboutCardSpacing}>Visually explaining how ChatGPT works</div>
                                            <div className="text-black" style={aboutCardSpacing}>A step-by-step visual explainer for non-technical audiences.
                                            </div>
                                        </div>
                                    </a>

                                </div>


                                <div className="threecolumn-row">
                                    <a href="https://medium.com/@wangxbella0108/how-smart-to-be-a-smart-home-d4c53322e1ff" rel="noopener noreferrer" target="_blank" className="AboutProj bg-seeMore">
                                        <div className="AboutProj-content">
                                            <span className="passion-project-tag">IoT Automation</span>
                                            <div className="text-black bold" style={aboutCardSpacing}>Integrated system</div>
                                            <div className="text-black" style={aboutCardSpacing}>Reflections from a hands-on smart home automation build.</div>
                                        </div>
                                    </a>
                                    <p> </p>

                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Contact */}
                    <div id="contactPart" className="sessionContainer homepage-contact-section">
                        <InpageContactMe showProjectsButton={false} />
                    </div>


                </div>

            </div >
        );

    }
}

export default Homepage;
