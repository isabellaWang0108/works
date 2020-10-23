import { Link } from "react-router-dom";
import ReactDOM from 'react-dom'
import React, { useState, Suspense, useRef, useMemo, useEffect } from "react";
import $ from 'jquery';
import "../../css/index.css"
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import niceColors from 'nice-color-palettes'
import * as THREE from 'three'

import TimeStamp from "../../components/timeStampInHP"
import TimeLine from "../../components/timeLine"
import NavigationBar from "../../components/navigation"
import Matrix from "../../assets/images/home/data.png"
// import LandingPageAnimation from "../../components/landingPageAnimation"

import CampyBG from "../../assets/images/home/CampyBG.svg"
import Campy from "../../assets/images/home/logoCampy.gif"
import Vogether from "../../assets/images/vogether/2-record.gif"
// import Thesis from "../../assets/images/home/Thesis.svg"
import Venture from "../../assets/images/home/venture.png"
import VentureBG from "../../assets/images/home/ventureBG.svg"
import DODCornell from "../../assets/images/home/DODCornell.svg"
import Copyright from "../../assets/copyright/home_copyright.json"

import PinkButton from "../../components/pinkButton"
import ArrowDown from "../../components/arrow"

import Github from "../../assets/images/contact/github.png"
import Linkedin from "../../assets/images/contact/linkedin.png"
import ReactGA from 'react-ga';

import IsabellaCursor from "../../assets/images/home/IsabellaCursor.png"
import SmoothHirecursor from '../../assets/images/home/smoothHirecursor.png'
import ThesisCursor from '../../assets/images/home/thesisCursor.png'
import ArrowCursor from "../../assets/images/home/arrowCursor.png"
import VogetherCursor from "../../assets/images/home/vogetherCursor.png"
import VentureCursor from "../../assets/images/home/ventureCursor.png"
import ContactCursor from "../../assets/images/home/contactCursor.png"


const windowHeight = {
    height: window.innerWidth < 990 ? window.innerHeight * 1.2 : window.innerHeight,
    minHeight: 600,
    position: 'relative',
}
const row = {
    marginLeft: '10%',
    marginTop: 24
}


const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const colors = new Array(1000).fill().map(() => niceColors[13][Math.floor(Math.random() * 5)])


function Boxes() {
    const [hovered, set] = useState()
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

    cursorEffect = e => {
        this.setState({
            top: e.pageY + 12,
            left: e.pageX + 12,

        })
        // if (e.pageY < $('#DODCornell').offset().top) {
        //     this.setState({
        //         cursorRotation: 'rotate(0deg)',
        //         cursorImg: null
        //     })
        // }
        if (e.pageY > $('#DODCornell').offset().top) {
            this.setState({
                cursorRotation: 'rotate(0deg)',
                cursorImg: SmoothHirecursor
            })
        }
        if (e.pageY > $('#Thesis').offset().top && e.pageY < $('#coder').offset().top) {
            this.setState({
                cursorRotation: 'rotate(0deg)',
                cursorImg: ThesisCursor
            })
        }
        if (e.pageY > $('#coder').offset().top && e.pageY < $('#Vogether').offset().top) {
            var xAxis = $("#dearTime").offset().left + window.innerWidth * .3 - e.pageX
            var yAxis = $("#dearTime").offset().top - window.innerHeight * .1 - e.pageY
            // angle of tangent
            var angle = Math.atan2(yAxis, xAxis) * 180 / Math.PI

            this.setState({
                cursorImg: ArrowCursor,
                cursorRotation: 'rotate(' + angle + 'deg)'
            })
        }
        if (e.pageY > $('#Vogether').offset().top && e.pageY < $('#Venture').offset().top) {
            this.setState({
                cursorRotation: 'rotate(0deg)',
                cursorImg: VogetherCursor
            })
        }
        if (e.pageY > $('#Venture').offset().top && e.pageY < $('#Contact').offset().top) {
            this.setState({
                cursorRotation: 'rotate(0deg)',
                cursorImg: VentureCursor
            })
        }

        if (e.pageY > $('#Contact').offset().top) {
            this.setState({
                cursorRotation: 'rotate(0deg)',
                cursorImg: IsabellaCursor
            })
        }
    }

    render() {
        return (


            <div id="parallaxScroll" onMouseMove={this.cursorEffect.bind(this)}>
                {/* the cursor */}
                {/* {window.innerWidth < 450 ? null : <img style={{
                    position: 'absolute',
                    width: 200,
                    height: 'auto',
                    zIndex: 999,
                    top: this.state.top,
                    left: this.state.left,
                    transform: this.state.cursorRotation
                }}
                    alt="cursorImg"
                    src={this.state.cursorImg}
                    >
                        </img>} */}

                {/* navigation bar */}
                <NavigationBar href="#contactPart" contact />
                <div id="HomapageTopNavi" style={{ backgroundColor: 'white', opacity: '.4' }}></div>
                <TimeLine height={this.state.timeLineHeight} />


                <div id="HP_container" className='black HP_container' >



                    {/* landing page */}
                    <div style={windowHeight} className="black sessionContainer landingPart" >
                        <div id="landingPart">
                            <div className='landingpage_Intro animate__animated animate__fadeInLeft'>
                       
                              Hello - I'm a product designer who with full-stack programming experience
                          
                            </div>


                        </div>
                        <Canvas
                            style={{ position: 'fixed', right: '0px', top: '0px', width: '60%' }}
                            // gl={{ antialias: false, alpha: false }}
                            camera={{ position: [3, 5, 15] }}
                            // onCreated={({ gl }) => gl.setClearColor('lightpink')}
                        >
                            <ambientLight color="#FFFFFF" />
                            <pointLight position={[150, 150, 150]} intensity={0.8} />
                            <Boxes />
                        </Canvas>
                    </div>

                    {/* product studio */}
                    <div id="DODCornell" className="black sessionContainer DODCornell" style={windowHeight} >
                        <div className="contentblock">
                            <img src={DODCornell} className="DODCornellImg" alt="DODCornell"></img>
                        </div>
                        <div className="contentblock">
                            <TimeStamp
                                time={Copyright.dodCornell.time}
                                color="black"
                            />
                            <div className='HP_Intro'>{Copyright.dodCornell.title}</div>
                            <div className='HP_descrip'>
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
                            </div>
                        </div>

                    </div>

                    {/* Thesis Campy */}
                    <div id="Thesis" className="black sessionContainer" style={windowHeight}>

                        <div className="contentblock">
                            <TimeStamp
                                time={Copyright.thesis.time}
                                color='black'
                            />
                            <div className='HP_Intro' > {Copyright.thesis.title}</div>
                            <div className='HP_descrip'>{Copyright.thesis.content}
                                <br />
                                <PinkButton
                                    onClick={() => {
                                        console.log('thesis from homeBlock')
                                        ReactGA.event({
                                            category: 'direct to link',
                                            action: 'thesis from homeBlock'
                                        })
                                    }}
                                    innerLink={false}
                                    label="See product"
                                    link={Copyright.thesis.link}

                                />
                            </div>
                        </div>
                        <div className="contentblock">
                            <img src={Campy} alt="campy" className="campy img" />
                        </div>
                        <img src={CampyBG} style={{ position: 'absolute', top: 0, left: -60 }} className={CampyBG} alt="campyBG"></img>
                    </div>


                    {/* Fullstack coding */}
                    <div id="coder" className="black " style={windowHeight}>
                        {/* <div className="sessionContainer"> */}

                        <TimeStamp
                            time={Copyright.coder.time}
                            color="white"
                        />
                        <div className='HP_Intro coder' >{Copyright.coder.title}</div>
                        <div className='HP_descrip coder'>
                            <div className="indentInCoder"><span className="greyCode codeDefineIndent">var NewTechnologies</span> = [Javascript, Node.js, React.js, Bootstrap,Firebase, MySQL, MongoDB, Express.js, Chai.js, Mocha.js]
                            </div>
                            <br />
                            <div>
                                <div className="indentInCoder yellowCode"> <span className="greyCode codeDefineIndent">var Projects</span> <span className="pinkCode">=</span>
                                        [<br />
                                    <br />
                                        &#123;name: "Flocker", type: ‘Matching app’,
                                        <a className="greenCode" rel="noopener noreferrer"
                                        target="_blank"
                                        href="https://github.com/isabellawang0108/flocker"
                                        onClick={() => {
                                            console.log('flocker from homeBlock')
                                            ReactGA.event({
                                                category: 'direct to link',
                                                action: 'flocker from homeBlock'
                                            })
                                        }}>link</a>&#125;,</div>
                                <br />
                                <div className="indentInCoder yellowCode" id="dearTime"> &#123;name: "DearTime", type: "UX engineering",
                                <a className="greenCode" rel="noopener noreferrer"
                                        target="_blank"
                                        onClick={() => {
                                            console.log('dearTime from homeBlock')
                                            ReactGA.event({
                                                category: 'direct to link',
                                                action: 'dearTime from homeBlock'
                                            })
                                        }}
                                        href="https://github.com/isabellawang0108/dearTime"
                                    >link</a>&#125;,</div>
                                <br />
                                <div className="indentInCoder yellowCode"> &#123;name: "Bamazon", type: "Cli app",
                                 <a className="greenCode" rel="noopener noreferrer"
                                        target="_blank"
                                        onClick={() => {
                                            console.log('bamazon from homeBlock')
                                            ReactGA.event({
                                                category: 'direct to link',
                                                action: 'bamazon from homeBlock'
                                            })
                                        }}
                                        href="https://github.com/isabellawang0108/Bamazon_Cli_App"
                                    >link</a> &#125;</div>
                                <br />
                                <div className="indentInCoder yellowCode">]</div>
                                <br />
                            </div>
                            {

                                <div>
                                    {
                                        Copyright.coder.content.map((item, i) => {
                                            if (i % 2) {
                                                return <span className="greyCode" key={i}> {item} </span>

                                            }
                                            else {
                                                return item
                                            }
                                        })
                                    }

                                </div>
                            }

                        </div>
                        {/* </div> */}
                    </div>


                    {/* Vogether */}
                    <div id="Vogether" className="white sessionContainer" style={windowHeight}>
                        <div className="contentblock">
                            <TimeStamp
                                time={Copyright.vogether.time}
                                color="white"
                            />
                            <div className='HP_Intro' >{Copyright.vogether.title}</div>
                            <div className='HP_descrip' >
                                {Copyright.vogether.content}
                            </div>
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


                    {/* startup studio */}
                    <div id="Venture" className="black sessionContainer" style={windowHeight}>

                        <div className="contentblock">
                            <TimeStamp
                                time={Copyright.venture.time}
                                color="black"
                            />
                            <div className='HP_Intro' >{Copyright.venture.title}</div>
                            <div className='HP_descrip' >
                                {Copyright.venture.content}
                            </div>
                            <PinkButton
                                onClick={() => {
                                    console.log('venture from homeBlock')
                                    ReactGA.event({
                                        category: 'direct to link',
                                        action: 'venture from homeBlock'
                                    })
                                }}
                                innerLink={false}
                                label="Read insights"
                                link={Copyright.venture.link}
                            />
                        </div>
                        <div className="contentblock">
                            <img src={Venture} alt="venture" className="img ventureImg"></img>
                        </div>
                        <img src={VentureBG} style={{ bottom: 0, left: 0, position: 'absolute', opacity: 1 }} className={VentureBG} alt="VentureBG"></img>

                    </div>



                    {/* contact */}
                    <div style={windowHeight} id="Contact" className="sessionContainer white contactPart">
                        <div id="contactPart">

                            <div style={row}>
                                <h2 className="pink"> wangxbella0108@gmail.com</h2>
                                <h2 className="pink"> +1 (908) 391 – 6750</h2>
                            </div>

                            <div style={row}>
                                <a href="https://github.com/isabellawang0108">
                                    <img src={Github} alt="icon"></img>
                                </a>
                            </div>

                            <div style={row}>
                                <a href="https://www.linkedin.com/in/isabella-wang-310181149/">
                                    <img src={Linkedin} alt="icon"></img>
                                </a>
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
