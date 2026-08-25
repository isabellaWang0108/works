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
    height: isCompactViewport ? 'auto' : Math.max(window.innerHeight * 0.92, 680),
    minHeight: isCompactViewport ? 'auto' : 680,
    position: 'relative',
}

const aboutCardSpacing = {
    marginBottom: '4px',
    lineHeight: '22px'
}

const projectCardTags = ["Consumer app", "0 to 1 product", "AI-assisted design"];

class Homepage extends React.Component {
    cursorDistortionRef = React.createRef();
    cursorDistortionHeadRef = React.createRef();
    cursorDistortionTailRef = React.createRef();
    cursorDistortionFrame = null;
    cursorDistortionTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    cursorDistortionHead = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    cursorDistortionTail = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    cursorDistortionReady = false;
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

        const layer = this.cursorDistortionRef.current;

        if (!layer) {
            return;
        }

        const isInteractive = event.target.closest("a, button, [role='link'], .bg-project-card, .AboutProj");

        this.cursorDistortionTarget = { x: event.clientX, y: event.clientY };

        if (!this.cursorDistortionReady) {
            this.cursorDistortionReady = true;
            this.cursorDistortionHead = this.cursorDistortionTarget;
            this.cursorDistortionTail = this.cursorDistortionTarget;
        }

        layer.classList.add("is-visible");
        layer.classList.toggle("is-strong", Boolean(isInteractive));

        if (!this.cursorDistortionFrame) {
            this.cursorDistortionFrame = window.requestAnimationFrame(this.animateCursorDistortion);
        }
    }

    handleHeroPointerLeave = () => {
        this.cursorDistortionRef.current?.classList.remove("is-visible", "is-strong");
    }

    animateCursorDistortion = () => {
        const layer = this.cursorDistortionRef.current;
        const head = this.cursorDistortionHeadRef.current;
        const tail = this.cursorDistortionTailRef.current;

        if (!layer || !head || !tail) {
            this.cursorDistortionFrame = null;
            return;
        }

        const headEase = layer.classList.contains("is-strong") ? 0.24 : 0.2;
        const tailEase = layer.classList.contains("is-strong") ? 0.12 : 0.095;

        this.cursorDistortionHead = {
            x: this.cursorDistortionHead.x + (this.cursorDistortionTarget.x - this.cursorDistortionHead.x) * headEase,
            y: this.cursorDistortionHead.y + (this.cursorDistortionTarget.y - this.cursorDistortionHead.y) * headEase,
        };
        this.cursorDistortionTail = {
            x: this.cursorDistortionTail.x + (this.cursorDistortionHead.x - this.cursorDistortionTail.x) * tailEase,
            y: this.cursorDistortionTail.y + (this.cursorDistortionHead.y - this.cursorDistortionTail.y) * tailEase,
        };

        const tailDistance = Math.hypot(
            this.cursorDistortionHead.x - this.cursorDistortionTail.x,
            this.cursorDistortionHead.y - this.cursorDistortionTail.y
        );
        head.style.transform = `translate3d(${this.cursorDistortionHead.x}px, ${this.cursorDistortionHead.y}px, 0) translate(-50%, -50%)`;
        tail.style.transform = `translate3d(${this.cursorDistortionTail.x}px, ${this.cursorDistortionTail.y}px, 0) translate(-50%, -50%)`;

        if (
            layer.classList.contains("is-visible") ||
            Math.hypot(
                this.cursorDistortionTarget.x - this.cursorDistortionHead.x,
                this.cursorDistortionTarget.y - this.cursorDistortionHead.y
            ) > 0.8 ||
            tailDistance > 0.8
        ) {
            this.cursorDistortionFrame = window.requestAnimationFrame(this.animateCursorDistortion);
            return;
        }

        this.cursorDistortionFrame = null;
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
        if (this.cursorDistortionFrame) {
            window.cancelAnimationFrame(this.cursorDistortionFrame);
        }
    }

    render() {
        return (

            <div id="parallaxScroll" >

                {/* navigation bar */}

                <NavigationBar href="#contactPart" contact />

                <div id="HP_container" className='HP_container' onPointerMove={this.handleHeroPointerMove} onPointerLeave={this.handleHeroPointerLeave}>
                    <div className="cursor-distortion-layer" ref={this.cursorDistortionRef} aria-hidden="true">
                        <span className="cursor-liquid-distortion cursor-liquid-distortion-tail" ref={this.cursorDistortionTailRef}></span>
                        <span className="cursor-liquid-distortion cursor-liquid-distortion-head" ref={this.cursorDistortionHeadRef}></span>
                    </div>



                    {/* landing page */}
                    <div
                        style={windowHeight}
                        className="sessionContainer landing-session"
                    >
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
