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
import InpageContactMe from "../../../components/inpage_contactme"


class Kiosk extends React.Component {

    content = [
        { title: "Overview", id: "section1" },
        { title: "Product/UX alignment", id: "section2" },
        { title: "Research/Learning", id: "section3" },
        { title: "Prototyping", id: "section4" },
        { title: "Iterations", id: "section5" },
        { title: "Testing", id: "section6" },
        { title: "Delivery", id: "section7" },
        { title: "Post-deployment learning", id: "section8" },
    ]



    turnPink = (theclass) => {
        $("." + theclass + " button").css("font-weight", "bold")
            .css("border", "solid 1px #BDBBBE")
    }
    neutral = () => {
        $("li button").css("font-weight", "normal")
            .css("border", "solid 1px transparent")
    }

    scrollCheck() {

        // for all the item in the menu except for the last one\
        for (var i = 1; i < this.content.length; i++) {
            if ($("#section" + i).position().top < 0 && $("#section" + (i + 1)).position().top > 0) {
                this.neutral();
                this.turnPink('p' + i);
                //open backtotop button after scrolling
                if (i >= 2) {
                    $('#back2Top').css("display", "inherit");
                } else {
                    $('#back2Top').css("display", "none");
                }
            }

        }

        // for the last item in the menu
        if ($("#section" + (this.content.length)).position().top < 0) {
            this.neutral();
            this.turnPink('p' + i);
        }
    }

    menuItem(val) {
        const selectPosition = $("#section" + val).position().top;
        const scrollposition = $('.page-container').scrollTop();
        $('.page-container').animate({ scrollTop: selectPosition + scrollposition }, 100);
    }

    handleScroll = e => {
        e.preventDefault();
        this.scrollCheck();
    }


    render() {
        return (
            <div className="page-container" onScroll={this.handleScroll}>
                {/* navigation bar  */}
                <NavigationBar
                    projects
                />
                <Back2Top onClick={() => $('.page-container').animate({ scrollTop: 0 }, 100)} />
                <div >

                    {/*contect itself ==============================================================================================                  */}
                    <ContentLayout>
                        <h1 id="title">Automating Office Check-in</h1>

                        <div className="inpage_hero_container">
                            <div className="inpage_hero_box">
                                <ProjectContext duration="1 month" team="1 PM, 5 engineers, 1 designer" role="Designer"></ProjectContext>
                                <p>
                                    The Kiosk Check-in project showcases my design approach when physical interaction and multiple devices are involved. The end-to-end experience involves various devices, different platforms and products across the company. Please contact me for the full story and design.
                                </p>
                                <a href="https://apps.apple.com/us/app/vts-activate-kiosk/id1670460075" target="_blank" rel="noopener noreferrer" >
                                    <p>Available on App Store.</p>
                                </a>
                            </div>
                            <div className="inpage_hero_box">
                                <img src={Pic1} className="inpage_hero_img" alt="img" />
                            </div>
                        </div>

                        {/* menu bar ==============================================================================================  */}
                        <div className="animated slideInDown content-block left-nav">
                            {/* menu */}
                            <ul>Content
                                {this.content.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => this.menuItem(index + 1)} className={"p" + (index + 1)}>
                                            <button className="inpage_menu_item">{item.title}</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="content-block" id="section1">
                            <h2>Overview</h2>
                            <p><span className="bold">Outcome</span>: This project introduces a self-service visitor management kiosk that streamlines the check-in process, freeing up valuable time for front desk staff.</p>

                            <p>For this project, my workflow revisited product and UX alignment heavily due to the engineering specifics and the need to collaborate with designers from other teams.    </p>
                            <img alt="prototype" width="100%" src={Pic2} />
                        </div>


                        <div className="content-block" id="section2">
                            <h2 >Product/UX alignment</h2>
                            <p>I utilized user flow as an efficient tool to align the UX and vision with engineers, PMs, and designers from other teams.
                                The total experience involves 4 user categories:
                            </p>
                            <ul>
                                <li>
                                    <span className="bold">Office visitors</span> will check in using a QR code sent by the office admin through email.
                                </li>
                                <li>
                                    <span className="bold">System admins</span> register the kiosk device.
                                </li>
                                <li>
                                    <span className="bold">Front-desks</span>  register visitors and set up the kiosk itself (I took charge of this flow).
                                </li>
                                <li>
                                    <span className="bold">Office workers</span>  register and send their visitors QR codes.
                                </li>
                            </ul>
                            <img alt="prototype" width="100%" src={Pic3} />
                        </div>

                        <div className="content-block" id="section3">
                            <h2>Research</h2>
                            <p>Below is a compilation of findings I got from user research, design critiques, and hands-on experimentation with devices.</p>

                            <h3>1. QR code scanning convention</h3>
                            <p>Many users have established mental models of using QR codes, particularly in the post-COVID era, so it’s crucial to replicate familiar interactions rather than introduce entirely novel ones. </p>
                            <img alt="prototype" width="100%" src={Pic4} />


                            <h3>2. Physical blind spot</h3>
                            <p>
                                When putting a phone in front of an iPad, there are blind spots on the screen due to physical overlapping. It’s important to understand what screen areas are visible to users so they can see the visual feedback to accomplish necessary tasks.
                            </p>
                            <img alt="prototype" width="100%" src={Pic5} />

                            <h3>3. UI that reflects physical distance </h3>
                            <p>
                                It’s helpful to know the exact size at which the QR code appears on camera to design a UI that effectively guides users on distance.    </p>
                            <img alt="prototype" width="100%" src={Pic6} />
                        </div>


                        <div className="content-block" id="section4">
                            <h2>Prototyping</h2>
                            <p>
                                I explored various UI layouts, interaction elements, and visual design options for every screen in the complete flow. The screenshot below demonstrates the breadth of exploration.
                            </p>

                            <img alt="prototype" width="100%" src={Pic7} />
                        </div>

                        <div className="content-block" id="section5">
                            <h2>Iterations</h2>
                            <p>I'll present selected screens to demonstrate my iterations.</p>
                            <p>
                                Below is a summary of all prerequisites:
                            </p>
                            <ol>
                                <li>
                                    The camera cannot always be active due to power constraints; hence, a tap-to-activate feature is inevitable.
                                </li>
                                <li>
                                    Companies must be able to customize their background image.
                                </li>
                            </ol>
                            <img alt="prototype" width="100%" src={Pic8} />

                            <h3>No room for illegibility risk.  </h3>
                            <p>
                                The first design poses illegibility risks based on the customer’s image selection.
                            </p>
                            <img alt="prototype" width="100%" src={Pic9} />


                            <h3>Function over branding</h3>
                            <p>
                                The iterated design solves the illegibility issue, but it places a strong emphasis on the image over text and buttons, which misaligned with the product’s primary purpose.  </p>
                            <br />
                            <img alt="prototype" width="100%" src={Pic10} />

                            <h3>The better design broke the design system</h3>
                            <p>
                                I developed a new design that not only enhances visual appeal but also meets all functional requirements. However, it breaks our design system by introducing a specific use-case scenario, making it a significant decision for the team.
                            </p>
                            <img alt="prototype" width="100%" src={Pic11} />
                        </div>

                        <div className="content-block" id="section6">
                            <h2>Testing</h2>
                            <p>
                                I decided to use data to determine whether the benefits of breaking the design system justify the potential risks.
                            </p>
                            <img alt="prototype" width="100%" src={Pic12} />
                            <p>In the test, we set up 2 criteria to determine which design to go with: usability and preference.</p>

                            <h3>Test 1: Usability</h3>
                            <p>
                                In the usability test, we assigned users the following task for each design: “Activate the QR scanner.”
                                Design B won on both interaction accuracy and the time taken to perform the task.
                            </p>
                            <img alt="prototype" width="100%" src={Pic13} />

                            <h3>Test 2: Preference</h3>
                            <p>
                                We simply asked users which design they prefer. Design B was a clear winner here as well.
                            </p>
                            <img alt="prototype" width="100%" src={Pic14} />
                            <p className="bold">With the result of user testing, we moved forward with Design B. </p>

                        </div>

                        <div className="content-block" id="section7">
                            <h2>Delivery</h2>
                            <p>Below are the final screens for the initial successful office visitors QR code scanning flow, which ideally occurs every time.</p>
                            <img alt="prototype" width="100%" src={Pic15} />

                            <h3>Error states</h3>
                            <p>Things don’t always go smoothly, and we need to be ready for all the possible errors.</p>
                            <img alt="prototype" width="100%" src={Pic16} />

                            <h3>Responsive design</h3>
                            <p>
                                The iPad can be used in both horizontal and vertical orientations. It’s important to have a design that clearly communicates these requirements to the engineering team.
                            </p>
                            <img alt="prototype" width="100%" src={Pic17} />

                        </div>

                        <div className="content-block" id="section8">
                            <h2>Learning after deployment</h2>
                        </div>
                        <p>After deploying the product into beta testing, we received two reports on scenarios we hadn't anticipated. This experience revealed the critical edge cases that needed to be addressed.</p>
                        <img alt="prototype" width="100%" src={Pic18} />

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