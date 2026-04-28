import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import InpageContactMe from "../../../components/inpage_contactme"


class PlatformsIntegration extends React.Component {

    content = [
        { title: "Overview", id: "section1" },
        { title: "Problem definition", id: "section2" },
        { title: "User research", id: "section3" },
        { title: "Design process", id: "section4" },
        { title: "Solution", id: "section5" },
        { title: "Technical implementation", id: "section6" },
        { title: "Impact & learnings", id: "section7" },
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
                        <h1 id="title" className="fade-in">Platforms Integration</h1>

                        <div className="inpage_hero_container fade-in">
                            <div className="inpage_hero_box">
                                <ProjectContext
                                    duration="[Placeholder duration]"
                                    team="[Placeholder team]"
                                    role="[Placeholder role]"
                                />
                                <p>
                                    [Placeholder overview. Describe what this project is about, the platforms involved, and the integration challenge being addressed. Replace this with the actual project description.]
                                </p>
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
                            <h2>Overview</h2>
                            <p>[Placeholder: Provide a high-level summary of the integration project, what platforms were involved, and the desired outcome.]</p>
                        </div>

                        <div className="content-block" id="section2">
                            <h2>Problem definition</h2>
                            <p>[Placeholder: Describe the fragmentation or friction users experienced across platforms before this integration.]</p>
                            <h3>Pain point 1</h3>
                            <p>[Placeholder: Describe the first major pain point.]</p>
                            <h3>Pain point 2</h3>
                            <p>[Placeholder: Describe the second major pain point.]</p>
                        </div>

                        <div className="content-block" id="section3">
                            <h2>User research</h2>
                            <p>[Placeholder: Describe how you gathered insights from users who worked across these platforms.]</p>
                            <h3>Research methods</h3>
                            <p>[Placeholder: Describe the methods — contextual inquiry, interviews, workflow analysis, etc.]</p>
                            <h3>Key insights</h3>
                            <p>[Placeholder: Summarize the most important user needs and pain points discovered.]</p>
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Design process</h2>
                            <p>[Placeholder: Walk through how the design evolved from early concepts to final solution.]</p>
                            <h3>Information architecture</h3>
                            <p>[Placeholder: Describe how you structured the information across the integrated experience.]</p>
                            <h3>Wireframes & iterations</h3>
                            <p>[Placeholder: Describe key design decisions and how they changed through iteration.]</p>
                        </div>

                        <div className="content-block" id="section5">
                            <h2>Solution</h2>
                            <p>[Placeholder: Present the final integrated experience. Describe the key flows and how they resolve the identified pain points.]</p>
                        </div>

                        <div className="content-block" id="section6">
                            <h2>Technical implementation</h2>
                            <p>[Placeholder: Describe how the design was implemented — APIs, data mapping, handoff process, etc.]</p>
                        </div>

                        <div className="content-block" id="section7">
                            <h2>Impact & learnings</h2>
                            <p>[Placeholder: Describe the measurable outcomes of the integration and personal takeaways from navigating the complexity of multi-platform design.]</p>
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

export default PlatformsIntegration;
