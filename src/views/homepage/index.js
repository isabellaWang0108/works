import React, { useEffect, useRef, useState } from "react";
import "../../css/index.css"

import NavigationBar from "../../components/navigation"
import InpageContactMe from "../../components/inpage_contactme"
import WireframeBackground from "../../components/WireframeBackground"
import ProjectTags, { AI_RESEARCH_GUIDE_TAGS, DESIGN_SYSTEM_TAGS, VOICE_TAGS } from "../../components/projectTags"

import NYTangoProduct from "../../assets/images/home/ny-tango.png"
import NYTangoBackground from "../../assets/images/home/Project card/optimized/NY_Tango_Background.webp"
import VoiceProduct from "../../assets/images/home/voice.png"
import VoiceBackground from "../../assets/images/home/Project card/optimized/Voice_background.webp"
import AIPlatformProduct from "../../assets/images/home/anote.png"
import AIPlatformBackground from "../../assets/images/home/Project card/optimized/AIPlatform_background.webp"
import DesignSystemProduct from "../../assets/images/home/ds.png"
import DesignSystemBackground from "../../assets/images/home/Project card/optimized/DS_background.webp"

const HeroBuckyballGraph = React.lazy(() => import("../../components/HeroBuckyballGraph"));

const isCompactViewport = window.innerWidth < 990;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    openProject = (link, isExternal = false) => {
        if (isExternal) {
            window.open(link, "_blank", "noopener,noreferrer");
            return;
        }

        window.location.hash = `#/${link}`;
    }

    handleCardKeyDown = (event, link, isExternal = false) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.openProject(link, isExternal);
        }
    }

    componentDidMount() {
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
        sessionStorage.setItem("homepageScrollPosition", window.pageYOffset);
    }

    render() {
        return (

            <div id="parallaxScroll" >

                {/* navigation bar */}

                <NavigationBar href="#contactPart" contact />

                <div id="HP_container" className='HP_container'>
                    <div className="homepage-background-layer" aria-hidden="true">
                        {!prefersReducedMotion() && (
                            <React.Suspense fallback={null}>
                                <HeroBuckyballGraph />
                            </React.Suspense>
                        )}
                    </div>

                    {/* landing page */}
                    <div
                        style={windowHeight}
                        className="sessionContainer landing-session"
                    >
                        <div className="landing-tech-layer" aria-hidden="true">
                            <WireframeBackground />
                        </div>
                        <div id="landingPart" >
                            <div className='landingpage_Intro'>
                                <span className="heroTitleLine">AI Fluent.</span>
                                <span className="heroTitleLine heroTitleLine-secondary">Systems Driven.</span>
                                
                                <h3>
                                    Product Designer shaping complex data and ambiguous workflows into intuitive UX that speed up critical work.
                                </h3>
                            </div>
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
