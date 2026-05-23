import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import InpageContactMe from "../../../components/inpage_contactme"

import Pic1 from "../../../assets/images/home/LeverGuide.svg?react"
import Pic2 from "../../../assets/images/LeverGuide/img_1.png"
import Pic3 from "../../../assets/images/LeverGuide/img_2.svg"
import Pic4 from "../../../assets/images/LeverGuide/img_3.svg"
import Pic5 from "../../../assets/images/LeverGuide/img_4.svg"
import Pic6 from "../../../assets/images/LeverGuide/img_5.svg"
import Pic7 from "../../../assets/images/LeverGuide/img_6.svg"


class AIResearchGuide extends React.Component {

    content = [
        { title: "Context", id: "section1" },
        { title: "Solution", id: "section2" },
        { title: "UX in AI-Generated Content", id: "section3" },
        { title: "Impact", id: "section4" },
        { title: "Learning & wish", id: "section5" },
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
        for (var i = 1; i < this.content.length; i++) {
            if ($("#section" + i).position().top < 0 && $("#section" + (i + 1)).position().top > 0) {
                this.neutral();
                this.turnPink('p' + i);
                if (i >= 2) {
                    $('#back2Top').css("display", "inherit");
                } else {
                    $('#back2Top').css("display", "none");
                }
            }
        }

        if ($("#section" + this.content.length).position().top < 0) {
            this.neutral();
            this.turnPink('p' + this.content.length);
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
            <div className="page-container project-page" onScroll={this.handleScroll}>
                <NavigationBar />
                <Back2Top onClick={() => $('.page-container').animate({ scrollTop: 0 }, 100)} />
                <div>
                    <ContentLayout>
                        <h1 id="title" className="fade-in">AI Research Guide</h1>
                        <div className="badgeRow" style={{ marginTop: 8 }}>
                            <span className="projectBadge">AI-generated content</span>
                            <span className="projectBadge">Knowledge product</span>
                            <span className="projectBadge">B2B</span>
                        </div>

                        <div className="inpage_hero_container fade-in">
                            <div className="inpage_hero_box">
                                <ProjectContext
                                    duration="6 months"
                                    team="1 PM, 2 Engineer, 1 Design"
                                    role="Design lead"
                                />
                                <p>
                                   This 0→1 AI-powered project accelerates learning for generalist consultants working outside their domain expertise, turning fragmented knowledge into clear, actionable guidance.
                                </p>
                            </div>

                            <div className="inpage_hero_box">
                                <Pic1 className="inpage_hero_img" />
                            </div>
                        </div>

                        {/* menu bar */}
                        <div className="animated slideInDown content-block left-nav">
                            <ul>
                                <p className="left_nav_title">Content</p>
                                {this.content.map((item, index) => (
                                    <li key={index} onClick={() => this.menuItem(index + 1)} className={"p" + (index + 1)}>
                                        <button className="inpage_menu_item">{item.title}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="content-block fade-in" id="section1">
                            <h2>Context</h2>
                            <p>Consulting engagements often require practitioners to quickly evaluate unfamiliar industries, functions, and organizational structures. Practitioners entering new domains piece together insights manually through fragmented documents, ad hoc guidance, and limited access to domain experts.</p>
                            <div className="bullet-callout">
                                <p className="bullet-lead">As a result, early-stage analysis is often:</p>
                                <ul>
                                    <li>Slow to ramp</li>
                                    <li>Dependent on individual experience</li>
                                    <li>Difficult to scale across multiple engagements</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-block" id="section2">
                            <h2>Solution</h2>
                             <p>This product rethinks this workflow by turning expert knowledge into a structured, AI-powered system, giving generalist consultants fast, reliable guidance to move from exploration to action.</p>
                            <h3>Core workflow</h3>
                            <img src={Pic2} alt="Core workflow" style={{ width: "100%", display: "block", marginLeft: "-5%", marginTop: "-5rem", marginBottom: "-1rem" }} />
                            <h3>Key design decisions</h3>
                            <p>Pre-defined content guide early discovery. Open-ended AI exploration powers advanced and edge-case needs.</p>
                            <img src={Pic3} alt="xx" style={{ width: "100%", display: "block", marginBottom: "1rem"}} />
                            <p>Keeping AI transparent for critical thinking and honest auditing</p>
                            <img src={Pic5} alt="xx" style={{ width: "100%", display: "block", marginBottom: "1rem" }} />
                            <p>Sub-functions are deeper content layers within a function, not separate sections added alongside it. </p> 
                            <img src={Pic4} alt="xx" style={{ width: "100%", display: "block",  marginTop: "-2rem"}} />
                         </div>


                        <div className="content-block" id="section3">
                            <h2>UX in AI-Generated Content</h2>
                            <p>Users primarily experience AI products through content, making information quality and formatting critical to the overall UX.</p>
                            <p>I contributed through prompt engineering and content design—shaping how information was structured, surfaced, and formatted to remain scannable and actionable for consultants.</p>
                            <img src={Pic6} alt="xx" style={{ width: "100%", display: "block"}} />
                        
                            <p>The quality and accuracy of the generated information extended beyond design ownership, but observing the process gave me exposure to how AI systems are evaluated and refined in production environments. The team leveraged RAG (Retrieval-Augmented Generation) to ground outputs in relevant knowledge sources, and used internal validation loops where practitioners rated generated responses to help maintain consistency and reliability over time.</p>
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Impact</h2>
                            <div className="bullet-callout">
                                <ul>
                                    <li>Faster ramp-up in unfamiliar domains</li>
                                    <li>More consistent, high-quality analysis</li>
                                    <li>Reduced dependency on senior experts</li>
                                    <li>Scalable access to institutional knowledge</li>
                                </ul>
                            </div>
                            <p>This pilot helped the team move from fragmented discovery to a more reliable, grounded workflow that supports confident decision-making.</p>
                        </div>

                        <div className="content-block" id="section5">
                            <h2>Learning & wish</h2>
                           <p>A common piece of pilot feedback was:</p>
                            <p className="pull-quote">“I wish I could change the content in this section.”</p>
                            <p className="pull-quote">“I wish I could change the choice of graph.”</p>
                            <p>This revealed an important insight: users don’t want AI-generated content to behave like static documentation or a fixed source of truth. They want the flexibility to interact with, refine, and reshape outputs based on their own context and judgment.</p>
                            <p>While the project did not progress far enough to implement this capability, I explored interaction concepts that would allow users to iteratively refine content and visualizations.</p>
                            <img src={Pic7} alt="xx" style={{ width: "100%", display: "block"}} />
                        
                        </div>


                        <div className="content-block">
                            <InpageContactMe />
                        </div>

                    </ContentLayout>
                </div>
            </div>
        );
    }
}

export default AIResearchGuide;
