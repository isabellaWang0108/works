import React from "react";
import $ from 'jquery';
import { Link } from "react-router-dom";

import Github from "../assets/images/contact/github.svg"
import Linkedin from "../assets/images/contact/linkedin.svg"
import Navigation from "../components/navigation"

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
                    <div className="black" style={{ margin: '5% 5%', padding: "72px 0px" }}>
                        <h2>About me</h2>
                        <p style={{ width: '80%', maxWidth:900 }}>I deeply care about the human-technology relationship and aim to be part of the entity to define it. In-depth research, creative experimentation, and data-driven iteration are at the heart of my design. My approach to questions always starts from answering the Why, ideating the How, and eventually designing the What.
                            <br /><br />
                            Below is a selection of my works for you to get to know me:
                        </p>
                        <div className="threecolumn">
                            <div className="threecolumn-row">
                                <h2>Design projects</h2>

                                <Link target="_blank" className="AboutProj">
                                    <p className="AboutProj-content">
                                        <b>Typography system</b>
                                        <br />
                                        A case study on building a design system.
                                    </p>
                                </Link>

                                <Link target="_blank" className="AboutProj">
                                    <p className="AboutProj-content">
                                        <b>NFT creation feature </b>
                                        <br />
                                        A case study on designing a product feature for an NFT Marketplace.
                                    </p>
                                </Link>


                                <Link target="_blank" className="AboutProj">
                                    <p className="AboutProj-content">
                                        <b>Reimagining the recruitement UX</b>
                                        <br />
                                        A product challenge about designing a better job hunting experience for millennial technical talents.
                                    </p>
                                </Link>
                            </div>



                            <div className="threecolumn-row">
                                <h2>Coding work</h2>


                                <a target="_blank" rel="noopener noreferrer" href="https://isabellawang0108.github.io/3Dprogramming/" className="AboutProj">
                                    <p className="AboutProj-content">
                                        <b>3D programming </b>
                                        <br />
                                        A simple interactive project to let users experience the black box in ML.
                                    </p>
                                </a>

                                <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/getawarehealth/id1507236576" className="AboutProj">
                                    <p className="AboutProj-content">
                                        <b>Mobile app development</b>
                                        <br />
                                        A GDPR compliant mental well-being platform using React Native, AWS, Cognito, Amplify, Redux.
                                    </p>
                                </a>

                            </div>

                            <div className="threecolumn-row">
                                <h2>Others</h2>

                                <Link to="thesis" target="_blank" className="AboutProj">
                                    <p className="AboutProj-content">
                                        <b>Thesis </b>
                                        <br />
                                        A one-year research project that defines my focus on the human-technology relationship.
                                    </p>
                                </Link>


                                <a href="https://www.linkedin.com/feed/update/urn:li:activity:6912159571595730944/" target="_blank" className="AboutProj">
                                    <p className="AboutProj-content">
                                        <b>Integrated system </b>
                                        <br />
                                        A home automation passion project that reflects the automation status quo.
                                    </p>
                                </a>

                                <a href="https://wangxbella0108.medium.com/ui-vs-logo-gradient-ec0f67d10e21" target="_blank" className="AboutProj">
                                    <p className="AboutProj-content">
                                        <b>Gradient research</b>
                                        <br />
                                        My featuring writing in my design research blogs.
                                    </p>
                                </a>
                            </div>

                        </div>
                        <div style={{ alignContent: 'center', textAlign: 'center', width: '100%' , marginTop:24}}>
                            <p style={{ marginBottom: 0 }}>Happy to connect !</p>
                            <a style={{ color: 'black', fontSize: '16px', textDecoration: 'none', marginTop: 0 }} href="mailto:wangxbella0108@gmail.co">
                                <p style={{ marginTop: 0 }}>wangxbella0108@gmail.com</p></a>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <a href="https://github.com/isabellawang0108" style={{ marginRight: '36px' }}>
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