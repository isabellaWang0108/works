import React, { Component } from "react";
import Github from "../assets/images/contact/github.svg"
import Linkedin from "../assets/images/contact/linkedin.svg"
import Email from "../assets/images/contact/email.svg"
import Button from "./myButton"


class InpageContactMe extends Component {

    render() {
        return (
            <>
                <h2>Contact Me!</h2>
                <div className="contact_me_inpage">
                    <div className="icons">
                        <a href="mailto:wangxbella0108@gmail.com">
                            <img style={{ width: '36pt', marginTop: '24pt' }} src={Email} alt="email icon"></img>
                        </a>
                        <a href="https://github.com/isabellawang0108">
                            <img style={{ width: '36pt', marginTop: '24pt' }} src={Github} alt="github icon"></img>
                        </a>

                        <a href="https://www.linkedin.com/in/isabella-wang-310181149/">
                            <img style={{ width: '36pt', marginTop: '24pt' }} src={Linkedin} alt="linkedin icon"></img>
                        </a>
                    </div>

                    <h3 className="bold" style={{ marginTop: '28pt', marginRight: '16pt' }}>or</h3>

                    <Button
                        innerLink={false}
                        label="See other projects"
                        link="/#professionalW"
                        onClick={() =>( window.history.back())}
                    />
                </div>
            </>


        )
    }

}

export default InpageContactMe;
