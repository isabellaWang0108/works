import React, { useRef, useMemo } from "react";
import $ from 'jquery';
import "../../css/index.css"
import { Canvas, useFrame } from 'react-three-fiber'
import niceColors from 'nice-color-palettes'
import * as THREE from 'three'

import Labeling from "../../components/labeling"
import NavigationBar from "../../components/navigation"

import Thesis from "../../assets/images/home/thesis.png"
import DesignSystem from "../../assets/images/home/ds.png"
// import Vogether from "../../assets/images/vogether/2-record.gif"
import ProductStudio from "../../assets/images/home/ProductStudio.svg"
import Voice from "../../assets/images/home/voice.svg"
import PinkButton from "../../components/pinkButton"

import Github from "../../assets/images/contact/github.svg"
import Linkedin from "../../assets/images/contact/linkedin.svg"


const windowHeight = {
    height: window.innerWidth < 990 ? window.innerHeight * 1.2 : window.innerHeight,
    minHeight: 600,
    position: 'relative',
}


const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const colors = new Array(1000).fill().map(() => niceColors[13][Math.floor(Math.random() * 5)])


function Boxes() {
    const colorArray = useMemo(() =>
        Float32Array.from(new Array(1500).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), []
    )

    const ref = useRef()

    useFrame(state => {
        const time = state.clock.getElapsedTime()
        ref.current.position.x = Math.sin(time / 4) * 2
        ref.current.position.y = Math.sin(time / 2)
        ref.current.rotation.x += .007
        ref.current.rotation.y += .007

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

    render() {
        return (


            <div id="parallaxScroll" >

                {/* navigation bar */}
                <NavigationBar href="#contactPart" contact />
                <div id="HomapageTopNavi" style={{ backgroundColor: ' linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))' }}></div>

                <div id="HP_container" className='black HP_container' >



                    {/* landing page */}
                    <div style={windowHeight} className="black sessionContainer" >
                        <div id="landingPart">
                            <div className='landingpage_Intro animate__animated animate__fadeInLeft'>

                                I design, code, and iterate based on the research.

                            </div>


                        </div>
                        <Canvas
                            style={{ position: 'fixed', right: '0px', top: '0px', width: window.innerWidth > 450 ? "60%" : "100%", zIndex: 1, }}
                            camera={{ position: [3, 5, 15] }}
                        >
                            <ambientLight color="#FFFFFF" />
                            <pointLight position={[150, 150, 150]} intensity={0.8} />
                            <Boxes />
                        </Canvas>
                    </div>


                    {/* Thesis Campy */}
                    <div id="Thesis" className="black sessionContainer bg-yellow" style={windowHeight}>

                        <div className="contentblock">
                            <Labeling
                                time="Thesis"
                                color='black'
                            />
                            <h1>What will we become, now that life means living with computers?</h1>
                            <p>This is a one-year research and self-exploration journey that ultimately defined my passion and research interest.
                                <br />
                                <PinkButton
                                    innerLink={true}
                                    label="See works"
                                    link="thesis"

                                />
                            </p>
                        </div>
                        <div className="imgBlock">
                            <img src={Thesis} alt="thesis" className="campy img" />
                        </div>
                    </div>

                    {/* Desigin system */}
                    <div id="Design-system" className="black sessionContainer reverse bg-white" style={windowHeight}>

                        <div className="contentblock">
                            <Labeling
                                time="Professional specialty"
                                color='black'
                            />
                            <h1>Building a typography system</h1>
                            <p>Through my three years of professional working experience, I have developed my specialty in product design -- Design Systems. This case study is one of my work at VTS.
                                <br />
                                <PinkButton
                                    innerLink={true}
                                    label="Read details"
                                    link="design-system"

                                />
                            </p>
                        </div>
                        <div className="imgBlock">
                            <img src={DesignSystem} alt="design system" className="ds img" />
                        </div>
                    </div>




                    {/* Voice */}
                    <div id="Voice" className="black sessionContainer bg-purple" style={windowHeight}>

                        <div className="contentblock">
                            <Labeling
                                time="Product design"
                                color='black'
                            />
                            <h1>Designing an NFT creation feature for everyday users</h1>
                            <p>This case study demonstrates my workflow in a generic product design project. It is selected from my projects at Voice.
                                <br />
                                <PinkButton
                                    innerLink={true}
                                    label="Read more"
                                    link="voice"

                                />
                            </p>
                        </div>
                        <div className="imgBlock">
                            <img src={Voice} alt="voice" className="img" />
                        </div>
                    </div>




                    {/* awareHealth */}
                    {/* <div id="awareHealth" className="black sessionContainer awareHealth" style={windowHeight} >

                        <div className="contentblock awareHealthText" >
                            <Labeling
                                time="Fullstack engineering"
                                color="black"
                            />
                            <h1>Developed my first go-to-production mobile app</h1>
                            <p>
                                At AwareHealth, I worked as a front-end engineer developed the authentication, chatting, community features of a GDPR compliant <a href="https://apps.apple.com/us/app/getawarehealth/id1507236576" target="_blank" rel="noopener noreferrer">mental well-being platform</a> using React Native, AWS, Cognito, Amplify, Redux.
                            </p>
                        </div>

                        <div className="contentblock">
                            <img src={AwareHealth} style={{ width: '100%' }} alt="voice"></img>
                        </div>

                    </div> */}




                    {/* product studio */}
                    <div id="ProductStudio" className="black sessionContainer reverse bg-smokewhite" style={windowHeight} >
                        <div className="contentblock">
                            <Labeling
                                time="Product discovery"
                                color="black"
                            />
                            <h1>How to hire millennial technical talents?</h1>
                            <p>
                                This is a four-month product challenge given by the US Department of Defense when I joined product studio as a designer at Cornell Tech.
                                <br />
                                <PinkButton
                                    innerLink={true}
                                    label="See process"
                                    link="product-studio"
                                />
                            </p>
                        </div>
                        <div className="imgblock">
                            <img src={ProductStudio} className="DODCornellImg" alt="ProductStudio"></img>
                        </div>
                    </div>



                    {/* contact */}
                    <div style={windowHeight} id="Contact" className="sessionContainer contactPart">
                        <div id="contactPart">

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <a href="https://github.com/isabellawang0108" style={{ marginRight: '36pt' }}>
                                    <img style={{ width: '36pt' }} src={Github} alt="icon"></img>
                                </a>

                                <a href="https://www.linkedin.com/in/isabella-wang-310181149/">
                                    <img style={{ width: '36pt' }} src={Linkedin} alt="icon"></img>
                                </a>
                            </div>
                            <div className="black">
                                <h2> wangxbella0108@gmail.com</h2>
                                <h2> +1 (908) 391 – 6750</h2>
                            </div>
                        </div>
                    </div>



                </div>

            </div >
        );

    }
}

export default Homepage;
