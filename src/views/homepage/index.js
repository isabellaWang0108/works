import React from "react";
import $ from 'jquery';
import "../../css/index.css"
import { Canvas } from "@react-three/fiber";
// import * as THREE from 'three'

import NavigationBar from "../../components/navigation"
import Animation3D from '../../components/animation3D'

import LeverGuide from "../../assets/images/home/LeverGuide.svg?react"
import NYTangoProduct from "../../assets/images/home/NYTango_product.svg"
import NYTangoBackground from "../../assets/images/home/NY_Tango_Background.png"
import DesignSystem from "../../assets/images/home/ds.png"
import Voice from "../../assets/images/home/voice.png"
import Github from "../../assets/images/contact/github.svg"
import Linkedin from "../../assets/images/contact/linkedin.svg"


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

class Homepage extends React.Component {

    state = {
        top: 300,
        left: 300,
        cursorImg: ' ',
        cursorRotation: 'rotate(0deg)',
        password: '0',
        background: 0,
        timeLineHeight: $(document).height(),
        canvasReady: false,
    }

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
        const savedScrollPosition = sessionStorage.getItem("homepageScrollPosition");
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
            sessionStorage.removeItem("homepageScrollPosition");
        }
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        // Defer Three.js canvas creation until after the first paint
        requestAnimationFrame(() => this.setState({ canvasReady: true }));
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

                <div id="HP_container" className='HP_container' >



                    {/* landing page */}
                    <div style={windowHeight} className="sessionContainer landing-session" >
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
                         AI Fluent. 
                         <br/>
                         Systems Driven.
                                
                                <h3 style={{letterSpacing:.25, lineHeight:1.8, fontSize: window.innerWidth < 990 ? 22 : 28}}> 
                               I design AI features, work with AI tools, and think in systems — turning complex user flows into coherent, scalable experiences.

                                </h3>
                                <div> </div>
                                <div className="heroBadges">
                                    <span>AI product design</span>
                                    <span>Systems thinking</span>
                                    <span>Fullstack designer</span>
                                </div>
                            </div>

                        </div>
                        {this.state.canvasReady && (
                            <Canvas
                                className="ambient-hero-canvas"
                                style={{ zIndex: 0, position: 'fixed', right: '0px', top: '0px', width: window.innerWidth > 780 ? "64%" : "100%" }}
                                camera={{ position: [3, 5, 17] }}
                            >
                                <hemisphereLight intensity={0.5} groundColor="#20232c" />
                                <pointLight position={[18, 8, 8]} intensity={4.2} />
                                <Animation3D />
                            </Canvas>
                        )}
                    </div>


                    <div className="projectRow">
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
                                <div className="badgeRow">
                                    <span className="projectBadge">Consumer-facing</span>
                                    <span className="projectBadge">Visual</span>
                                    <span className="projectBadge">Made with AI tools</span>
                                </div>
                                <h1>
                                    A live NYC tango calendar that helps dancers discover events faster and feel closer to the community.
                                </h1>
                            </div>
                            <div className="contentblock"></div>
                        </div>

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
                                <img loading="lazy" src={Voice} alt="" className="img project-card-backdrop" aria-hidden="true" />
                                <img loading="lazy" src={Voice} alt="voice" className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <div className="badgeRow">
                                    <span className="projectBadge">Creator tools</span>
                                    <span className="projectBadge">NFT marketplace</span>
                                    <span className="projectBadge">Web3</span>
                                </div>
                                <h1>
                                    A creator tool that helps artists turn artwork into NFTs and makes complex technology feel approachable.
                                </h1>
                            </div>
                            <div className="contentblock"></div>
                        </div>
                    </div>


                    <div className="projectRow">
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
                                <LeverGuide className="img project-card-backdrop" aria-hidden="true" />
                                <LeverGuide className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <div className="badgeRow">
                                    <span className="projectBadge">Generative AI</span>
                                    <span className="projectBadge">Knowledge product</span>
                                    <span className="projectBadge">B2B</span>
                                </div>
                                <h1>
                                    An AI knowledge tool for consulting onboarding that helps teams move from learning to execution faster.
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
                            onClick={() => this.openProject("design-system")}
                            onKeyDown={(event) => this.handleCardKeyDown(event, "design-system")}
                        >
                            <div className="contentblock">
                                <img loading="lazy" src={DesignSystem} alt="" className="img project-card-backdrop" aria-hidden="true" />
                                <img loading="lazy" src={DesignSystem} alt="design system" className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <div className="badgeRow">
                                    <span className="projectBadge">Design system</span>
                                    <span className="projectBadge">DesignOps</span>
                                    <span className="projectBadge">Platform</span>
                                </div>
                                <h1>
                                    A design system for a multi-product platform that helps teams ship more consistent experiences at scale.
                                </h1>
                            </div>
                            <div className="contentblock"></div>
                        </div>
                    </div>

                    {/* <div id="professionalW" style={{ display: 'flex', flexDirection: 'column', width: '100vw', position: 'relative', margin: '24px auto 2px auto', alignItems: 'center', zIndex: 100, background: '#7c7c7c1f', backdropFilter: 'blur(11px)' }}> */}


                    {/* About Me */}
                    <div id="seeMore" className="sessionContainer about-section">
                        <div className="seeMore about-panel">
                            <div>
                                <h1>About me</h1>
                                <p>
                                    I deeply care about the human-technology relationship and aim to help define more thoughtful ways people work with intelligent systems. Research, creative experimentation, and data-driven iteration sit at the heart of my design process.
                                </p>
                                <p>
                                    I’m currently exploring product design opportunities where I can shape thoughtful AI and systems-driven experiences. If my work resonates, I’d love to connect.
                                </p>
                            </div>

                            <div className="about-actions">
                                <a target="_blank" rel="noopener noreferrer" href="https://github.com/isabellawang0108" aria-label="GitHub">
                                    <img loading="lazy" src={Github} alt="GitHub icon"></img>
                                </a>

                                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/isabella-wang-310181149/" aria-label="LinkedIn">
                                    <img loading="lazy" src={Linkedin} alt="LinkedIn icon"></img>
                                </a>

                                <a className="about-email" href="mailto:wangxbella0108@gmail.com" target="_blank" rel="noopener noreferrer">wangxbella0108@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="sessionContainer extra-projects-section">
                        <div className="seeMore">
                            <h2>Passion projects</h2>

                            <div className="threecolumn">
                                <div className="threecolumn-row">
                                    <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@wangxbella0108/experiment-of-chatgpts-effects-on-decisions-confidence-399ae25c3ad1" className="AboutProj bg-seeMore">
                                        <div className="AboutProj-content">
                                            <div className="text-black bold" style={aboutCardSpacing}>AI's impact on decision making</div>
                                            <div className="text-black" style={aboutCardSpacing}>
                                                This is a research project to understand whether advice from AI has an impact on decision-making or confidence levels in people.
                                            </div>
                                        </div>
                                    </a>
                                    <p> </p>

                                    <a target="_blank" rel="noopener noreferrer" href="https://www.figma.com/proto/BGDErRAzTp8rVP3IySHUH4/GPT-Explanation?page-id=10%3A2&node-id=33-2&viewport=492%2C81%2C0.03&t=EmuS1i0dIl5eAal3-1&scaling=scale-down-width&content-scaling=fixed" className="AboutProj bg-seeMore">
                                        <div className="AboutProj-content">
                                            <div className="text-black bold" style={aboutCardSpacing}>Visually explaining how ChatGPT works</div>
                                            <div className="text-black" style={aboutCardSpacing}>     This project provides a visualized, step-by-step explanation designed to help non-technical audiences understand how ChatGPT works.
                                            </div>
                                        </div>
                                    </a>

                                </div>


                                <div className="threecolumn-row">
                                    <a href="https://medium.com/@wangxbella0108/how-smart-to-be-a-smart-home-d4c53322e1ff" rel="noopener noreferrer" target="_blank" className="AboutProj bg-seeMore">
                                        <div className="AboutProj-content">
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
                    <div id="seeMore" className="sessionContainer" style={{ height: '300pt', position: 'relative' }} >

                    </div>


                </div>

            </div >
        );

    }
}

export default Homepage;
