import React from "react";
import $ from 'jquery';
import "../../css/index.css"
import { Canvas } from "@react-three/fiber";
// import * as THREE from 'three'

import NavigationBar from "../../components/navigation"
import Animation3D from '../../components/animation3D'

import LeverGuide from "../../assets/images/home/LeverGuide.svg?react"
import Janus from "../../assets/images/home/Janus.svg?react"
import DesignSystem from "../../assets/images/home/ds.png"
import Voice from "../../assets/images/home/voice.png"
import Button from "../../components/myButton"
import UnderlineBtn from "../../components/underLinedBtn"
import Github from "../../assets/images/contact/github.svg"
import Linkedin from "../../assets/images/contact/linkedin.svg"


const windowHeight = {
    height: window.innerWidth < 990 ? window.innerHeight : window.innerHeight * 0.8,
    minHeight: 500,
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


    componentDidMount() {
        const savedScrollPosition = sessionStorage.getItem("homepageScrollPosition");
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
            sessionStorage.removeItem("homepageScrollPosition");
        }
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
                    <div style={windowHeight} className="sessionContainer" >
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
                                    <span>Autonomous Designer</span>
                                </div>
                            </div>

                        </div>
                        {this.state.canvasReady && (
                            <Canvas
                                style={{ zIndex: 1, position: 'fixed', right: '0px', top: '0px', width: window.innerWidth > 780 ? "60%" : "100%" }}
                                camera={{ position: [3, 5, 15] }}
                            >
                                <hemisphereLight intensity={.7} groundColor="#555" />
                                <pointLight position={[50, 0, 0]} intensity={10} />
                                <Animation3D />
                            </Canvas>
                        )}
                    </div>


                    <div className="projectRow">
                        {/* AI Research Guide */}
                        <div id="AIResearchGuide" className="sessionContainer bg-project-card">
                            <div className="contentblock">
                                 <LeverGuide className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <h1>AI-Powered Knowledge Tool for Faster Consulting Discovery</h1>
                                <div className="badgeRow">
                                    <span className="projectBadge">Generative AI</span>
                                    <span className="projectBadge">Knowledge product</span>
                                    <span className="projectBadge">B2B</span>
                                </div>
                                <p>Turned fragmented domain expertise into guided workflows, source-backed answers, and scannable recommendations for generalist consultants.
                                </p>
                            </div>
                            <div className="contentblock">
                                <UnderlineBtn
                                    innerLink={true}
                                    label="Read the case"
                                    link="ai-research-guide"
                                    className="readCases"
                                />
                            </div>
                        </div>

                        {/* Platforms Integration */}
                        <div id="PlatformsIntegration" className="sessionContainer bg-project-card">
                            <div className="contentblock">
                                <Janus className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <h1>Unifying Consulting Tools into One AI-assisted Workspace</h1>
                                <div className="badgeRow">
                                    <span className="projectBadge">Workflow orchestration</span>
                                    <span className="projectBadge">AI-assisted</span>
                                    <span className="projectBadge">Enterprise SaaS</span>
                                </div>
                                <p>Mapped messy enterprise workflows into a continuous assessment experience that preserved context across systems and reduced tool-switching friction.
                                </p>
                            </div>
                            <div className="contentblock">
                                <UnderlineBtn
                                    innerLink={true}
                                    label="Read the case"
                                    link="platforms-integration"
                                    className="readCases"
                                />
                            </div>
                        </div>
                    </div>


                    <div className="projectRow">
                        {/* Design system */}
                        <div id="Design-system" className="sessionContainer bg-project-card">
                            <div className="contentblock">
                                <img loading="lazy" src={DesignSystem} alt="design system" className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <h1>Scaling Product Consistency with a Design System</h1>
                                <div className="badgeRow">
                                    <span className="projectBadge">Design system</span>
                                    <span className="projectBadge">DesignOps</span>
                                    <span className="projectBadge">Platform</span>
                                </div>
                                <p>Built shared foundations, component guidance, and adoption practices for 50+ designers and engineers working across a complex product suite.
                                </p>
                            </div>
                            <div className="contentblock">
                                <UnderlineBtn
                                    innerLink={true}
                                    label="Read the case"
                                    link="design-system"
                                    className="readCases"
                                />
                                <UnderlineBtn
                                    innerLink={false}
                                    label="See the live site"
                                    link="https://terra.vts.com/"
                                    className="readCases"
                                />
                            </div>
                        </div>

                        {/* Voice */}
                        <div id="Voice" className="sessionContainer bg-project-card">
                            <div className="contentblock">
                                <img loading="lazy" src={Voice} alt="voice" className="img project-card-img" />
                            </div>
                            <div className="contentblock">
                                <h1>Making NFT Creation Easier for Emerging Artists</h1>
                                <div className="badgeRow">
                                    <span className="projectBadge">Creator tools</span>
                                    <span className="projectBadge">NFT marketplace</span>
                                    <span className="projectBadge">Web3</span>
                                </div>
                                <p>Translated blockchain-heavy workflows into approachable creation, publishing, and viewing patterns for artists with different levels of technical fluency.
                                </p>
                            </div>
                            <div className="contentblock">
                                <UnderlineBtn
                                    innerLink={true}
                                    label="Read the case"
                                    link="voice"
                                    className="readCases"
                                />
                            </div>
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
