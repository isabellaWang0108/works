import React, { useRef, useMemo } from "react";
import $ from 'jquery';
import "../../css/index.css"
import { Canvas, useFrame } from 'react-three-fiber'
import niceColors from 'nice-color-palettes'
import * as THREE from 'three'

import TimeStamp from "../../components/timeStampInHP"
import NavigationBar from "../../components/navigation"
// import LandingPageAnimation from "../../components/landingPageAnimation"

import CampyBG from "../../assets/images/home/CampyBG.svg"
import Campy from "../../assets/images/home/logoCampy.gif"
import Vogether from "../../assets/images/vogether/2-record.gif"
// import Thesis from "../../assets/images/home/Thesis.svg"
import Venture from "../../assets/images/home/venture.png"
import VentureBG from "../../assets/images/home/ventureBG.svg"
import DODCornell from "../../assets/images/home/DODCornell.svg"
import Copyright from "../../assets/copyright/home_copyright.json"
import Voice from "../../assets/images/home/voice.svg"
import AwareHealth from "../../assets/images/home/awareHealth.svg"
import PinkButton from "../../components/pinkButton"

import Github from "../../assets/images/contact/github.svg"
import Linkedin from "../../assets/images/contact/linkedin.svg"
import ReactGA from 'react-ga';


const windowHeight = {
    height: window.innerWidth < 990 ? window.innerHeight * 1.2 : window.innerHeight,
    minHeight: 600,
    position: 'relative',
}
const row = {
    marginLeft: '10%',
    marginTop: '12px'
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

    componentDidMount() {
        ReactGA.initialize('UA-148443721-2', { testMode: true });
        ReactGA.pageview(window.location.pathname + window.location.search);

    }

    cursorMove() {
        console.log('hi')
    }

    render() {
        return (


            <div id="parallaxScroll" onMouseMove={this.cursorMove.bind(this)}>

                {/* navigation bar */}
                <NavigationBar href="#contactPart" contact />
                <div id="HomapageTopNavi" style={{ backgroundColor: ' linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))' }}></div>

                <div id="HP_container" className='black HP_container' >



                    {/* landing page */}
                    <div style={windowHeight} className="black sessionContainer landingPart" >
                        <div id="landingPart">
                            <div className='landingpage_Intro animate__animated animate__fadeInLeft'>

                               I am a product person who designs, codes, and iterates based on the research.

                            </div>


                        </div>
                        <Canvas
                            style={{ position: 'fixed', right: '0px', top: '0px', width: '60%', zIndex: 1 }}
                            // gl={{ antialias: false, alpha: false }}
                            camera={{ position: [3, 5, 15] }}
                        // onCreated={({ gl }) => gl.setClearColor('lightpink')}
                        >
                            <ambientLight color="#FFFFFF" />
                            <pointLight position={[150, 150, 150]} intensity={0.8} />
                            <Boxes />
                        </Canvas>
                    </div>

                    {/* Voice */}
                    <div id="voice" className="black sessionContainer voice" style={windowHeight} >
                        <div className="imgBlock">
                            <img src={Voice} style={{ width: '100%' }} alt="voice"></img>
                        </div>
                        <div className="textBlock">
                            <TimeStamp
                                time="Product design"
                                color="black"
                            />
                            <h3>Leading design on three products</h3>
                            <p>
                                I am a product designer at Voice, charging the <a href="https://voice.com/" target="_blank" rel="noopener noreferrer">Voice app</a>'s creation feature, internal process documentation site and <a href="https://design-system.voiceuxdesigns.com" rel="noopener noreferrer" target="_blank">design system</a>.
                            </p>
                        </div>

                    </div>




                    {/* awareHealth */}
                    <div id="awareHealth" className="black sessionContainer awareHealth" style={windowHeight} >

                        <div className="contentblock awareHealthText" >
                            <TimeStamp
                                time="Fullstack engineering"
                                color="black"
                            />
                            <h3>Developed my first go-to-production mobile app</h3>
                            <p>
                                At AwareHealth, I worked as a front-end engineer developed the authentication, chatting, community features of a GDPR compliant <a href="https://apps.apple.com/us/app/getawarehealth/id1507236576" target="_blank" rel="noopener noreferrer">mental well-being platform</a> using React Native, AWS, Cognito, Amplify, Redux.
                            </p>
                        </div>

                        <div className="contentblock">
                            <img src={AwareHealth} style={{ width: '100%' }} alt="voice"></img>
                        </div>

                    </div>




                    {/* product studio */}
                    <div id="DODCornell" className="black sessionContainer DODCornell" style={windowHeight} >
                        <div className="contentblock">
                            <img src={DODCornell} className="DODCornellImg" alt="DODCornell"></img>
                        </div>
                        <div className="contentblock">
                            <TimeStamp
                                time="Product management"
                                color="black"
                            />
                            <h3>{Copyright.dodCornell.title}</h3>
                            <p>
                                {Copyright.dodCornell.content}
                                <br />
                                <PinkButton
                                    onClick={() => {
                                        console.log('product studio from homeBlock')
                                        ReactGA.event({
                                            category: 'direct to link',
                                            action: 'product studio from homeBlock'
                                        })
                                    }}
                                    innerLink={true}
                                    label="See process"
                                    link={Copyright.dodCornell.link}
                                />
                            </p>
                        </div>

                    </div>

                    {/* Thesis Campy */}
                    <div id="Thesis" className="black sessionContainer" style={windowHeight}>

                        <div className="contentblock">
                            <TimeStamp
                                time="Thesis"
                                color='black'
                            />
                            <h3 >Research on technology for designers</h3>
                            <p>{Copyright.thesis.content}
                                <br />
                                <PinkButton
                                    onClick={() => {
                                        console.log('thesis from homeBlock')
                                        ReactGA.event({
                                            category: 'direct to link',
                                            action: 'thesis from homeBlock'
                                        })
                                    }}
                                    innerLink={true}
                                    label="Documentation"
                                    link="thesis"

                                />
                            </p>
                        </div>
                        <div className="contentblock">
                            <img src={Campy} alt="campy" className="campy img" />
                        </div>
                        <img src={CampyBG} style={{ position: 'absolute', top: 0, left: -60 }} className={CampyBG} alt="campyBG"></img>
                    </div>




                    {/* startup studio */}
                    <div id="Venture" className="black sessionContainer" style={windowHeight}>


                        <div className="contentblock">
                            <img src={Venture} alt="venture" className="img ventureImg"></img>
                        </div>

                        <div className="contentblock">
                            <TimeStamp
                                time="Entrepreneur"
                                color="black"
                            />
                            <h3 >{Copyright.venture.title}</h3>
                            <p >
                                {Copyright.venture.content}
                            </p>
                            <PinkButton
                                onClick={() => {
                                    console.log('venture from homeBlock')
                                    ReactGA.event({
                                        category: 'direct to link',
                                        action: 'venture from homeBlock'
                                    })
                                }}
                                innerLink={true}
                                label="Read insights"
                                link="venture"
                            />
                        </div>
                        <img src={VentureBG} style={{ bottom: 0, left: 0, position: 'absolute', opacity: 1 }} className={VentureBG} alt="VentureBG"></img>

                    </div>



                    {/* Vogether */}
                    <div id="Vogether" className="white sessionContainer" style={windowHeight}>
                        <div className="contentblock">
                            <TimeStamp
                                time={Copyright.vogether.time}
                                color="white"
                            />
                            <h3 style={{ color: 'white' }}>{Copyright.vogether.title}</h3>
                            <p style={{ color: 'white' }}>
                                {Copyright.vogether.content}
                            </p>
                            <PinkButton
                                onClick={() => {
                                    console.log('Vogetherfrom homeBlock')
                                    ReactGA.event({
                                        category: 'direct to link',
                                        action: 'Vogetherfrom from homeBlock'
                                    })
                                }}
                                innerLink={true}
                                label="View project"
                                link={Copyright.vogether.link}
                            />
                        </div>
                        <div className="contentblock" style={{ overflow: 'hidden' }}>
                            <img src={Vogether} alt="vogether" className="img ventureImg"></img>
                        </div>
                    </div>




                    {/* contact */}
                    <div style={windowHeight} id="Contact" className="sessionContainer white contactPart">
                        <div id="contactPart">

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <a href="https://github.com/isabellawang0108" style={{ marginRight: '36pt' }}>
                                    <img style={{ width: '36pt' }} src={Github} alt="icon"></img>
                                </a>

                                <a href="https://www.linkedin.com/in/isabella-wang-310181149/">
                                    <img style={{ width: '36pt' }} src={Linkedin} alt="icon"></img>
                                </a>
                            </div>
                            <div style={row}>
                                <h2> wangxbella0108@gmail.com</h2>
                                <h2> +1 (908) 391 – 6750</h2>
                            </div>
                        </div>
                    </div>



                </div>
                {/* <div id="backgrounds">
                    <LandingPageAnimation backgroundNmb={this.state.background} />
                </div> */}

            </div >
        );

    }
}

export default Homepage;
