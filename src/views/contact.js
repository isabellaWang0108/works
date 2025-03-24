import React from "react";
import $ from 'jquery';

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
                        <p style={{ width: '80%', maxWidth: 900 }}>I deeply care about the human-technology relationship and aim to be part of the entity to define it. In-depth research, creative experimentation, and data-driven iteration are at the heart of my design. My approach to questions always starts from answering the Why, ideating the How, and eventually designing the What.
                            <br /><br />
                            Below is a selection of my works for you to get to know me:
                        </p>
                        
                        <div style={{ alignContent: 'center', textAlign: 'center', width: '100%', marginTop: 24 }}>
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