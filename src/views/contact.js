import React from "react";
import $ from 'jquery';
import { Link } from "react-router-dom";

import Github from "../assets/images/contact/github.svg"
import Linkedin from "../assets/images/contact/linkedin.svg"
import Navigation from "../components/navigation"

const row = {
    width: '30%',
    padding: '24px 24px'
}
const title = {
    color: '#585858'
}

class Contact extends React.Component {

    state = {
        background: 0,
        timeLineHeight: $(document).height()
    }

    render() {
        return (

            <div id="parallaxScroll">
                <Navigation projects />
                <div id="HP_container" className='HP_container' >
                    <div style={{ margin: '5% 5%', paddingTop: '5%' }}>
                        <h5 style={{ width: '80%', marginBlockStart: '12px' }}>I deeply care about the human-technology relationship and aim to be part of the entity to define it. Careful research, creative experimentation, and data-driven iteration are at the heart of my design. My approach to questions always starts from answering the Why, then ideating the How, and eventually designing the What. 
                      <br /><br />
                      Here is a selection of my works for you to get to know me:
                        </h5>
                        <div className="threecolumn">
                            <div style={row}>
                                <p style={title}>Product design</p>

                                <Link target="_blank" className="AboutProj">
                                    <div className="AboutProj">
                                        <h4 style={{ marginBottom: '6px' }}>SmoothHire  </h4>
                                        <h6 style={{ marginTop: 0 }}>A job plarform designed to attract millennial technical talents. </h6>
                                    </div>
                                </Link>

                                <Link target="_blank" className="AboutProj">
                                    <div className="AboutProj">
                                        <h4 style={{ marginBottom: '6px' }}>Vogether</h4>
                                        <h6 style={{ marginTop: 0 }}> A social media to help people seek immediate attention.</h6>
                                    </div>
                                </Link>


                                <Link target="_blank" className="AboutProj">
                                    <div className="AboutProj">
                                        <h4 style={{ marginBottom: '6px' }}>Voice Design system  </h4>
                                        <h6 style={{ marginTop: 0 }}> A design system site helps create user experience</h6>
                                    </div>
                                </Link>
                            </div>



                            <div style={row}>
                                <p style={title}>Coding</p>


                                <a target="_blank" rel="noopener noreferrer" href="https://isabellawang0108.github.io/3Dprogramming/" className="AboutProj">
                                    <div className="AboutProj">
                                        <h4 style={{ marginBottom: '6px' }}>ML analogy</h4>
                                        <h6 style={{ marginTop: 0 }}> A simple game with 3D visual to let people experience Machine learning process.</h6>
                                    </div>
                                </a>


                                <a target="_blank" rel="noopener noreferrer" href="https://github.com/isabellaWang0108/flocker" className="AboutProj">
                                    <div className="AboutProj">
                                        <h4 style={{ marginBottom: '6px' }}>Flocker</h4>
                                        <h6 style={{ marginTop: 0 }}> A full-stack application helps solo travelers meet new people, based on common interests.</h6>
                                    </div>
                                </a>

                                <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/getawarehealth/id1507236576" className="AboutProj">
                                    <div className="AboutProj">
                                        <h4 style={{ marginBottom: '6px' }}>AwareHealth</h4>
                                        <h6 style={{ marginTop: 0 }}> A GDPR compliant mental well-being platform using React Native, AWS, Cognito, Amplify, Redux.</h6>
                                    </div>
                                </a>




                            </div>

                            <div style={row}>
                                <p style={title}>Passion projects</p>


                                <Link to="Thesis" target="_blank" className="AboutProj">
                                    <div className="AboutProj">
                                        <h4 style={{ marginBottom: '6px' }}>Thesis </h4>
                                        <h6 style={{ marginTop: 0 }}> My one year's research project on discovering Human-Technology relationship.</h6>
                                    </div>
                                </Link>


                                <Link to="venture" target="_blank" className="AboutProj">
                                    <div className="AboutProj">
                                        <h4 style={{ marginBottom: '6px' }}>Alwa</h4>
                                        <h6 style={{ marginTop: 0 }}> My startup venture on helping people to thrive in their lives. </h6>
                                    </div>
                               </Link>
                            </div>

                        </div>
                        <div style={{alignContent:'center',textAlign:'center', width:'100%'}}>
                            <h5 style={{ marginBottom: 0 }}>Happy to connect !</h5>
                            <a style={{ color: 'black', fontSize: '16px', textDecoration: 'none', marginTop: 0 }} href="mailto:wangxbella0108@gmail.co">
                                <p style={{ marginTop: 0 }}>wangxbella0108@gmail.com</p></a>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <a href="https://github.com/isabellawang0108" style={{ marginRight:'36px' }}>
                                    <img style={{ width: '36pt' }} src={Github} alt="icon"></img>
                                </a>

                                <a href="https://www.linkedin.com/in/isabella-wang-310181149/">
                                    <img style={{ width: '36pt' }} src={Linkedin} alt="icon"></img>
                                </a>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        );

    }
}

export default Contact;