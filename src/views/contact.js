import React from "react";
import $ from 'jquery';

import LandingPageAnimation from "../components/landingPageAnimation"
import Github from "../assets/images/contact/github.png"
import Linkedin from "../assets/images/contact/linkedin.png"
import Navigation from "../components/navigation"
import Goback from "../components/back"

const windowHeight = {
    height: window.innerWidth < 990 ? window.innerHeight * 1.1 : window.innerHeight,
    minHeight: 600,
    position: 'relative',
}
const row = {
    marginLeft: '10%',
    marginTop: 24
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

                <Goback />
                    {/* contact */}
                    <div style={windowHeight} className="sessionContainer white contactPart">

                        <div id="contactPart">

                            <div style={row}>
                                <h2 className="pink"> wangxbella0108@gmail.com</h2>
                                <h2 className="pink"> +1 (908) 391 – 6750</h2>
                            </div>

                            <div style={row}>
                                <a href="https://github.com/isabellaWang0108">
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
                <div id="backgrounds">
                    <LandingPageAnimation backgroundNmb={this.state.background} />
                </div>

            </div >
        );

    }
}

export default Contact;