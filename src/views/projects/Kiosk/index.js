import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import Pic1 from "../../../assets/images/Kiosk/img_01.svg"
import Pic2 from "../../../assets/images/Kiosk/img_02.svg"
import Pic3 from "../../../assets/images/Kiosk/img_03.svg"
import Pic4 from "../../../assets/images/Kiosk/img_04.svg"
import Pic5 from "../../../assets/images/Kiosk/img_05.svg"
import Pic6 from "../../../assets/images/Kiosk/img_06.svg"
import Pic7 from "../../../assets/images/Kiosk/img_07.jpg"
import Pic8 from "../../../assets/images/Kiosk/img_08.svg"
import Pic9 from "../../../assets/images/Kiosk/img_09.svg"
import Pic10 from "../../../assets/images/Kiosk/img_10.svg"
import Pic11 from "../../../assets/images/Kiosk/img_11.svg"
import Pic12 from "../../../assets/images/Kiosk/img_12.svg"
import Pic13 from "../../../assets/images/Kiosk/img_13.svg"
import Pic14 from "../../../assets/images/Kiosk/img_14.svg"
import Pic15 from "../../../assets/images/Kiosk/img_15.svg"


class Kiosk extends React.Component {

    content = [
        { title: "Overview", id: "section1" },
        { title: "Product/UX alignment", id: "section2" },
        { title: "Research", id: "section3" },
        { title: "Prototyping", id: "section4" },
        { title: "Testing", id: "section5" },
        { title: "Delivery", id: "section6" }
    ]



    turnPink = (theclass) => {
        $("." + theclass + " a").css("color", "#FC2293")
            .css("font-weight", "bold")
    }
    neutral = () => {
        $("li a").css("color", "black")
            .css("text-decoration", "none")
            .css("font-weight", "normal")
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
                        <h1 id="title">Kiosk Check-In</h1>
                        <p>
                            The Kiosk Check-In project showcases my design approach when physical interaction and multiple devices are involved. The end-to-end experience involves various devices, different platforms and products across the company.
                        </p>
                        <p>
                            Please contact me for the full story and design.
                        </p>
                        <ProjectContext duration="1.5 months" team="1 PM, 5 engineers, 1 designer, other teams" role="designer"></ProjectContext>
                        <img src={Pic1} />

                        {/* menu bar ==============================================================================================  */}
                        <div className="animated slideInDown content-block left-nav">
                            {/* menu */}
                            <ul>Content
                                {this.content.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => this.menuItem(index + 1)} className={"p" + (index + 1)}>
                                            <a >{item.title}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="content-block" id="section1">
                            <h2>Overview</h2>
                            <p><span className="bold">Goal</span>: Design a check-in experience for office visitors at the front desk.</p>
                            <p><span className="bold">Specifics</span>:</p>
                            <ol>
                                <li>
                                    Office visitors will check in using a QR code sent by the office admin through email.
                                </li>
                                <li>
                                    The kiosk app launches on an iPad, which is supported by an iPad stand at the office entrance.
                                </li>
                                <li>
                                    There may or may not be a front-desk representative present near the kiosk.
                                </li>
                            </ol>
                            <p>For this project, my workflow revisited product and UX alignment heavily due to the engineering specifics and the need to collaborate with designers from other teams. In general, I followed the standard UX design steps. Since the project had very detailed predetermined specifics—such as using a QR code for check-in on the iPad—wireframing was not involved in the process.
                            </p>
                            <img src={Pic2} />
                        </div>

                        <div className="content-block" id="section2">
                            <h2 >Product/UX alignment</h2>
                            <p>I utilized user flow as an efficient tool to align the UX and vision with engineers, PMs, and designers from other teams.
                                <br /> The total experience involves 4 user categories:
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
                            <img src={Pic3} />
                        </div>

                        <div className="content-block" id="section3">
                            <h2>Research</h2>

                            <h3>QR code scanning convention</h3>
                            <p>Many users have established mental models of using QR codes, particularly in the post-COVID era, so it’s crucial to replicate familiar interactions rather than introduce entirely novel ones. From my secondary research, I found: </p>
                            <ol>
                                <li>
                                    Users understand what QR codes are.
                                </li>
                                <li>
                                    Most users are familiar with the interaction of aligning a QR code to a scanner.
                                </li>
                                <li>
                                    Finding the optimal distance between the iPad and phone can be challenging for users; visual feedback is essential for success.
                                </li>
                                <li>
                                    The average QR code measures 1 inch by 1 inch.
                                </li>
                                <li>
                                    The ideal scanning distance is typically a 1:10 ratio; however, due to engineering constraints, engineers recommend a distance of 5 inches.
                                </li>
                            </ol>
                            <img src={Pic4} />


                            <h3>Physical blind spot</h3>
                            <p>
                                When putting a phone in front of an iPad, there are blind spots on the screen due to physical overlapping. It’s important to understand what screen areas are visible to users so they can see the visual feedback to accomplish necessary tasks.
                            </p>
                            <img src={Pic5} />

                            <h3>UI that reflects physical distance </h3>
                            <p>
                                It’s important to determine the exact size at which the QR code appears on camera to design a UI that effectively guides users on distance.
                            </p>
                            <img src={Pic6} />
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Prototyping</h2>
                            <p>
                                I explored various UI layouts, interaction elements, and visual design options for every screen in the complete flow. The screenshot below demonstrates the breadth of exploration, and I'll present a detailed case study on my design decision making process.
                            </p>
                            <img width="100%" src={Pic7} />

                            <h3>Deciding the design for the “Activating QR reader” screen</h3>
                            <p>
                                For the sake of portfolio simplicity, I have skipped presenting designs that focus on aligning functional requirements or are subtle variations of one another.
                            </p>
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
                                <li>
                                    Logos and addresses need to be displayed.
                                </li>
                                <li>
                                    The welcome message should include the company name.
                                </li>
                                <li>
                                    The design needs to follow the existing design system.
                                </li>
                            </ol>
                            <img src={Pic8} />

                            <h3>Dropping designs E & F due to potential illegibility issues. </h3>
                            <p>
                                All interactive elements and key messages must remain legible, especially when clients have the ability to customize images. Design E and F risk making buttons and messages illegible based on the images clients select. Although overlays can help mitigate this problem, they are not the ideal solution.
                            </p>
                            <img src={Pic9} />
                            <br />
                            <h3>Function over branding</h3>
                            <p>
                                Design C places a strong emphasis on the image over text and buttons compared to other designs. Its primary purpose is to signal to visitors that this is a greeting screen and prompt them to take action, so we dropped C for priority reasons.
                            </p>
                            <br />
                            <h3>Minimal Information Load</h3>
                            <p>
                                This screen is encountered in an office environment where visitors are not solely focused on the display, as they have numerous distractions. Design D incorporates more information and requires brand integration for the QR code and tap-to-open instructions. Ideally, the design should minimize distractions.
                            </p>
                        </div>

                        <div className="content-block" id="section5">
                            <h2>Testing</h2>
                            <p>
                                The team liked the remaining two designs equally. Both met the branding customization requirements, so we set them up for A/B testing to determine which one users prefer.
                            </p>
                            <img src={Pic10} />
                            <p>In the test, we set up 2 criteria to determine which design to go with usability and preference</p>

                            <h3>Usability</h3>
                            <p>
                                In the usability test, we assigned users the following task for each design: “Activate the QR scanner.”
                                Design B won on both interaction accuracy and the time taken to perform the task.
                            </p>
                            <img src={Pic11} />

                            <h3>Preference</h3>
                            <p>
                                We simply asked users which design they prefer. Design B was a clear winner here as well.
                            </p>
                            <img src={Pic12} />
                            <p className="bold">With the result of user testing, we moved forward with Design B. </p>

                        </div>
                        <div className="content-block" id="section6">
                            <h2>Delivery</h2>
                            <p>Below are the final screens for the initial successful office visitors QR code scanning flow, which ideally occurs every time.</p>
                            <img src={Pic13} />

                            <h3>Error states</h3>
                            <p>Things don’t always go smoothly and we need to be ready for all the possible errors.</p>
                            <img src={Pic14} />

                            <h3>Responsive design</h3>
                            <p>
                                The iPad can be used in both horizontal and vertical orientations. It’s important to have a design that clearly communicates these requirements to the engineering team.
                            </p>
                            <img src={Pic15} />
                        </div>
                    </ContentLayout>

                </div>
            </div>
        );
    }
}

export default Kiosk;