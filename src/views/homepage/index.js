import React from "react";
import $ from 'jquery';
import "../../css/index.css"
import { Canvas } from "@react-three/fiber";
// import * as THREE from 'three'

import NavigationBar from "../../components/navigation"
import Animation3D from '../../components/animation3D'

import Anote from "../../assets/images/home/anote.png"
import DesignSystem from "../../assets/images/home/ds.png"
import Voice from "../../assets/images/home/voice.png"
import Kiosk_img from "../../assets/images/home/kiosk.png"
import Button from "../../components/myButton"
import UnderlineBtn from "../../components/underLinedBtn"
import Github from "../../assets/images/contact/github.svg"
import Linkedin from "../../assets/images/contact/linkedin.svg"
import { Link } from "react-router-dom";


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
        timeLineHeight: $(document).height()
    }


    componentDidMount() {
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

                <div id="HP_container" className='HP_container' >



                    {/* landing page */}
                    <div style={windowHeight} className="sessionContainer" >
                        <div id="landingPart" >
                            <div className='landingpage_Intro fade-in'>
                          Designing Thoughtful, Scalable, and Efficient UX
                                
                                <h3 style={{letterSpacing:.25, lineHeight:1.8}}> 
                                I'm passionate about designing products that make life easier, with a focus on systemic sustainability, efficient user patterns, and context-aware accessibility.

                                </h3>
                                <div> </div>
                                <Button
                                    innerLink={false}
                                    label="See my work"
                                    onClick={() =>
                                        document.getElementById("professionalW")?.scrollIntoView({
                                            behavior: "smooth",
                                        })
                                    }
                                />
                            </div>

                        </div>
                        <Canvas
                            style={{ zIndex: 1, position: 'fixed', right: '0px', top: '0px', width: window.innerWidth > 780 ? "60%" : "100%" }}
                            camera={{ position: [3, 5, 15] }}
                        >
                            <hemisphereLight intensity={.7} groundColor="#555" />
                            <pointLight position={[50, 0, 0]} intensity={10} />
                            <Animation3D />
                        </Canvas>
                    </div>

                    <div id="professionalW" style={{ display: 'flex', flexDirection: 'column', width: '100vw', position: 'relative', margin: '24px auto 2px auto', alignItems: 'center', zIndex: 100, background: '#7c7c7c1f', backdropFilter: 'blur(11px)' }}>
                        <h1>Professional work</h1>
                    </div>
                    <div className="projectRow">
                        {/* Kiosk */}
                        <div id="Kiosk" className="sessionContainer bg-project-card">
                            <div className="contentblock">
                                <img src={Kiosk_img} alt="kiosk checkin" className="img" />
                            </div>
                            <div className="contentblock">

                                <h1 className="text-white">Automating Office Check-in </h1>
                                <p className="text-white">This project reduced reliance on front desk staff and improved operational efficiency by revamping end-to-end service design to enable visitor self check-in.
                                    <br />

                                </p>
                            </div>
                            <div className="contentblock">
                                <UnderlineBtn
                                    innerLink={true}
                                    label="Read the case"
                                    link="kiosk"
                                    className="readCases"
                                />
                            </div>

                        </div>


                        {/* Desigin system */}
                        <div id="Design-system" className="sessionContainer bg-project-card">
                            <div className="contentblock">
                                <img src={DesignSystem} alt="design system" className="img" />
                            </div>
                            <div className="contentblock">
                                <h1>Building a design system</h1>
                                <p>This case study presents my experience and process in handling complex, big-scale, high-stakes design challenges that involve a broad spectrum of stakeholders.
                                    <br />

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


                    </div>

                    <div className="projectRow">
                        {/* Voice */}
                        <div id="Voice" className="sessionContainer bg-project-card" >
                            <div className="contentblock">
                                <img src={Voice} alt="voice" className="img" />
                            </div>

                            <div className="contentblock">
                                <h1>Lower the NFT creation barrier</h1>
                                <p>I designed an NFT marketplace aimed at empowering emerging artists from ground up.
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



                        {/* Anote*/}
                        <div id="Anote" className="sessionContainer bg-project-card">
                            <div className="contentblock">
                                <img src={Anote} alt="thesis" className="campy img" />
                            </div>
                            <div className="contentblock">
                                <h1>A futuristic website for an AI startup</h1>
                                <p> I developed the style strategy and designed a marketing website for an innovative AI startup to introduce their products.
                                </p>
                            </div>
                            <div className="contentblock ">

                                <UnderlineBtn
                                    innerLink={false}
                                    label="See the website"
                                    link="https://anote.ai/"
                                    className="readCases"
                                />
                            </div>

                        </div>


                    </div>

                    {/* <div id="professionalW" style={{ display: 'flex', flexDirection: 'column', width: '100vw', position: 'relative', margin: '24px auto 2px auto', alignItems: 'center', zIndex: 100, background: '#7c7c7c1f', backdropFilter: 'blur(11px)' }}> */}


                    {/* About Me */}
                    <div id="seeMore" className="sessionContainer" style={{ height: 'auto', position: 'relative', background: '#7c7c7c1f', backdropFilter: 'blur(11px)' }} >
                        <div className="seeMore">

                            <h1>About me</h1>
                            <div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/isabellawang0108" style={{ marginRight: '36pt' }}>
                                        <img style={{ width: '36pt' }} src={Github} alt="icon"></img>
                                    </a>

                                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/isabella-wang-310181149/">
                                        <img style={{ width: '36pt' }} src={Linkedin} alt="icon"></img>
                                    </a>
                                </div>
                            </div>
                            <p style={{ maxWidth: '700pt' }}>
                                I deeply care about the human-technology relationship and aim to be part of the entity to define it. In-depth research, creative experimentation, and data-driven iteration are at the heart of my design. My approach to questions always starts from answering the Why, ideating the How, and eventually designing the What.
                            </p>

                            <p>Contact me:{' '}<a href="mailto:wangxbella0108@gmail.com" target="_blank" rel="noopener noreferrer" >wangxbella0108@gmail.com</a></p>
                        </div>
                    </div>
                    <div className="sessionContainer" style={{ height: 'auto', position: 'relative' }} >
                        <div className="seeMore">

                            <div className="threecolumn">
                                <div className="threecolumn-row">
                                    <h2>AI relevent research</h2>

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
                                    <h2>Passion projects</h2>


                                    <a href="https://medium.com/@wangxbella0108/how-smart-to-be-a-smart-home-d4c53322e1ff" rel="noopener noreferrer" target="_blank" className="AboutProj bg-seeMore">
                                        <div className="AboutProj-content">
                                            <div className="text-black bold" style={aboutCardSpacing}>Integrated system</div>
                                            <div className="text-black" style={aboutCardSpacing}> This is a blogging post on my home automation project. I have reflected my thoughts on IoT's status quo in my writing.</div>
                                        </div>
                                    </a>
                                    <p> </p>

                                    <Link to="thesis" className="AboutProj">
                                        <div className="AboutProj-content">
                                            <div className="text-black bold" style={aboutCardSpacing}>Digital art</div>
                                            <div className="text-black" style={aboutCardSpacing}>  This is a one-year art project that captures my opinions on the human-technology relationship.</div>
                                        </div>
                                    </Link>
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

