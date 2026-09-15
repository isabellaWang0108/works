import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectHero from "../../../components/projectHero"
import { AI_RESEARCH_GUIDE_TAGS } from "../../../components/projectTags"
import PROJECT_SUMMARIES from "../../../data/projectSummaries"
import $ from 'jquery';
import InpageContactMe from "../../../components/inpage_contactme"

import AIPlatformProduct from "../../../assets/images/home/Project card/AIPlatform_product.png"
import Pic2 from "../../../assets/images/LeverGuide/img_1.svg"
import Pic3 from "../../../assets/images/LeverGuide/img_2.svg"
import Pic4 from "../../../assets/images/LeverGuide/img_3.svg"
import Pic5 from "../../../assets/images/LeverGuide/img_4.svg"
import Pic6 from "../../../assets/images/LeverGuide/img_5.svg"
import Pic7 from "../../../assets/images/LeverGuide/img_6.svg"


class AIResearchGuide extends React.Component {
    activeSection = null;
    scrollCheckFrame = null;
    scrollCheckLastRun = 0;

    content = [
        { title: "Pain points", id: "section1" },
        { title: "Designing the guide", id: "section2" },
        { title: "AI UX", id: "section3" },
        { title: "Impact", id: "section4" },
        { title: "What users wanted next", id: "section5" },
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

    getSectionScrollTop(section, container) {
        if (!section.length || !container.length) {
            return 0;
        }

        const sectionTop = section[0].getBoundingClientRect().top;
        const containerTop = container[0].getBoundingClientRect().top;
        return sectionTop - containerTop + container.scrollTop();
    }

    scrollCheck() {
        const container = $(".page-container");
        const activeOffset = 180;
        const scrollTop = container.scrollTop();
        let activeSection = 1;

        for (var i = 1; i <= this.content.length; i++) {
            const section = $("#section" + i);
            const sectionTop = this.getSectionScrollTop(section, container);

            if (section.length && sectionTop - scrollTop <= activeOffset) {
                activeSection = i;
            }
        }

        if (activeSection !== this.activeSection) {
            this.activeSection = activeSection;
            this.neutral();
            this.turnPink('p' + activeSection);
        }
        $('#back2Top').css("display", activeSection >= 2 ? "inherit" : "none");
    }

    menuItem(val) {
        const container = $('.page-container');
        const selectPosition = this.getSectionScrollTop($("#section" + val), container);
        this.activeSection = val;
        this.neutral();
        this.turnPink('p' + val);
        $('#back2Top').css("display", val >= 2 ? "inherit" : "none");
        container.animate({ scrollTop: Math.max(selectPosition - 96, 0) }, 100, () => this.scrollCheck());
    }

    handleScroll = () => {
        const now = window.performance.now();
        if (now - this.scrollCheckLastRun < 80) {
            return;
        }

        if (this.scrollCheckFrame) {
            return;
        }

        this.scrollCheckFrame = window.requestAnimationFrame(() => {
            this.scrollCheckFrame = null;
            this.scrollCheckLastRun = window.performance.now();
            this.scrollCheck();
        });
    }

    componentWillUnmount() {
        if (this.scrollCheckFrame) {
            window.cancelAnimationFrame(this.scrollCheckFrame);
        }
    }

    render() {
        return (
            <div className="page-container project-page" onScroll={this.handleScroll}>
                <NavigationBar />
                <Back2Top onClick={() => $('.page-container').animate({ scrollTop: 0 }, 100)} />
                <div>
                    <ContentLayout>
                        <ProjectHero
                            title={PROJECT_SUMMARIES.AIResearchGuide.title}
                            tags={AI_RESEARCH_GUIDE_TAGS}
                            duration="6 months"
                            team="1 PM, 2 Engineer, 1 Design"
                            role="Design lead"
                            summary={PROJECT_SUMMARIES.AIResearchGuide.summary}
                            image={AIPlatformProduct}
                            imageAlt="AI knowledge platform interface"
                        />

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
                            <h2>Pain points</h2>
                            <p>Consultants needed to ramp up on unfamiliar domains quickly, but useful knowledge was scattered across old decks, playbooks, and individual experts.</p>
                            <div className="discovery-infographic" aria-label="Early discovery pain points">
                                <div className="discovery-pain-card">
                                    <span className="discovery-pain-index">01</span>
                                    <h3>Slow data gathering</h3>
                                    <p>Teams rebuilt context from scratch.</p>
                                </div>
                                <div className="discovery-pain-card">
                                    <span className="discovery-pain-index">02</span>
                                    <h3>Uneven research quality</h3>
                                    <p>Quality depended on finding the right expert or document.</p>
                                </div>
                                <div className="discovery-pain-card">
                                    <span className="discovery-pain-index">03</span>
                                    <h3>Hard to scale</h3>
                                    <p>Knowledge was not packaged for repeat use.</p>
                                </div>
                            </div>
                        </div>

                        <div className="content-block" id="section2">
                            <h2>Designing the guide</h2>
                            <h3>Core workflow</h3>
                            <img loading="lazy" decoding="async" src={Pic2} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                            <h3>Key design decisions</h3>
                            <p>Functions, sub-functions, and curated prompts gave users a clear starting path before they asked more specific questions.</p>
                            <img loading="lazy" decoding="async" src={Pic3} alt="xx" style={{ width: "100%", display: "block", marginBottom: "1rem"}} />
                            <p>AI outputs made sources, reasoning, and uncertainty easier to inspect so consultants could trust and challenge the answer.</p>
                            <img loading="lazy" decoding="async" src={Pic5} alt="xx" style={{ width: "100%", display: "block", marginBottom: "1rem" }} />
                            <p>Sub-functions stayed nested within each function, helping users drill down without losing the larger domain map.</p> 
                            <img loading="lazy" decoding="async" src={Pic4} alt="xx" style={{ width: "100%", display: "block"}} />
                         </div>


                        <div className="content-block" id="section3">
                            <h2>AI UX</h2>
                            <p>Much of the UX for conversational AI live inside the generated content itself. I shaped prompt's output of specific topics so consultants could have quality content even in unstructured AI conversation.</p>
                            <img loading="lazy" decoding="async" src={Pic6} alt="xx" style={{ width: "100%", display: "block"}} />
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Impact</h2>
                            <div className="impact-metric-list">
                                <ul>
                                    <li><strong>Research time decreased by 60%</strong> with source-backed resources surfaced upfront.</li>
                                    <li>Junior practitioners could start discovery without relying on expert outreach.</li>
                                    <li>Institutional knowledge became easier to access, reuse, and scale.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-block" id="section5">
                            <h2>What users wanted next</h2>
                            <p className="pull-quote">“I wish I could change the content in this section.”</p>
                            <p className="pull-quote">“I wish I could change the choice of graph.”</p>
                            <img loading="lazy" decoding="async" src={Pic7} alt="xx" style={{ width: "100%", display: "block"}} />
                        
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
