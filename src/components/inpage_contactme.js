import React, { Component } from "react";
import Linkedin from "../assets/images/contact/linkedin.svg"
import Email from "../assets/images/contact/email.svg"

const RESUME_URL = "https://drive.google.com/file/d/1scc8XYAKv6EB3kbu5vvYko-CKHW35W3-/view?usp=sharing";

class InpageContactMe extends Component {

    render() {
        const showResumeButton = this.props.showProjectsButton === false;

        return (
            <div className="inpage-contact-card">
                <div className="inpage-contact-text">
                    <h2>Let’s connect.</h2>
                    <p>AI-augmented designer turing ambiguity into 0→1 launch-ready products and scalable systems.</p>
                </div>
                <div className="contact_me_inpage">
                    <a href="https://www.linkedin.com/in/isabella-wang-310181149/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <img src={Linkedin} alt="" aria-hidden="true"></img>
                        <span>LinkedIn</span>
                    </a>
                    <a href="mailto:wangxbella0108@gmail.com" aria-label="Email Isabella">
                        <img src={Email} alt="" aria-hidden="true"></img>
                        <span>Email</span>
                    </a>
                    {showResumeButton && (
                        <a
                            href={RESUME_URL}
                            aria-label="Resume"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="site-nav-link bold pink"
                        >
                            <span>Resume</span>
                        </a>
                    )}
                </div>
            </div>


        )
    }

}

export default InpageContactMe;
