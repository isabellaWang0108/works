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
        { title: "Context", id: "section1" },
        { title: "Product Strategy", id: "section2" },
        { title: "Challenges", id: "section3" },
        { title: "Reflection", id: "section4" },
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
                        <h1 id="title" className="fade-in">Platforms Integration</h1>
                        <div className="badgeRow" style={{ marginTop: 8 }}>
                            <span className="projectBadge">Workflow orchestration</span>
                            <span className="projectBadge">AI-assisted</span>
                            <span className="projectBadge">Enterprise SaaS</span>
                        </div>

                        <div className="inpage_hero_container fade-in">
                            <div className="inpage_hero_box">
                                <p>
                                  Designed a platform integration project that unified fragmented consulting tools into a single AI-assisted workspace for running end-to-end Org Transformation assessments.
                                </p>
                                <p>
                                  Janus aimed to reduce manual context switching and preserve workflow continuity across legacy systems, helping consultants stay focused on outcomes instead of tool juggling.
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
                            <p>Org Transformation engagements relied on a fragmented ecosystem of specialized enterprise tools.</p>
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
                            <h3 >Pain points</h3>
                            <p>Each product solved a narrow operational need independently, but the workflow between them remained highly fragmented. Practitioners constantly rebuilt context between systems, reconciled versions manually, and recreated deliverables from disconnected outputs. </p>
                            <p>This created operational inefficiencies and communication gaps.</p>
                            <img src={Pic2} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                         

                            <h3 >Opportunities</h3>
                            <p>The opportunity was not to redesign a single tool, but to integrate fragmented workflows into a more continuous operational platform.</p>
                            <p>Janus aimed to become the orchestration layer across the consulting workflow:</p>
                            <div className="bullet-callout">
                                <ul>
                                    <li>Connecting existing systems</li>
                                    <li>Preserving workflow continuity</li>
                                    <li>Reducing operational friction</li>
                                    <li>Centralizing assessment workflows</li>
                                    <li>Embedding AI assistance directly into operational processes</li>
                                </ul>
                            </div>
                          </div>

                        <div className="content-block" id="section2">
                            <h2>Product Strategy</h2>
                            <h3 style={{ marginTop: 40 }}>Workflow-first platform architecture</h3>
                            <p>Rather than organizing the platform around individual products, Janus was structured around the actual progression of an Org Transformation assessment.</p>
                            <img src={Pic3} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                            <p>This core workflow is reflected on the navigation of the product.</p>
                            <img src={Pic4} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                            <h3 style={{ marginTop: 40 }}>AI Chatbot with canon engagement data</h3>
                            <p>Janice was embedded directly into the workflow layer rather than treated as a standalone chatbot experience.</p>
                            <p>As a result of its feature importance, the janice chatbot always sits inline with the content. </p>
                            <img src={Pic5} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                         
                         <p>The AI chatbot supported:</p>
                            <div className="bullet-callout">
                                <ul>
                                    <li>contextual guidance</li>
                                    <li>cohort suggestions</li>
                                    <li>workflow assistance</li>
                                    <li>operational actions</li>
                                    <li>natural language interactions</li>
                                </ul>
                            </div>
                             <p>The chatbot stays focused on plain text interaction. For actions involving new UI elements, like visualizations or creating assessment areas, it links users to the relevant page rather than handling it inline, keeping the experience clean and focused. </p>
                            <img src={Pic6} alt="Core workflow" style={{ width: "100%", display: "block"}} />
                         
                        </div>

                        <div className="content-block" id="section3">
                            <h2>Challenges</h2>
                            <h3 style={{ marginTop: 40 }}>Workflow-based vs product-based architecture</h3>
                            <p>
                                One of the earliest challenges was deciding whether Janus should follow existing product boundaries or the consulting workflow itself.
                            </p>
                            <p>
                                Hands-on practitioners preferred flexible, self-directed workflows, while leadership prioritized standardized processes and operational efficiency.
                            </p>
                            <img src={Pic7} alt="Core workflow" style={{ width: "100%", display: "block" }} />
                            <p>
                                Since the primary goal of Janus was improving productivity and scalability, the platform ultimately adopted a workflow-based architecture while remaining flexible enough to support iterative consulting workflows.
                            </p>

                            <h3 style={{ marginTop: 40 }}>Identifying core workflows across fragmented systems</h3>
                            <p>Each system contained years of accumulated functionality, but not every feature contributed equally to the practitioner workflow. Simply consolidating screens would have created a bloated and disconnected experience.</p>
                            <p>The team navigated this challenge through close collaboration across different product teams to align fragmented product features into a cohesive workflow through feature inventories and site maps looking like below.</p>
                            <img src={Pic8} alt="Core workflow" style={{ width: "100%", display: "block" }} />
                            
                            
                            <h3 style={{ marginTop: 40 }}>Mapping real consultant workflows and mental models</h3>
                            <p>While the assessment flow appeared linear at a high level, the actual consulting workflow was highly iterative, with practitioners constantly moving back and forth across different stages of the process.</p>
                            <img src={Pic9} alt="Core workflow" style={{ width: "100%", display: "block" }} />
                            
                            <p>As AI prototyping and vibe coding matured, teams rapidly explored different concepts through tools like Claude, creating a wide range of competing workflow directions. After multiple rounds of stakeholder and user interviews, the team ultimately aligned on the Assessment Area–based approach as the core operational model for the platform.</p>
                            <img src={Pic10} alt="Core workflow" style={{ width: "100%", display: "block" }} />
                        
                        
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Reflection</h2>
                            <h3>Context matters</h3>
                            <p>One of the biggest learnings from this project was that the best workflow is not always the theoretically simplest one, but the one users can most easily understand and adopt based on their existing mental models and operational habits.</p>
                            <h3>Enterprise workflows can be non-linear</h3>
                            <p>Although the assessment process appeared linear at a high level, the real consulting workflow was highly iterative, requiring the platform to balance operational structure with enough flexibility to support how consultants actually revisit information, evolve hypotheses, and move between workflows.</p>
                            <p>This reinforced that successful enterprise design must align system design with how people actually do the work, not just how the product strategy wants it to look.</p>
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
