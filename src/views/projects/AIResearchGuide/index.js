import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import InpageContactMe from "../../../components/inpage_contactme"

import { ReactComponent as Pic1 } from "../../../assets/images/home/LeverGuide.svg"

class AIResearchGuide extends React.Component {

    content = [
        { title: "Overview", id: "section1" },
        { title: "Research methodology", id: "section2" },
        { title: "Key findings", id: "section3" },
        { title: "Design process", id: "section4" },
        { title: "Solution", id: "section5" },
        { title: "Impact & learnings", id: "section6" },
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
            <div className="page-container" onScroll={this.handleScroll}>
                <NavigationBar />
                <Back2Top onClick={() => $('.page-container').animate({ scrollTop: 0 }, 100)} />
                <div>
                    <ContentLayout>
                        <h1 id="title" className="fade-in">AI Research Guide</h1>

                        <div className="inpage_hero_container fade-in">
                            <div className="inpage_hero_box">
                                <ProjectContext
                                    duration="6 months"
                                    team="1 PM, 2 Engineer, 1 Design"
                                    role="Design lead"
                                />
                                <p>
                                   This 0→1 AI-powered project accelerates learning for generalist consultants working outside their domain expertise to move from exploration to action with greater speed and confidence.
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
                      

                            <h3> Product model</h3>
                         </div>

                        <div className="content-block" id="section3">
                            <h2>Key findings</h2>
                            <p>[Placeholder: Present the most important insights from the research phase.]</p>
                            <h3>Finding 1</h3>
                            <p>[Placeholder: Describe the first key finding and its implications.]</p>
                            <h3>Finding 2</h3>
                            <p>[Placeholder: Describe the second key finding and its implications.]</p>
                            <h3>Finding 3</h3>
                            <p>[Placeholder: Describe the third key finding and its implications.]</p>
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Design process</h2>
                            <p>[Placeholder: Walk through the design decisions made in response to the research findings.]</p>
                            <h3>Ideation</h3>
                            <p>[Placeholder: Describe how initial concepts were generated and explored.]</p>
                            <h3>Prototyping & testing</h3>
                            <p>[Placeholder: Describe the prototyping iterations and any usability testing conducted.]</p>
                        </div>

                        <div className="content-block" id="section5">
                            <h2>Solution</h2>
                            <p>[Placeholder: Present the final solution, including key design decisions and how they address the identified problems.]</p>
                        </div>

                        <div className="content-block" id="section6">
                            <h2>Impact & learnings</h2>
                            <p>[Placeholder: Describe measurable outcomes, qualitative feedback, and personal learnings from this project.]</p>
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
