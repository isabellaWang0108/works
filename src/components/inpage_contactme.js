import React, { Component } from "react";
import Github from "../assets/images/contact/github.svg"
import Linkedin from "../assets/images/contact/linkedin.svg"
import Email from "../assets/images/contact/email.svg"
import Button from "./myButton"


class InpageContactMe extends Component {

    render() {
        return (
            <div className="inpage-contact-card">
                <div>
                    <p className="inpage-contact-kicker">Next step</p>
                    <h2>Contact Me!</h2>
                    <p className="inpage-contact-copy">Interested in the thinking behind this work or want to chat about AI product design? I am happy to connect.</p>
                </div>
                <div className="contact_me_inpage">
                    <div className="icons">
                        <a href="mailto:wangxbella0108@gmail.com" aria-label="Email Isabella">
                            <img src={Email} alt="email icon"></img>
                        </a>
                        <a href="https://github.com/isabellawang0108" aria-label="GitHub">
                            <img src={Github} alt="github icon"></img>
                        </a>

                        <a href="https://www.linkedin.com/in/isabella-wang-310181149/" aria-label="LinkedIn">
                            <img src={Linkedin} alt="linkedin icon"></img>
                        </a>
                    </div>

                    <Button
                        innerLink={false}
                        label="See other projects"
                        link="/#professionalW"
                        onClick={() =>( window.history.back())}
                        className="inpage-contact-button"
                    />
                </div>
            </div>


        )
    }

}

export default InpageContactMe;
