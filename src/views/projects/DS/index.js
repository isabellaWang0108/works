import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import $ from 'jquery';
import Pic1 from "../../../assets/images/DesignSystem/ds_pic1.svg"
import Pic2 from "../../../assets/images/DesignSystem/ds_pic2.svg"
import Pic3 from "../../../assets/images/DesignSystem/ds_pic3.svg"
import Pic4 from "../../../assets/images/DesignSystem/ds_pic4.svg"
import Pic5 from "../../../assets/images/DesignSystem/ds_pic5.jpg"
import Pic6 from "../../../assets/images/DesignSystem/ds_pic6.jpg"
import Pic7 from "../../../assets/images/DesignSystem/ds_pic7.jpg"

class DS extends React.Component {

    content = [
        { title: "The problems", id: "section1" },
        { title: "My goal and process", id: "section2" },
        { title: "Detailed example", id: "section3" },
        { title: "The biggest challenge", id: "section4" },
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
                        <h1 id="title">Building a typography system </h1>
                        <p>Through my three years of professional working experience, I have developed my specialty in product design -- Design Systems. A design system intends to manage design at scale through reusable components, patterns, and usage guidance. A system designer needs to have system thinking and people skills on top of all the general skills a product designer needs. </p>
                        <p>Checkout my design system work:
                            <br />
                            <b>VTS design system</b>: <a href="https://terra.vts.com">terra.vts.com</a>
                            <br />
                            <b>Voice design system</b>: <a href="https://design-system.voiceuxdesigns.com/">design-system.voiceuxdesigns.com/</a>
                        </p>
                        <p>I selected my Typography system at VTS as a case study, to display my work’s process, outcomes, and challenges.
                            My job was to:</p>
                        <ul>
                            <li>Unify the components across 4+ products.</li>
                            <li>Create a sustainable and scalable component library.</li>
                            <li>Educate and persuade designers and engineers to adopt the new system  of building the typography system. </li>
                        </ul>
                        <img src={Pic1} width="100%" />
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
                            <h2>The problems</h2>
                            <ol>
                                <li>There is no coherent typography usage across the products. Thus the pages look disconnected.</li>
                                <li>The current system is like an archive with random styles, so designers feel hard to use.</li>
                                <li>There is no visual connection between different products’ systems, so the company's visual identity is not coherent.</li>
                            </ol>
                            <img src={Pic2} width="100%" />
                        </div>

                        <div className="content-block" id="section2">
                            <h2 >My goal and process</h2>
                            <p>My goal was to develop a single system that ensures a coherent implementation across the pages and products. The system should be semantic so designers won’t be confused with the usage. At the same time, I have to evaluate the typography itself to ensure it reflects the company’s identity and messages to clients.</p>
                            <p>In general, my process includes:</p>
                            <ol>
                                <li>Auditing</li>
                                <li>Take a stab at the system</li>
                                <li>Experiment with the design solutions</li>
                                <li>Review and iterate</li>
                                <li>Documenting</li>
                                <li>Educating the usage</li>
                                <li>Addressing new problems and go back to step 2</li>
                            </ol>
                        </div>
                        <div className="content-block" id="section3">
                            <h2 >Detailed example</h2>
                            <p>Below is a detailed example of each step to give a better idea of my process.</p>
                            <h3>1. Auditing</h3>
                            <p>Auditing let me know what is out there. I came up with a spread sheet that archives all the typography styles and usages across the products.</p>
                            <img src={Pic3} width="100%" />
                            <br />
                            <h3>2. Take a stab at the system</h3>
                            <p>Based on the auditing, I identified the styles to keep and built a semantic system with the minimum complexity that still allows enough flexibility for designers.</p>
                            <img src={Pic4} width="100%" />
                            <br />
                            <h3>3. Experiment with the design solutions</h3>
                            <p>I selected iconic pages and implamented the system into the prototypes myself to ensure the usability and flexibility of the system. The experimentation includes:</p>
                            <ol>
                                <li>The system itself</li>
                                <li>Font choice</li>
                                <li>Accessibility</li>
                                <li>Nomenclature</li>
                            </ol>
                            <img src={Pic5} width="100%" />
                            <br />
                            <h3>4. Review and iterate</h3>
                            <p>This is the hardest part of my typography system work -- the system not only needs to be logical but also lovable. If no users are willing to use the seemingly ideal system, it is merely a piece of artwork. I reviewed my solution with 22 designers on the team to identify any problems that may stop them from using the system. It took three months, millions of review and iterations to reach the point that our designers like it and will use it. </p>
                            <p>* As we took an incremental approach, I came up with 1:1 mapping and ultimate redesign to help the team see both the near future and the future.</p>
                            <img src={Pic6} width="100%" />
                            <br />
                            <h3>5. Documentation</h3>
                            <p>To make the system scalable, I wrote up documentation around usage and the system itself, so designers and engineers can refer to the document whenever they need references or have questions. If the entire product design and front-end team(50+ people) come to me to ask questions, things get out of control quickly.</p>
                            <p>Check out the final outcome:<a href="https://terra.vts.com/foundation/typography/overview">terra.vts.com/foundation/typography/overview</a></p>
                            <img src={Pic7} width="100%" />
                            <br />
                            <h3>6. Introduce the system and educate people</h3>
                            <p>People often don’t get complex things immediately, so it’s important to repeat as many times it takes for people to understand the system. I run workshops and meetings to ensure people know how to use the typography tokens as part of my maintenance. This step often reveals new problems and needs—for instance, a new typography style, ambiguity in the documentation, or confusion around the usage.</p>
                            <br />
                            <h3>7. Address the new problem and go back to step 2</h3>
                            <p>System work never ends. There is no perfect system. The process infinitely repeats itself as the problems and needs endlessly occur. </p>
                        </div>
                        <div className="content-block" id="section4">
                            <h2>The biggest challenge</h2>
                            <p>My biggest challenge of the work was launching the system. From experience, I learned people naturally resist changes.</p>
                            <p>The story starts from the launching date. After 3 months of review and iterations with the design team, we are finally ready to launch and make a real change in the live product. My team submitted a pull request in the morning. 20 mins later, we are flooded with urgent emails and messages from the sales, clients, and product management teams. They all freaked out about the change and wanted us to change back. To calm the situation, we reverted the change immediately. My team received tons of feedback on the typography with people's feathers ruffled: it is not readable or looks ugly. </p>
                            <p>But is that true? We have design research and experimentations to back us up on the readability and aesthetics. Lots of feedback are out of emotional response rather than rational evaluation. Just like when Apple released a flat UI or Google redesigned their App logos, people hated them. People hated them because things were different, not because the change was not good. </p>
                            <p>So what's the solution here? Communication. After the incident, we did lots and lots of communications with all the teams across the company. We conducted meetings with the product team to explain the rationale, we talked to the sales team to set up a release plan, and we also asked the C-suites to back us up. Finally, we get to release the changes. It took almost 6 months to release the typography system finally. </p>
                            <p>I also learned a valuable lesson that explanations and communications are important when it comes to change. People are change-averse by nature. Being a system designer means being good at persuading people to adopt changes. </p>
                        </div>

                    </ContentLayout>

                </div>
            </div>
        );
    }
}

export default DS;