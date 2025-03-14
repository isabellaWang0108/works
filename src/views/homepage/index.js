import React, { useRef, useMemo } from "react";
import $ from 'jquery';
import "../../css/index.css"
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'

import Labeling from "../../components/labeling"
import NavigationBar from "../../components/navigation"

import Anote from "../../assets/images/home/anote.png"
import DesignSystem from "../../assets/images/home/ds.png"
import Voice from "../../assets/images/home/voice.png"
import Kiosk_img from "../../assets/images/home/kiosk.png"
import Button from "../../components/myButton"
import Github from "../../assets/images/contact/github.svg"
import Linkedin from "../../assets/images/contact/linkedin.svg"
import { Link } from "react-router-dom";


const windowHeight = {
    height: window.innerWidth < 990 ? window.innerHeight * 1.2 : window.innerHeight,
    minHeight: 600,
    position: 'relative',
}



const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const colors = new Array(1000).fill().map(() => ["#555152", "#A8A8A8", "#161219", "#B24973"][Math.floor(Math.random() * 5)])


function Boxes() {
    const colorArray = useMemo(() =>
        Float32Array.from(new Array(1500).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), []
    )

    const ref = useRef()
    useFrame(state => {
        const time = state.clock.getElapsedTime()
        ref.current.position.x = Math.sin(time / 8) * 2
        ref.current.position.y = Math.sin(time / 2)
        ref.current.rotation.x += .002
        ref.current.rotation.y += .002

        let i = 0
        for (let x = 0; x < 10; x++)

            for (let y = 0; y < 10; y++)

                for (let z = 0; z < 10; z++) {
                    const id = i++
                    tempObject.position.set(5 - x, 5 - y, 5 - z)

                    tempObject.position.multiplyScalar(Math.sin(time) / 10 + 1.2)

                    tempObject.updateMatrix()
                    ref.current.setMatrixAt(id, tempObject.matrix)
                }
        ref.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={ref} args={[null, null, 1000]}>
            <sphereBufferGeometry args={[.3, 30, 30]} attach="geometry" >
                <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
            </sphereBufferGeometry>
            <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
        </instancedMesh>
    )
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
                            <div className='landingpage_Intro'>

                                I design, test, and iterate based on research.
                                <div> </div>

                                <Button
                                    underLined={false}
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
                            <hemisphereLight intensity={0.2} groundColor="#555" />
                            <pointLight position={[150, 150, 150]} intensity={0.1} />
                            <Boxes />
                        </Canvas>
                    </div>

                    <div id="professionalW" className="sessionContainer" style={{ height: '58pt', backgrounColor: 'rgb()', backdropFilter: 'blur(11px)' }}>
                        <h1>Professional work</h1>
                    </div>
                    <div className="projectRow">
                        {/* Kiosk */}
                        <div id="Kiosk" className="sessionContainer bg-kiosk">
                            <div className="contentblock">
                                <img src={Kiosk_img} alt="kiosk checkin" className="img" />
                            </div>
                            <div className="contentblock">

                                <h1 className="text-white">Kiosk Check-In </h1>
                                <p className="text-white">This project showcases my design approach when physical interaction and different hardware devices are involved.
                                    <br />

                                </p>
                            </div>
                            <div className="contentblock">
                                <Button
                                    underLined={true}
                                    label="Read the case"
                                    link="kiosk"
                                />
                            </div>

                        </div>


                        {/* Desigin system */}
                        <div id="Design-system" className="sessionContainer bg-ds">
                            <div className="contentblock">
                                <img src={DesignSystem} alt="design system" className="img" />
                            </div>
                            <div className="contentblock">
                                <h1>Design system</h1>
                                <p>This case study presents my experience and process in handling complex, big-scale, high-stakes design challenges that involve a broad spectrum of stakeholders.
                                    <br />

                                </p>
                            </div>
                            <div className="contentblock">
                                <Button
                                    underLined={true}
                                    label="Read the case"
                                    link="design-system"
                                />
                            </div>

                        </div>


                    </div>

                    <div className="projectRow">
                        {/* Voice */}
                        <div id="Voice" className="sessionContainer bg-voice" >
                            <div className="contentblock">
                                <img src={Voice} alt="voice" className="img" />
                            </div>

                            <div className="contentblock">
                                <h1>NFT creation feature</h1>
                                <p>This case study demonstrates my process in a general product development setting.
                                </p>
                            </div>

                            <div className="contentblock">
                                <Button
                                    underLined={true}
                                    label="Read the case"
                                    link="voice"
                                />
                            </div>


                        </div>



                        {/* Thesis Campy */}
                        <div id="Anote" className="sessionContainer bg-thesis">
                            <div className="contentblock">
                                <img src={Anote} alt="thesis" className="campy img" />
                            </div>
                            <div className="contentblock">
                                <h1>A futuristic website for an AI startup</h1>
                                <p> I developed the style strategy and designed a marketing website for an innovative AI startup to introduce their products.
                                </p>
                            </div>
                            <div className="contentblock">
                            
                                    <Button
                                        underLined={true}
                                        label="See the website"
                                        link="https://anote.ai/"
                                    />

                            </div>

                        </div>


                    </div>


                    {/* About Me */}
                    <div id="seeMore" className="sessionContainer" style={{ height: 'auto', position: 'relative' }} >
                        <div className="seeMore">
                            <h1>About me</h1>
                            <div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <a href="https://github.com/isabellawang0108" style={{ marginRight: '36pt' }}>
                                        <img style={{ width: '36pt' }} src={Github} alt="icon"></img>
                                    </a>

                                    <a href="https://www.linkedin.com/in/isabella-wang-310181149/">
                                        <img style={{ width: '36pt' }} src={Linkedin} alt="icon"></img>
                                    </a>
                                </div>
                            </div>
                            <p style={{ maxWidth: '700pt' }}>
                                I deeply care about the human-technology relationship and aim to be part of the entity to define it. In-depth research, creative experimentation, and data-driven iteration are at the heart of my design. My approach to questions always starts from answering the Why, ideating the How, and eventually designing the What.
                            </p>

                            <p>I have more work for you to get to know me:</p>

                            <div className="threecolumn">
                                <div className="threecolumn-row">
                                    <h2>AI relevent research</h2>

                                    <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@wangxbella0108/experiment-of-chatgpts-effects-on-decisions-confidence-399ae25c3ad1" className="AboutProj bg-seeMore">
                                        <p className="AboutProj-content">
                                            <b className="text-black">AI on decision making</b>
                                            <div> </div>
                                            This is a research project to understanding whether advice from AI has a comparable impact on decision-making or confidence levels in people.
                                        </p>
                                    </a>

                                    <a target="_blank" rel="noopener noreferrer" href="https://www.figma.com/proto/BGDErRAzTp8rVP3IySHUH4/GPT-Explanation?page-id=10%3A2&node-id=33-2&viewport=492%2C81%2C0.03&t=EmuS1i0dIl5eAal3-1&scaling=scale-down-width&content-scaling=fixed" className="AboutProj bg-seeMore">
                                        <p className="AboutProj-content">
                                            <b className="text-black">Visually explaining how ChatGPT works</b>
                                            <div> </div>
                                            This project provides a visualized, step-by-step explanation designed to help non-technical audient understand how ChatGPT works.
                                        </p>
                                    </a>

                                </div>


                                <div className="threecolumn-row">
                                    <h2>Passion projects</h2>


                                    <a href="https://www.linkedin.com/feed/update/urn:li:activity:6912159571595730944/" rel="noopener noreferrer" target="_blank" className="AboutProj bg-seeMore">
                                        <p className="AboutProj-content">
                                            <b className="text-black">Integrated system </b>
                                            <div> </div>
                                            A home automation passion project that reflects the automation status quo.
                                        </p>
                                    </a>
                                    <Link to="thesis" className="AboutProj">
                                        <p className="AboutProj-content">
                                            <b className="text-black">Thesis </b>
                                            <div> </div>
                                            A one-year research project that defines my focus on the human-technology relationship.
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Contact */}
                    <div id="seeMore" className="sessionContainer bg-seeMore" style={{ height: '300pt', position: 'relative' }} >
                        <div className="seeMore">
                            <h1>Haven’t seen enough?</h1>
                            <p>
                                DM me. I will show you more.
                                <br />
                            </p>
                            <Button
                                underLined={false}
                                label="Contact me"
                                link="mailto: wangxbella0108@gmail.com"
                            />
                        </div>
                    </div>


                </div>

            </div >
        );

    }
}

export default Homepage;



{/* product studio
                    <div id="ProductStudio" className="black sessionContainer reverse bg-cornell" style={windowHeight} >
                        <div className="contentblock">
                            <Labeling
                                time="Product research"
                                color="black"
                            />
                            <h1>How to hire millennial technical talents</h1>
                            <p>
                                This is a four-month product design challenge given by the US Department of Defense when I joined product studio as a designer at Cornell Tech.
                                <br />
                                <Button
                                    underLined={true}
                                    label="Read the case"
                                    link="product-studio"
                                />
                            </p>
                        </div>
                        <div className="imgblock">
                            <img src={ProductStudio} className="DODCornellImg" alt="ProductStudio"></img>
                        </div>
                    </div> */}
