import React from "react";
import $ from 'jquery';
import "../../css/index.css"

import NavigationBar from "../../components/navigation"
import InpageContactMe from "../../components/inpage_contactme"
import HeroBuckyballGraph from "../../components/HeroBuckyballGraph"
import ProjectTags, { AI_RESEARCH_GUIDE_TAGS, DESIGN_SYSTEM_TAGS, VOICE_TAGS } from "../../components/projectTags"

import NYTangoProduct from "../../assets/images/home/Project card/NYTango_product.svg"
import NYTangoBackground from "../../assets/images/home/Project card/NY_Tango_Background.png"
import VoiceProduct from "../../assets/images/home/Project card/Voice_product.svg"
import VoiceBackground from "../../assets/images/home/Project card/Voice_background.png"
import AIPlatformProduct from "../../assets/images/home/Project card/AIPlatform_product.svg"
import AIPlatformBackground from "../../assets/images/home/Project card/AIPlatform_background.png"
import DesignSystemProduct from "../../assets/images/home/Project card/DS_product.svg"
import DesignSystemBackground from "../../assets/images/home/Project card/DS_background.png"


const isCompactViewport = window.innerWidth < 990;

const windowHeight = {
    height: isCompactViewport ? 'auto' : window.innerHeight * 0.8,
    minHeight: isCompactViewport ? 'auto' : 500,
    position: 'relative',
}

const aboutCardSpacing = {
    marginBottom: '4px',
    lineHeight: '22px'
}

const projectCardTags = ["Consumer app", "0 to 1 product", "AI-assisted design"];

class Homepage extends React.Component {
    cursorTraceRef = React.createRef();
    cursorTraceFrame = null;
    cursorTraceLast = 0;
    cursorTracePoint = null;
    cursorTracePreviousPoint = null;
    cursorTraceLabels = ["UX", "UI", "DATA", "B2B", "B2C", "AI", "RESEARCH", "Technology", "CS", "ML", "Design"];

    state = {
        top: 300,
        left: 300,
        cursorImg: ' ',
        cursorRotation: 'rotate(0deg)',
        password: '0',
        background: 0,
        timeLineHeight: $(document).height(),
    }

    openProject = (link, isExternal = false) => {
        if (isExternal) {
            window.open(link, "_blank", "noopener,noreferrer");
            return;
        }

        window.location.hash = `#/${link}`;
    }

    handleHeroPointerMove = (event) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 768) {
            return;
        }

        const now = performance.now();
        if (now - this.cursorTraceLast < 54) {
            return;
        }

        this.cursorTraceLast = now;
        this.cursorTracePoint = { x: event.clientX, y: event.clientY };

        if (!this.cursorTraceFrame) {
            this.cursorTraceFrame = window.requestAnimationFrame(this.spawnCursorTrace);
        }
    }

    spawnCursorTrace = () => {
        this.cursorTraceFrame = null;
        const layer = this.cursorTraceRef.current;

        if (!layer || !this.cursorTracePoint) {
            return;
        }

        const point = this.cursorTracePoint;
        const previousPoint = this.cursorTracePreviousPoint;
        const node = document.createElement("span");
        const nodeSize = Math.round(4 + Math.random() * 3);

        node.className = "cursor-trace-node";
        node.textContent = this.cursorTraceLabels[Math.floor(Math.random() * this.cursorTraceLabels.length)];
        node.style.left = `${point.x}px`;
        node.style.top = `${point.y}px`;
        node.style.setProperty("--node-size", `${nodeSize}px`);
        node.style.setProperty("--node-drift-x", `${Math.round((Math.random() - 0.5) * 18)}px`);
        node.style.setProperty("--node-drift-y", `${Math.round((Math.random() - 0.5) * 18)}px`);
        layer.appendChild(node);
        window.setTimeout(() => node.remove(), 760);

        if (previousPoint) {
            const deltaX = point.x - previousPoint.x;
            const deltaY = point.y - previousPoint.y;
            const distance = Math.hypot(deltaX, deltaY);

            if (distance > 8 && distance < 180) {
                const link = document.createElement("span");

                link.className = "cursor-trace-link";
                link.style.left = `${previousPoint.x}px`;
                link.style.top = `${previousPoint.y}px`;
                link.style.width = `${distance}px`;
                link.style.transform = `rotate(${Math.atan2(deltaY, deltaX)}rad)`;
                layer.appendChild(link);
                window.setTimeout(() => link.remove(), 620);
            }
        }

        this.cursorTracePreviousPoint = point;
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
        if (this.cursorTraceFrame) {
            window.cancelAnimationFrame(this.cursorTraceFrame);
        }
    }

    render() {
        return (

            <div id="parallaxScroll" >

                {/* navigation bar */}

                <NavigationBar href="#contactPart" contact />

                <div id="HP_container" className='HP_container'>



                    {/* landing page */}
                    <div
                        style={windowHeight}
                        className="sessionContainer landing-session"
                        onPointerMove={this.handleHeroPointerMove}
                    >
                        <div className="cursor-trace-layer" ref={this.cursorTraceRef} aria-hidden="true"></div>
                        <div className="landing-tech-layer" aria-hidden="true">
                            <span>0101</span>
                            <span>AI_FLOW</span>
                            <span>SYS</span>
                            <span>UX</span>
                            <span>1010</span>
                            <span>MODEL</span>
                            <span>0101</span>
                            <span>DESIGN</span>
                        </div>
                        <div id="landingPart" >
                            <div className='landingpage_Intro fade-in'>
                                <span className="heroTitleLine">AI Fluent.</span>
                                <span className="heroTitleLine heroTitleLine-secondary">Systems Driven.</span>
                                
                                <h3>
                                    Product Designer shaping complex data and ambiguous workflows into intuitive UX that speed up critical work.
                                </h3>
                            </div>
                            <HeroBuckyballGraph labels={this.cursorTraceLabels} />
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
                                <img loading="lazy" src={NYTangoProduct} alt="NY Tango project calendar interface" className="img project-card-img" />
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
                                <img loading="lazy" src={AIPlatformProduct} alt="AI knowledge platform interface" className="img project-card-img" />
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
                                <img loading="lazy" src={VoiceProduct} alt="NFT creator tool interface" className="img project-card-img" />
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
                                <img loading="lazy" src={DesignSystemProduct} alt="design system interface" className="img project-card-img" />
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

                    {/* <div id="professionalW" style={{ display: 'flex', flexDirection: 'column', width: '100vw', position: 'relative', margin: '24px auto 2px auto', alignItems: 'center', zIndex: 100, background: '#7c7c7c1f', backdropFilter: 'blur(11px)' }}> */}


                    <div className="sessionContainer extra-projects-section">
                        <div className="seeMore">
                            <div className="threecolumn">
                                <div className="threecolumn-row">
                                    <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@wangxbella0108/experiment-of-chatgpts-effects-on-decisions-confidence-399ae25c3ad1" className="AboutProj bg-seeMore">
                                        <div className="AboutProj-content">
                                            <span className="passion-project-tag">AI Research</span>
                                            <div className="text-black bold" style={aboutCardSpacing}>AI's impact on decision making</div>
                                            <div className="text-black" style={aboutCardSpacing}>
                                                This is a research project to understand whether advice from AI has an impact on decision-making or confidence levels in people.
                                            </div>
                                        </div>
                                    </a>
                                    <p> </p>

                                    <a target="_blank" rel="noopener noreferrer" href="https://www.figma.com/proto/BGDErRAzTp8rVP3IySHUH4/GPT-Explanation?page-id=10%3A2&node-id=33-2&viewport=492%2C81%2C0.03&t=EmuS1i0dIl5eAal3-1&scaling=scale-down-width&content-scaling=fixed" className="AboutProj bg-seeMore">
                                        <div className="AboutProj-content">
                                            <span className="passion-project-tag">ML research</span>
                                            <div className="text-black bold" style={aboutCardSpacing}>Visually explaining how ChatGPT works</div>
                                            <div className="text-black" style={aboutCardSpacing}>     This project provides a visualized, step-by-step explanation designed to help non-technical audiences understand how ChatGPT works.
                                            </div>
                                        </div>
                                    </a>

                                </div>


                                <div className="threecolumn-row">
                                    <a href="https://medium.com/@wangxbella0108/how-smart-to-be-a-smart-home-d4c53322e1ff" rel="noopener noreferrer" target="_blank" className="AboutProj bg-seeMore">
                                        <div className="AboutProj-content">
                                            <span className="passion-project-tag">IoT Automation</span>
                                            <div className="text-black bold" style={aboutCardSpacing}>Integrated system</div>
                                            <div className="text-black" style={aboutCardSpacing}> This is a blogging post on my home automation project. I have reflected my thoughts on IoT's status quo in my writing.</div>
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
