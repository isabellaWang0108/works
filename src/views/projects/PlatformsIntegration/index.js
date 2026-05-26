import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import $ from 'jquery';
import InpageContactMe from "../../../components/inpage_contactme"

import Pic1 from "../../../assets/images/home/Janus.svg?react"

import Pic2 from "../../../assets/images/Janus/img_2.svg"
import Pic3 from "../../../assets/images/Janus/img_3.svg"
import Pic4 from "../../../assets/images/Janus/img_4.svg"
import Pic5 from "../../../assets/images/Janus/img_5.svg"
import Pic6 from "../../../assets/images/Janus/img_6.svg"
import Pic7 from "../../../assets/images/Janus/img_7.svg"
import Pic8 from "../../../assets/images/Janus/img_8.svg"
import Pic9 from "../../../assets/images/Janus/img_9.svg"
import Pic10 from "../../../assets/images/Janus/img_10.svg"

class PlatformsIntegration extends React.Component {

    content = [
        { title: "Fragmented tools", id: "section1" },
        { title: "Platform opportunity", id: "section2" },
        { title: "Workflow-first strategy", id: "section3" },
        { title: "AI-assisted workflow layer", id: "section4" },
        { title: "Design challenges", id: "section5" },
        { title: "Reflection", id: "section6" },
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
                        <h1 id="title" className="fade-in">Platforms Integration</h1>
                        <div className="badgeRow" style={{ marginTop: 8 }}>
                            <span className="projectBadge">Workflow orchestration</span>
                            <span className="projectBadge">AI-assisted</span>
                            <span className="projectBadge">Enterprise SaaS</span>
                        </div>

                        <div className="inpage_hero_container fade-in">
                            <div className="inpage_hero_box">
                                <p>
                                  Janus unified fragmented consulting tools into one AI-assisted workspace for running end-to-end Org Transformation assessments.
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
                            <h2>Fragmented tools</h2>
                            <p>Org Transformation assessments depended on specialized tools for research, data intake, org visualization, financial modeling, and initiative tracking.</p>
                            <div style={{ overflowX: "auto", marginTop: 24, marginBottom: 48, border: "1px solid rgba(255, 255, 255, 0.4)", borderRadius: 16 }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520, color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>
                                    <thead>
                                        <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.3)" }}>
                                            <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 14, color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>Tool</th>
                                            <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 14, color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>Purpose</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                         <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", fontWeight: 600, color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>LeverGuide</td>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>Outside-in organizational intelligence </td>
                                        </tr>
                                          <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", fontWeight: 600, color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>OIDD</td>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>Outside-in market intelligence </td>
                                        </tr>
                                        <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", fontWeight: 600, color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>Vault</td>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>File and client data ingestion</td>
                                        </tr>
                                        <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", fontWeight: 600, color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>Radial</td>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>Org structure visualization</td>
                                        </tr>
                                        <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", fontWeight: 600, color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>RPM </td>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>Lever selection and financial impact simulation</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", fontWeight: 600, color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>Elevation</td>
                                            <td style={{ padding: "14px 16px", verticalAlign: "top", color: "#ffffff", fontFamily: "SuisseIntl-Regular" }}>Lever, initiative, and workstream tracking</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h3>The problem was between the tools</h3>
                            <p>The tools worked individually, but the handoffs did not. Consultants had to rebuild context, reconcile versions, and recreate deliverables from disconnected outputs.</p>
                            <p>This created friction exactly when teams needed shared context to make assessment decisions.</p>
                            <img src={Pic2} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                        </div>

                        <div className="content-block" id="section2">
                            <h2>Platform opportunity</h2>
                            <p>The opportunity was not another point solution. Janus needed to become the orchestration layer across the consulting workflow by:</p>
                            <div className="bullet-callout">
                                <ul>
                                    <li>Connecting existing systems</li>
                                    <li>Preserving workflow continuity</li>
                                    <li>Reducing operational friction</li>
                                    <li>Centralizing assessment workflows</li>
                                    <li>Embedding AI assistance directly into operational processes</li>
                                </ul>
                            </div>
                            <p>The goal was simple: keep consultants focused on assessment outcomes instead of reconstructing context across systems.</p>
                        </div>

                        <div className="content-block" id="section3">
                            <h2>Workflow-first strategy</h2>
                            <h3 style={{ marginTop: 40 }}>Workflow-first platform architecture</h3>
                            <p>The core decision was to organize Janus around the assessment journey, not existing product boundaries.</p>
                            <img src={Pic3} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                            <p>The workflow became the product navigation, so users could move through the work instead of remembering which tool owned each task.</p>
                            <img src={Pic4} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                        </div>

                        <div className="content-block" id="section4">
                            <h2>AI-assisted workflow layer</h2>
                            <h3 style={{ marginTop: 40 }}>AI support at the moment of work</h3>
                            <p>Janice was embedded inside the workflow instead of separated into a chatbot destination, so AI support stayed close to the assessment decisions consultants were making.</p>
                            <img src={Pic5} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                         
                         <h3 style={{ marginTop: 40 }}>Core interaction strategy</h3>
                         <p>The most important design decision was defining what the AI layer should do. We framed Janice around three interaction modes:</p>
                            <div className="interaction-strategy-grid">
                                <div className="interaction-strategy-card">
                                    <span className="interaction-strategy-index">01</span>
                                    <h4>Chat with data</h4>
                                    <p>Users ask questions and get answers grounded in canonical engagement data.</p>
                                </div>
                                <div className="interaction-strategy-card">
                                    <span className="interaction-strategy-index">02</span>
                                    <h4>Actions that manipulate data</h4>
                                    <p>Users request workflow actions, such as "create an assessment area for finance, FP&A, and AP."</p>
                                </div>
                                <div className="interaction-strategy-card">
                                    <span className="interaction-strategy-index">03</span>
                                    <h4>Suggestions</h4>
                                    <p>Janice surfaces suggested prompts in the right content area at the right moment.</p>
                                </div>
                            </div>
                             <p>For visual or workflow-heavy actions, Janice routed users to the relevant page instead of forcing every task into chat.</p>
                            <img src={Pic6} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                         
                        </div>

                        <div className="content-block" id="section5">
                            <h2>Design challenges</h2>
                            <h3 style={{ marginTop: 40 }}>Workflow-based vs product-based architecture</h3>
                            <p>
                                The first challenge was choosing between product-based architecture and workflow-based architecture. This was both a product decision and a change-management decision.
                            </p>
                            <p>
                                Hands-on practitioners preferred flexible, self-directed workflows, while leadership prioritized standardized processes and operational efficiency.
                            </p>
                            <img src={Pic7} alt="Core workflow" style={{ width: "100%", display: "block" }} />
                            <p>
                                Janus adopted a workflow-based architecture, but kept enough flexibility for consultants to move non-linearly through the work.
                            </p>

                            <h3 style={{ marginTop: 40 }}>Identifying core workflows across fragmented systems</h3>
                            <p>Each system had years of accumulated functionality, but not every feature mattered to the core assessment workflow.</p>
                            <p>Feature inventories and site maps helped product teams decide what to carry forward, combine, or leave behind.</p>
                            <img src={Pic8} alt="Core workflow" style={{ width: "100%", display: "block" }} />
                            
                            
                            <h3 style={{ marginTop: 40 }}>Mapping real consultant workflows and mental models</h3>
                            <p>On paper, the assessment process looked linear. In practice, consultants moved back and forth across stages as they refined hypotheses, revisited data, and adjusted recommendations.</p>
                            <img src={Pic9} alt="Core workflow" style={{ width: "100%", display: "block" }} />
                            
                            <p>Vibe coding with tools like Claude helped the team turn rough workflow ideas into quick prototypes. Instead of debating abstract diagrams, stakeholders could react to tangible flows and compare directions earlier.</p>
                            <p>After multiple rounds of stakeholder and user interviews, the team aligned on the Assessment Area-based approach as the core operational model.</p>
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
