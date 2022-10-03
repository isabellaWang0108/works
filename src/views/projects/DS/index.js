import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import Pic1 from "../../../assets/images/DesignSystem/ds_pic1.jpg"
import Pic2 from "../../../assets/images/DesignSystem/ds_pic2.svg"
import Pic3 from "../../../assets/images/DesignSystem/ds_pic3.png"
import Pic4 from "../../../assets/images/DesignSystem/ds_pic4.svg"
import Pic5 from "../../../assets/images/DesignSystem/ds_pic5.png"
import Pic6 from "../../../assets/images/DesignSystem/ds_pic6.png"
import Pic7 from "../../../assets/images/DesignSystem/ds_pic7.png"
import Pic8 from "../../../assets/images/DesignSystem/ds_pic8.png"
import Pic9 from "../../../assets/images/DesignSystem/ds_pic9.svg"
import Pic10 from "../../../assets/images/DesignSystem/ds_pic10.svg"
import Pic11 from "../../../assets/images/DesignSystem/ds_pic11.svg"
import Pic12 from "../../../assets/images/DesignSystem/ds_pic12.svg"
import Pic13 from "../../../assets/images/DesignSystem/ds_pic13.png"
import Pic14 from "../../../assets/images/DesignSystem/ds_pic14.png"
import Pic15 from "../../../assets/images/DesignSystem/ds_pic15.png"
import Pic16 from "../../../assets/images/DesignSystem/ds_pic16.png"
class DS extends React.Component {

    content = [
        { title: "Defining the problems", id: "section1" },
        { title: "My goal and process", id: "section2" },
        { title: "Finding the solutions", id: "section3" },
        { title: "The solution", id: "section4" },
        { title: "Technical implementation", id: "section5" },
        { title: "Soft implementation", id: "section6" },
        { title: "The biggest challenge", id: "section7" },
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
                        <h1 id="title">Building an enterprise design system </h1>
                        <p>Through my three years of professional working experience, I have developed my specialty -- Design Systems. A design system streamlines the design-engineering hand-off process, sets the building blocks for scalablility, and unifies the design from the front end. </p>
                        <p>Checkout my design system works:
                            <br />
                            <b>VTS design system</b>: <a href="https://terra.vts.com" target="_blank">terra.vts.com</a>
                            <br />
                            <b>Voice design system</b>: <a href="https://design-system.voiceuxdesigns.com/" target="_blank">design-system.voiceuxdesigns.com/</a>
                        </p>

                        <div className="content-block">
                            <h2>Typography system case study</h2>
                            <ProjectContext duration="> 1 year" team="2 engineers, 2 designers" role="designer/part-time engineer"></ProjectContext>
                            <p>I selected my Typography system at VTS as a case study, to display my work’s process, outcomes, and challenges.
                                My job was to:</p>
                            <ul>
                                <li>Unify the components across 4+ products.</li>
                                <li>Create a sustainable and scalable component library.</li>
                                <li>Educate and persuade designers and engineers to adopt the new system  of building the typography system. </li>
                            </ul>
                            <img src={Pic1} width="100%" />
                        </div>
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
                            <h2>Defining the problem</h2>
                            <h3>1. Auditing</h3>
                            <p>Auditing let me know what is out there, so I can have a better sense of the issues’ scope and come up with more targeted solutions.
                                I archived all the typography styles and usages across the products in a spreadsheet as part of the process.</p>
                            <img src={Pic2} width="100%" />
                            <p>Below are the issues I found from my auditing.</p>
                            <p><b>Issue 1: </b>There was no coherent typography usage within the same product. The pages looked disconnected.</p>
                            <img src={Pic3} width="100%" />
                            <p><b>Issue 2: </b>Different products used different typographies, so the company's visual identity was not coherent.</p>
                            <img src={Pic4} width="100%" />
                            <p><b>Issue 3: </b>The current system was like an archive with random styles. There was no clear guideline about the usage of the styles, so designers felt that was hard to use.</p>
                            <img src={Pic5} width="100%" />
                        </div>

                        <div className="content-block" id="section2">
                            <h2 >My goal and process</h2>
                            <p>
                                My goal was to solve all the pain points.
                                <ol>
                                    <li>In response to lack of consistancy and visual connection between products, I needed to develop a single system that ensures a coherent implementation across the pages and products. </li>
                                    <li>As a solution to lack of guideline, I aimed to build usage into the style, so designers won’t be confused with the usage. </li>

                                </ol>
                            </p>
                            <p>
                                My process includes:
                                <ol>
                                    <li>Research</li>
                                    <li>Experimentation</li>
                                    <li>Review and iteration</li>
                                    <li>Documentation</li>
                                    <li>Introduction and education</li>
                                </ol>
                            </p>

                        </div>
                        <div className="content-block" id="section3">
                            <h2 >Finding the solution</h2>

                            <h3>Research</h3>
                            <p>I did 2 types of research to gather knowledge and identify the solutions: workshop and competitive analysis.
                            </p>
                            <p> In the workshop, I gathered the entire design team, including the marketing designers, to identify the common ground for different products. That was what it took to reach the consensus on identity and tones.
                            </p>
                            <p>In competitive analysis, I learned about other companies’ approaches and spotted what would work for us.
                            </p>
                            <img src={Pic6} width="100%" />

                            <h3>Experimentation</h3>
                            <p>
                                As part of the problem of incoherence, different products used different fonts. I aimed to find one font that would reflect the identity of different products and the company’s brand. I did a workshop as research to gather the requirements and learnings from the team. After 2 months of review and iteration, we landed on using Proxima Nova as title and IBM Plex as body.
                            </p>
                            <img src={Pic7} width="100%" />
                            <br />
                            <h3>Review and iteration</h3>
                            <p>This is one of the hardest parts of my typography system work -- the system not only needs to be logical but also lovable. If no users are willing to use the seemingly ideal system, it is merely a piece of artwork. I reviewed my solution with 22 designers on the team to identify any problems that may stop them from using the system. It took three months, millions of review and iterations to reach the point that our designers like it and will use it. </p>
                            <p>* As we took an incremental approach, I came up with 1:1 mapping and ultimate redesign to help the team see both the near future and the future.</p>
                            <img src={Pic8} width="100%" />
                            <br />
                        </div>
                        <div className="content-block" id="section4">
                            <h2>The solution</h2>
                            <p>Below is the solution we landed on after 2 months of review and iteration.</p>
                            <h3>A unified type system</h3>
                            <p>As a solution to incoherence. The new font combo reflects the identity of different products and the company’s brand. </p>
                            <img src={Pic9} width="100%" />
                            <h3>Semantic naming convention</h3>
                            <p>In response to the designer’s pain point that the current system was hard to use, I built the style and the usage into the name itself.</p>
                            <img src={Pic10} width="100%" />
                            <h3>Bonus point: accessibility</h3>
                            <p>The new typography choice had more clarity on the letters, ligatures and symbols. Thus, a bonus point from this typography revamp is accessibility. </p>
                            <img src={Pic11} width="100%" />
                        </div>

                        <div className="content-block" id="section5">
                            <h2>Technical implementation</h2>
                            <p>To bring the design to practice, the outcome needs to be in a tangible format. The typography solution was implemented within the tool people use daily. Below is the tech stack of the tools for both engineers and designers.</p>
                            <img src={Pic12} width="100%" />
                            <h3>1. Documentation Website</h3>
                            <p>Usage and system documentation is crucial to scalability, as designers and engineers can refer to the document whenever they need references or have questions. If the entire product design and front-end team(50+ people) come to me to ask questions, things get out of control quickly.</p>
                            <p>Check out the final outcome: <a href="https://terra.vts.com/foundation/typography/overview">terra.vts.com/foundation/typography/overview</a></p>
                            <img src={Pic13} width="100%" />
                            <h3>2. Style dictionary</h3>
                            <p>This tool is specific to developers. It’s the package they can import and use without re-defining the style every time. </p>
                            <img src={Pic14} width="100%" />
                            <h3>3. Figma library</h3>
                            <p>This tool is specific to designers. It lets designers pick the newly defined styles without designing from zero.</p>
                            <img src={Pic15} width="100%" />
                        </div>

                        <div className="content-block" id="section6">
                            <h2>Soft implementation</h2>
                            <p>People often don’t get complex things immediately, so it’s important to repeat as many times as it takes for people to understand the system. I ran workshops and meetings to ensure people know how to use the typography tokens as part of my maintenance. This step often reveals new problems and needs—for instance, a new typography style, ambiguity in the documentation, or confusion around the usage.</p>
                            <p>System work never ends. There is no perfect system. The process infinitely repeats itself as the problems and needs endlessly occur. </p>
                            <img src={Pic16} width="100%" />
                        </div>

                        <div className="content-block" id="section7">
                            <h2>The biggest challenge</h2>
                            <p>My biggest challenge of the work was launching the system. From experience, I learned people naturally resist changes.</p>
                            <p>The story started from the launching date. After 4 months of review and iterations with the design team, we were finally ready to launch and make a real impact. My team submitted a pull request in the morning. 20 mins later, we were flooded with urgent emails and messages from the sales, clients, and product management teams. They all freaked out about the change and wanted us to change back. To calm the situation, we reverted the change immediately. My team received tons of feedback on the typography as people's feathers ruffled: it was not readable or looked ugly. </p>
                            <p>But is that true? We had design research and experimentations to back us up on the readability and aesthetics. Lots of feedback were out of emotional response rather than rational evaluation. Just like when Apple released the flat UI or Google redesigned their App logos, people hated them. People hated them because things were different, not because the change was not good. </p>
                            <p>So what's the solution here? Communication. After the incident, we did lots and lots of communications with all the teams across the company. We conducted meetings with the product team to explain the rationale, we talked to the sales team to set up a release plan, and we also asked the C-suites to back us up. Finally, we got to release the changes. It took almost 8 months to release the typography system eventually. </p>
                            <p>I also learned a valuable lesson that explanations and communications are important when it comes to change. People are change-averse by nature. Being a system designer means being good at persuading people to adopt changes. </p>
                        </div>

                    </ContentLayout>

                </div >
            </div >
        );
    }
}

export default DS;