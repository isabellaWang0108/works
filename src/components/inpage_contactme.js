import React, { Component } from "react";
import { Link } from "react-router-dom";
import Linkedin from "../assets/images/contact/linkedin.svg"
import Email from "../assets/images/contact/email.svg"

const RESUME_URL = "https://drive.google.com/file/d/1scc8XYAKv6EB3kbu5vvYko-CKHW35W3-/view?usp=sharing";

class InpageContactMe extends Component {

    render() {
        const showOtherProjects = this.props.showProjectsButton !== false;
        const finalButtonLabel = showOtherProjects ? "Other Projects" : "Resume";
        const rememberProjectsTarget = () => {
            sessionStorage.setItem("homepageScrollTarget", "projectsPart");
            sessionStorage.removeItem("homepageScrollPosition");
        };

        return (
            <div className="inpage-contact-card">
                <div className="inpage-contact-text">
                    <h2>Let’s connect.</h2>
                    <p>AI product design, systems, and clearer workflows.</p>
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
                    {showOtherProjects ? (
                        <Link
                            to="/"
                            className="contact-primary-action"
                            aria-label="View other projects on the homepage"
                            onClick={rememberProjectsTarget}
                        >
                            <span>{finalButtonLabel}</span>
                        </Link>
                    ) : (
                        <a
                            href={RESUME_URL}
                            aria-label="Resume"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>{finalButtonLabel}</span>
                        </a>
                    )}
                </div>
            </div>


        )
    }

}

export default InpageContactMe;
