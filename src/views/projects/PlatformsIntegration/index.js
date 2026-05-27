import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import $ from 'jquery';
import InpageContactMe from "../../../components/inpage_contactme"
import StrategyCard from "../../../components/strategyCard"
import WorkflowScreen from "../../../components/workflowScreen"

import Pic1 from "../../../assets/images/home/Janus.svg?react"

import Pic2 from "../../../assets/images/Janus/img_2.svg"
import Pic4_1 from "../../../assets/images/Janus/img_4_1.svg"
import Pic4_2 from "../../../assets/images/Janus/img_4_2.svg"
import Pic4_3 from "../../../assets/images/Janus/img_4_3.svg"
import Pic4_4 from "../../../assets/images/Janus/img_4_4.svg"
import Pic4_5 from "../../../assets/images/Janus/img_4_5.svg"
import Pic4_6 from "../../../assets/images/Janus/img_4_6.svg"
import Pic5 from "../../../assets/images/Janus/img_5.svg"
import Pic6 from "../../../assets/images/Janus/img_6.svg"
import Pic7 from "../../../assets/images/Janus/img_7.svg"
import Pic9 from "../../../assets/images/Janus/img_9.svg"
import Pic10 from "../../../assets/images/Janus/img_10.svg"

class PlatformsIntegration extends React.Component {

    content = [
        { title: "Platform opportunity", id: "section1" },
        { title: "Core workflow screens", id: "section2" },
        { title: "AI-assisted workflow", id: "section3" },
        { title: "Strategic tradeoff", id: "section4" },
        { title: "Rapid AI prototyping", id: "section5" },
        { title: "Reflection", id: "section6" },
    ]

    workflowScreens = [
        {
            image: Pic4_1,
            alt: "Engagement setup screen",
            index: "01",
            title: "Engagement setup",
            description: "Admins set up the project, then engagement members access the product through a shared link.",
        },
        {
            image: Pic4_2,
            alt: "Research market context screen",
            index: "02",
            title: "Learn the client company snapshot grounded in market context",
            description: "Consultants start with a market-informed view of the client before moving into deeper organization analysis.",
        },
        {
            image: Pic4_3,
            alt: "Gather peer comparison info screen",
            index: "03",
            title: "Gather peer comparison info",
            description: "Peer benchmarks give teams a clearer reference point before they inspect internal structure and performance.",
        },
        {
            image: Pic4_4,
            alt: "Explore organizational patterns and structure screen",
            index: "04",
            title: "Explore organizational patterns and structure",
            description: "Org data becomes easier to inspect, compare, and connect to emerging assessment hypotheses.",
        },
        {
            image: Pic4_5,
            alt: "Audit assessment areas and financial impacts screen",
            index: "05",
            title: "Audit assessment areas and financial impacts",
            description: "Teams connect findings to assessment areas and begin sizing the operational and financial implications.",
        },
        {
            image: Pic4_6,
            alt: "Model financial impact and prepare proposals screen",
            index: "06",
            title: "Model financial impact, refine assumptions, and prepare proposals",
            description: "The workflow turns analysis into modeled impact, clearer assumptions, and proposal-ready recommendations.",
        },
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
                        <h1 id="title" className="fade-in">Unifying Consulting Tools into One AI-assisted Workspace</h1>
                        <div className="badgeRow" style={{ marginTop: 8 }}>
                            <span className="projectBadge">Workflow orchestration</span>
                            <span className="projectBadge">AI-assisted</span>
                            <span className="projectBadge">Enterprise SaaS</span>
                        </div>

                        <div className="inpage_hero_container fade-in">
                            <div className="inpage_hero_box">
                                <p>
                             Unify fragmented consulting tools into one AI-assisted workspace, helping consultants run end-to-end Org Transformation assessments faster with less context switching and better context continuity.
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
                            <h2>Platform opportunity</h2>
                            <h3 style={{ marginTop: 40 }}>Fragmented tools</h3>
                            <p>Org Transformation assessments depended on specialized tools for research, data intake, org visualization, financial modeling, and initiative tracking, including LeverGuide, OIDD, Vault, Radial, RPM, and Elevation. Each tool worked individually, but the handoffs between them stayed manual, forcing consultants to rebuild context, reconcile versions, and recreate deliverables from disconnected outputs right when teams needed shared context to make assessment decisions.</p>
                            <img src={Pic2} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                            <h3 style={{ marginTop: 40 }}>Platform opportunity</h3>
                            <p>The goal was simple: keep consultants focused on assessment outcomes instead of reconstructing context across systems.</p>
                            <div className="strategy-card-grid">
                                <StrategyCard index="01" title="Connected workspace">
                                    Bring fragmented tools into one shared workflow layer per engagement.
                                </StrategyCard>
                                <StrategyCard index="02" title="Preserve context">
                                    Carry context across assessment stages and handoffs.
                                </StrategyCard>
                                <StrategyCard index="03" title="Embed AI assistance">
                                    Place guidance directly inside the operational workflow.
                                </StrategyCard>
                            </div>
                           </div>

                        <div className="content-block" id="section2">
                            <h2>Core workflow screens</h2>
                            <div className="workflow-showcase">
                                <div className="workflow-screen-story">
                                    {this.workflowScreens.map(screen => (
                                        <WorkflowScreen
                                            key={screen.index}
                                            image={screen.image}
                                            alt={screen.alt}
                                            index={screen.index}
                                            title={screen.title}
                                        >
                                            {screen.description}
                                        </WorkflowScreen>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="content-block" id="section3">
                            <h2>AI-assisted workflow</h2>
                            <h3 style={{ marginTop: 40 }}>AI support at the moment of work</h3>
                            <p>Janice was embedded inside the workflow instead of separated into a chatbot destination, so AI support stayed close to the assessment decisions consultants were making.</p>
                            <img src={Pic5} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                         
                         <h3 style={{ marginTop: 40 }}>Core interaction strategy</h3>
                         <p>The most important design decision was defining what the AI layer should do. We framed Janice around three interaction modes:</p>
                            <div className="strategy-card-grid">
                                <StrategyCard index="01" title="Chat with data">
                                    Users ask questions and get answers grounded in canonical engagement data.
                                </StrategyCard>
                                <StrategyCard index="02" title="Actions that manipulate data">
                                    Users request workflow actions, such as "create an assessment area for finance, FP&A, and AP."
                                </StrategyCard>
                                <StrategyCard index="03" title="Suggestions">
                                    Janice surfaces suggested prompts in the right content area at the right moment.
                                </StrategyCard>
                            </div>
                             <p>For visual or workflow-heavy actions, Janice routed users to the relevant page instead of forcing every task into chat.</p>
                            <img src={Pic6} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                         
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Strategic tradeoff</h2>
                            <h3 style={{ marginTop: 40 }}>Tool flexibility vs stakeholder standardization</h3>
                            <p>The initial direction was tool-based integration: connect existing products, let consultants choose their own path, and leave outputs flexible. Stakeholders pushed for standardization because that model still lacked guidance between tools and made outcomes inconsistent. Their voice won overall because Janus was meant to scale a repeatable assessment workflow across teams, not simply make existing tools easier to access. Built-in customization became the compromise for users who still needed flexibility in how they worked.</p>
                            <div className="architecture-conflict">
                                <div>
                                    <span>Initial direction</span>
                                    <b>Tool-based integration</b>
                                </div>
                                <div>
                                    <span>User need</span>
                                    <b>Flexible paths and outputs</b>
                                </div>
                                <div className="architecture-conflict-winner">
                                    <span>Final direction</span>
                                    <b>Standardized workflow with customization</b>
                                </div>
                            </div>
                            <img src={Pic7} alt="Core workflow" style={{ width: "100%", display: "block" }} />
                        </div>

                        <div className="content-block" id="section5">
                            <h2>Rapid AI prototyping</h2>
                            <h3 style={{ marginTop: 40 }}>The problem: designing for non-linear work</h3>
                            <p>The team needed to design a workflow that felt structured enough to standardize assessments, but flexible enough for how consultants actually worked. On paper, the process looked linear. In practice, consultants moved back and forth as they refined hypotheses, revisited data, and adjusted recommendations.</p>
                            <img src={Pic9} alt="Core workflow" style={{ width: "100%", display: "block" }} />
                            <h3 style={{ marginTop: 40 }}>How AI prototyping helped</h3>
                            <p>Vibe coding with tools like Claude helped turn rough workflow ideas into clickable prototypes quickly. Instead of debating abstract diagrams, the team could brainstorm with tangible flows, compare directions, and validate assumptions with stakeholders earlier. This accelerated alignment around Assessment Areas as the core operational model.</p>
                            <img src={Pic10} alt="Core workflow" style={{ width: "100%", display: "block" }} />
                        </div>

                        <div className="content-block" id="section6">
                            <h2>Reflection</h2>
                            <h3>Context matters</h3>
                            <p>The best workflow is not always the theoretically simplest one. It is the one users can understand, trust, and adopt.</p>
                            <h3>Enterprise workflows can be non-linear</h3>
                            <p>Enterprise platforms need structure, but they also need room for how people actually work: revisiting information, evolving hypotheses, and moving between stages.</p>
                            <p>This project reinforced that system design has to respect operating behavior, not just product strategy.</p>
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
