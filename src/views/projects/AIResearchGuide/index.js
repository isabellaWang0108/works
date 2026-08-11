import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import InpageContactMe from "../../../components/inpage_contactme"

import AIPlatformProduct from "../../../assets/images/home/Project card/AIPlatform_product.svg"
import Pic2 from "../../../assets/images/LeverGuide/img_1.svg"
import Pic3 from "../../../assets/images/LeverGuide/img_2.svg"
import Pic4 from "../../../assets/images/LeverGuide/img_3.svg"
import Pic5 from "../../../assets/images/LeverGuide/img_4.svg"
import Pic6 from "../../../assets/images/LeverGuide/img_5.svg"
import Pic7 from "../../../assets/images/LeverGuide/img_6.svg"


class AIResearchGuide extends React.Component {

    content = [
        { title: "Pain points", id: "section1" },
        { title: "Designing the guide", id: "section2" },
        { title: "UX in AI content", id: "section3" },
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
                <NavigationBar />
                <Back2Top onClick={() => $('.page-container').animate({ scrollTop: 0 }, 100)} />
                <div>
                    <ContentLayout>
                        <h1 id="title" className="fade-in">AI-Powered Knowledge Tool for Faster Consulting Discovery</h1>
                        <div className="badgeRow" style={{ marginTop: 8 }}>
                            <span className="projectBadge">AI product</span>
                            <span className="projectBadge">B2B platform</span>
                            <span className="projectBadge">Research workflow</span>
                        </div>

                        <div className="inpage_hero_container fade-in">
                            <div className="inpage_hero_box">
                                <ProjectContext
                                    duration="6 months"
                                    team="1 PM, 2 Engineer, 1 Design"
                                    role="Design lead"
                                />
                                <p>
                                    A 0→1 AI knowledge tool that helps consultants quickly understand unfamiliar domains through guided, source-backed recommendations.
                                </p>
                            </div>

                            <div className="inpage_hero_box">
                                <img src={AIPlatformProduct} className="inpage_hero_img" alt="AI knowledge platform interface" />
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
                            <h2>Pain points</h2>
                            <p>Early discovery was painful for consultants who needed to ramp up on unfamiliar domains quickly. Useful knowledge existed, but it was scattered across old decks, playbooks, and individual experts.</p>
                            <div className="discovery-infographic" aria-label="Early discovery pain points">
                                <div className="discovery-pain-card">
                                    <span className="discovery-pain-index">01</span>
                                    <h3>Slow</h3>
                                    <p>Teams rebuilt context from scratch.</p>
                                </div>
                                <div className="discovery-pain-card">
                                    <span className="discovery-pain-index">02</span>
                                    <h3>Uneven</h3>
                                    <p>Quality depended on finding the right expert or document.</p>
                                </div>
                                <div className="discovery-pain-card">
                                    <span className="discovery-pain-index">03</span>
                                    <h3>Hard to scale</h3>
                                    <p>Knowledge was not packaged for repeat use.</p>
                                </div>
                            </div>
                            <p>The design challenge was to turn scattered institutional knowledge into a guided path consultants could explore with confidence.</p>
                        </div>

                        <div className="content-block" id="section2">
                            <h2>Designing the guide</h2>
                            <p>Design</p>
                            <h3>Core workflow</h3>
                            <img src={Pic2} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                            <h3>Key design decisions</h3>
                            <p>The first decision was to give users a clear starting path. Functions, sub-functions, and curated prompts helped them orient quickly before asking more specific questions.</p>
                            <img src={Pic3} alt="xx" style={{ width: "100%", display: "block", marginBottom: "1rem"}} />
                            <p>The second decision was transparency. Consultants needed to trust the information, but they also needed to challenge it. We designed the AI output to make sources, reasoning, and uncertainty easier to inspect instead of hiding the answer behind a polished summary.</p>
                            <img src={Pic5} alt="xx" style={{ width: "100%", display: "block", marginBottom: "1rem" }} />
                            <p>The third decision was information architecture. Sub-functions were treated as deeper layers within a function, not as separate sections competing for attention. This helped users drill down without losing the larger domain map.</p> 
                            <img src={Pic4} alt="xx" style={{ width: "100%", display: "block"}} />
                         </div>


                        <div className="content-block" id="section3">
                            <h2>UX in AI content </h2>
                            <p>In this product, the interface was only part of the experience. Much of the UX lived inside the generated content itself: the headings, summaries, evidence, recommendations, and visual explanations users had to read and act on.</p>
                            <p>I contributed through prompt engineering and content design, shaping how information was structured, surfaced, and formatted so consultants could scan quickly, compare options, and turn AI output into next steps.</p>
                            <img src={Pic6} alt="xx" style={{ width: "100%", display: "block"}} />
                        
                            <p>The quality and accuracy of the generated information extended beyond design ownership, but the process shaped how I thought about AI product design. The team used RAG (Retrieval-Augmented Generation) to ground outputs in relevant knowledge sources, then used internal validation loops where practitioners rated responses to improve consistency and reliability over time.</p>
                            <p>That changed the design question from “does the answer look good?” to “can a consultant understand where this came from, judge whether it is useful, and confidently decide what to do next?”</p>
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Impact</h2>
                            <p>The pilot helped turn early-stage discovery into a more repeatable workflow. Consultants no longer had to begin with a blank search process; they could start with a guided path, inspect AI-generated recommendations, and build understanding faster.</p>
                            <div className="bullet-callout">
                                <ul>
                                    <li>Faster ramp-up in unfamiliar domains</li>
                                    <li>More consistent, high-quality analysis</li>
                                    <li>Reduced dependency on senior experts</li>
                                    <li>Scalable access to institutional knowledge</li>
                                </ul>
                            </div>
                            <p>Most importantly, LeverGuide made institutional knowledge feel more approachable. It helped users move from “I don’t know where to start” to “I know what questions to ask next.”</p>
                        </div>

                        <div className="content-block" id="section5">
                            <h2>What users wanted next</h2>
                           <p>Once users saw AI-generated guidance inside their workflow, they quickly wanted more control over it. A common piece of pilot feedback was:</p>
                            <p className="pull-quote">“I wish I could change the content in this section.”</p>
                            <p className="pull-quote">“I wish I could change the choice of graph.”</p>
                            <p>This revealed an important insight: users did not want AI-generated content to behave like static documentation or a fixed source of truth. They wanted to edit, challenge, refine, and reshape outputs based on their own client context and judgment.</p>
                            <p>While the project did not progress far enough to implement this capability, I explored interaction concepts that would allow users to iteratively refine content and visualizations. That exploration pointed toward a more collaborative model, where AI generates a strong starting point and consultants shape it into client-ready thinking.</p>
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
