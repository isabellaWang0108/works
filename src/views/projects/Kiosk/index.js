import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import Pic1 from "../../../assets/images/Kiosk/img_01.png"
import Pic2 from "../../../assets/images/Kiosk/img_02.svg"
import Pic3 from "../../../assets/images/Kiosk/img_03.png"
import Pic4 from "../../../assets/images/Kiosk/img_04.png"
import Pic5 from "../../../assets/images/Kiosk/img_05.png"
import Pic6 from "../../../assets/images/Kiosk/img_06.png"
import Pic7 from "../../../assets/images/Kiosk/img_07.png"
import Pic8 from "../../../assets/images/Kiosk/img_08.png"
import Pic9 from "../../../assets/images/Kiosk/img_09.png"
import Pic10 from "../../../assets/images/Kiosk/img_10.png"
import Pic11 from "../../../assets/images/Kiosk/img_11.png"
import Pic12 from "../../../assets/images/Kiosk/img_12.png"
import Pic13 from "../../../assets/images/Kiosk/img_13.png"
import Pic14 from "../../../assets/images/Kiosk/img_14.png"
import Pic15 from "../../../assets/images/Kiosk/img_15.png"
import Pic16 from "../../../assets/images/Kiosk/img_16.png"
import Pic17 from "../../../assets/images/Kiosk/img_17.png"
import Pic18 from "../../../assets/images/Kiosk/img_18.png"
import Pic19 from "../../../assets/images/Kiosk/img_19.png"
import InpageContactMe from "../../../components/inpage_contactme"


class Kiosk extends React.Component {

    content = [
        { title: "My Design Flow", id: "section1" },
        { title: "Picking the Tech", id: "section2" },
        { title: "Cross-functional Collaborate", id: "section3" },
        { title: "Findings", id: "section4" },
        { title: "Design Iterations", id: "section5" },
        { title: "A/B Testing", id: "section6" },
        { title: "Delivered Design", id: "section7" },
        { title: "Reflection", id: "section8" },
    ]



    turnPink = (theclass) => {
        $("." + theclass + " button").css("font-weight", "normal")
            .css("border", "solid 1px #BDBBBE")
            .css("background", "rgba(255, 140, 196, 0.12)")
    }
    neutral = () => {
        $("li button").css("font-weight", "normal")
            .css("border", "solid 1px transparent")
            .css("background", "transparent")
    }

    scrollCheck() {
        const activeOffset = 120;
        let activeSection = 1;
        for (var i = 1; i <= this.content.length; i++) {
            const section = $("#section" + i);
            if (section.length && section.position().top <= activeOffset) {
                activeSection = i;
            }
        }

        this.neutral();
        this.turnPink('p' + activeSection);
        $('#back2Top').css("display", activeSection >= 2 ? "inherit" : "none");
    }

    menuItem(val) {
        const selectPosition = $("#section" + val).position().top;
        const scrollposition = $('.page-container').scrollTop();
        this.neutral();
        this.turnPink('p' + val);
        $('#back2Top').css("display", val >= 2 ? "inherit" : "none");
        $('.page-container').animate({ scrollTop: selectPosition + scrollposition }, 100, () => this.scrollCheck());
    }

    handleScroll = e => {
        e.preventDefault();
        this.scrollCheck();
    }


    render() {
        return (
            <div className="page-container project-page" onScroll={this.handleScroll}>
                {/* navigation bar  */}
                <NavigationBar
                    projects
                />
                <Back2Top onClick={() => $('.page-container').animate({ scrollTop: 0 }, 100)} />
                <div >

                    {/*contect itself ==============================================================================================                  */}
                    <ContentLayout>
                        <h1 id="title" className="fade-in">Automating Office Check-in</h1>
                        <div className="badgeRow" style={{ marginTop: 8 }}>
                            <span className="projectBadge">Hardware integration</span>
                            <span className="projectBadge">IoT</span>
                            <span className="projectBadge">B2B</span>
                            <span className="projectBadge">Usability</span>
                        </div>

                        <div className="inpage_hero_container fade-in">
                            <div className="inpage_hero_box">
                                <ProjectContext duration="1 month" team="1 PM, 5 engineers, 1 designer" role="Designer"></ProjectContext>
                                <p>
                                    This project introduced a self-service visitor kiosk to make office check-in faster, reduce front desk workload, and improve the guest experience. I designed the flow, validated key usability tradeoffs, and created a polished iPad experience that could work in real office environments.
                                    <br />
                                    <a href="https://apps.apple.com/us/app/vts-activate-kiosk/id1670460075" target="_blank" rel="noopener noreferrer" >
                                        Available on App Store.
                                    </a>
                                </p>

                            </div>
                            <div className="inpage_hero_box">
                                <img src={Pic1} className="inpage_hero_img" alt="img" />
                            </div>
                        </div>

                        {/* menu bar ==============================================================================================  */}
                        <div className="animated slideInDown content-block left-nav">
                            {/* menu */}
                            <ul>
                                <p className="left_nav_title">Content</p>
                                {this.content.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => this.menuItem(index + 1)} className={"p" + (index + 1)}>
                                            <button className="inpage_menu_item">{item.title}</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="content-block fade-in" id="section1">
                            <h2>My Design Flow</h2>
                            <img alt="prototype" className="images" src={Pic2} />
                        </div>

                        <div className="content-block" id="section2">
                            <h2>Picking the Tech</h2>
                            <p>I participated in strategic discussions to ensure user experience was a consideration in selecting technologies for the self-check-in process. The team explored options like facial recognition and ID scanning, but ultimately chose QR code check-in via an iPad stand—balancing usability with business constraints.</p>
                            <img alt="prototype" className="images png" src={Pic19} />
                        </div>

                        <div className="content-block" id="section3">
                            <h2 >Cross-functional Collaboration</h2>
                            <p>I used user flows chart as an efficient tool to align UX and product vision across engineers, PMs, and cross-functional designers. By stripping away visuals, user flows helped focus the team on core ideas, and because they’re accessible, everyone could contribute to shaping the experience.
                            </p>

                            <img alt="prototype" className="images png" src={Pic3} />
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Findings</h2>
                            <p>I did secondary researches to find out design convention, technical limitation, and accessibility guidance before jumping straight into prototyping.</p>
                            <h3>Finding 1: QR Code Scanning is Familiar — No Education Needed in the Primary Flow. </h3>
                            <img alt="prototype" className="images png" src={Pic4} />


                            <h3>Finding 2: Phone Placement Can Obstruct Key Visual Feedback on the iPad. </h3>
                            <img alt="prototype" className="images png" src={Pic5} />

                            <h3>Finding 3: UI needs to Reflect Physical Distance. </h3>
                            <img alt="prototype" className="images png" src={Pic6} />
                        </div>


                
                        <div className="content-block" id="section5">
                            <h2>Design Iterations</h2>
                            <p>I have selected a few key iterations to showcase my design decision-making process and how I approach problem-solving.</p>
                          
                            <img alt="prototype" width="100%" src={Pic8} />

                            <h3>No Room for Illegibility Risk.  </h3>
                            <p>
                            Since clients can customize background image, it introduces potential accessibility challenges in the design.
                            </p>
                            <img alt="prototype" width="100%" src={Pic9} />


                            <h3>Reflecting the Product Value: Function over Branding</h3>
                            <p>
                                The iterated design solves the illegibility issue, but it places a strong emphasis on the image over text and buttons, which misaligned with the product’s primary purpose.  </p>
                            <br />
                            <img alt="prototype" width="100%" src={Pic10} />

                            <h3>Design Trade-off: Design System Compliance vs Usability</h3>
                            <p>
                            I designed a solution that enhanced visual appeal and met all functional requirements, but it introduced a one-off use case that diverged from our design system. To support this decision, I relied on A/B testing results as evidence.
                            </p>
                            <img alt="prototype" width="100%" src={Pic11} />
                        </div>

                        <div className="content-block" id="section6">
                            <h2>A/B Testing</h2>
                            <img alt="prototype" width="100%" src={Pic12} />             
                            <h3>Test 1: Usability</h3>
                            <p>
                                In the usability test, I assigned users the following task for each design: “Activate the QR scanner.”
                                Design B won on both interaction accuracy and the time taken to perform the task.
                            </p>
                            <img alt="prototype" width="100%" src={Pic13} />

                            <h3>Test 2: Preference</h3>
                            <p>
                                I simply asked users which design they prefer. Design B was a clear winner here as well.
                            </p>
                            <img alt="prototype" width="100%" src={Pic14} />
                            <h3>With the result of user testing, I moved forward with Design B.</h3>
                            <img alt="prototype" width="100%" src={Pic18} />
                        </div>

                        <div className="content-block" id="section7">
                            <h2>Delivered Design</h2>
                            <p>Below are the final screens for the initial successful office visitors QR code scanning flow, which ideally occurs every time.</p>
                            <img alt="prototype" width="100%" src={Pic15} />

                            <h3>Error states</h3>
                            <p>Things don’t always go smoothly, and we need to be ready for all the possible errors.</p>
                            <img alt="prototype" width="100%" src={Pic16} />

                            <h3>Responsive design</h3>
                            <p>
                                The iPad can be used in both horizontal and vertical orientations. 
                            </p>
                            <img alt="prototype" width="100%" src={Pic17} />

                        </div>

                        <div className="content-block" id="section8">
                            <h2>Reflection</h2>
                        </div>
                        <p>This project improves check-in efficiency, but it comes with security trade-offs. It assumes guests have no malicious intent, yet the iPad alone cannot prevent someone from bypassing the process and entering the office uninvited. A more future-forward solution would integrate the iPad with the door system—granting access only after a successful passcode scan, directly enhancing security.</p>
                        <p>This experience reinforced that successful kiosk design must balance convenience, security, and physical context, not just visual polish.</p>

                        <div className="content-block" >
                            <InpageContactMe />
                        </div>


                    </ContentLayout>

                </div>
            </div>
        );
    }
}

export default Kiosk;
