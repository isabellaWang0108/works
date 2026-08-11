import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import DesignSystemProduct from "../../../assets/images/home/Project card/DS_product.svg"
import Pic3 from "../../../assets/images/DesignSystem/ds_pic3.png"
import Pic4 from "../../../assets/images/DesignSystem/ds_pic4.png"
import Pic5 from "../../../assets/images/DesignSystem/ds_pic5.png"
import Pic6 from "../../../assets/images/DesignSystem/ds_pic6.png"
import Pic8 from "../../../assets/images/DesignSystem/ds_pic8.png"
import Pic9 from "../../../assets/images/DesignSystem/ds_pic9.svg"
import Pic10 from "../../../assets/images/DesignSystem/ds_pic10.svg"
import Pic11 from "../../../assets/images/DesignSystem/ds_pic11.svg"
import Pic12 from "../../../assets/images/DesignSystem/ds_pic12.svg"
import Pic13 from "../../../assets/images/DesignSystem/ds_pic13.png"
import Pic14 from "../../../assets/images/DesignSystem/ds_pic14.png"
import Pic15 from "../../../assets/images/DesignSystem/ds_pic15.png"
import Pic16 from "../../../assets/images/DesignSystem/ds_pic16.png"

import Impact1 from "../../../assets/images/DesignSystem/impact_1.svg"
import Impact2 from "../../../assets/images/DesignSystem/impact_2.svg"
import Impact3 from "../../../assets/images/DesignSystem/impact_3.svg"
import Impact4 from "../../../assets/images/DesignSystem/impact_4.svg"

import InpageContactMe from "../../../components/inpage_contactme"


class DS extends React.Component {

    content = [
        { title: "Identifying the problems", id: "section1" },
        { title: "Finding the solutions", id: "section2" },
        { title: "The solution", id: "section3" },
        { title: "Implementation", id: "section4" },
        { title: "People work", id: "section5" },
        { title: "Impact", id: "section6" },
        { title: "The biggest lesson", id: "section7" },
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
                {/* navigation bar  */}
                <NavigationBar
                    projects
                />
                <Back2Top onClick={() => $('.page-container').animate({ scrollTop: 0 }, 100)} />
                <div >

                    {/*contect itself ==============================================================================================                  */}
                    <ContentLayout>

                        <h1 id="title" className="fade-in">Scaling Product Consistency with a Design System</h1>
                        <div className="badgeRow" style={{ marginTop: 8 }}>
                            <span className="projectBadge">Design systems</span>
                            <span className="projectBadge">Platform UX</span>
                            <span className="projectBadge">DesignOps</span>
                        </div>
                        <div className="inpage_hero_container fade-in">
                            <div className="inpage_hero_box">
                                <ProjectContext duration="1 year" team="2 engineers, 2 designers" role="Designer"></ProjectContext>
                                <p>VTS had 4+ independently developed products and 100+ pages built by multiple teams, which caused inconsistent typography, duplicated UI patterns, and confusing product experiences.</p>
                                <p>I led the design system effort to unify styles across products, embed shared design language into daily workflows, and make consistent design an operational capability for the company.{' '}
                                    <a href="https://terra.vts.com/">Check out the deployed system site here.</a></p>
                            </div>
                            <div className="inpage_hero_box">
                                <img src={DesignSystemProduct} className="inpage_hero_img" alt="Design system product interface" />
                            </div>
                        </div>

                        {/* menu bar ==============================================================================================  */}
                        <div className="animated slideInDown content-block left-nav">
                            {/* menu */}
                            <ul>
                                <p className="left_nav_title">Content</p>
                                {this.content.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => this.menuItem(index + 1)} className={"p" + (index + 1)}>
                                            <button className="inpage_menu_item">{item.title}</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="content-block fade-in" id="section1">
                            <h2>Identifying the problems</h2>
                            <h3>Issue 1: Incoherent typography usage within the same product </h3>
                            <img loading="lazy" src={Pic3} className="images png" alt="img" />

                            <h3>Issue 2: Different products used different design systems</h3>
                            <img loading="lazy" src={Pic4} className="images png" alt="img" />


                        </div>

                        <div className="content-block" id="section2">
                            <h2 >Finding the solution</h2>

                            <h3>Gathering insights</h3>
                            <p>I conducted primary research by gathering the design team to identify the needs for different products.
                                I performed competitive analysis by studying other companies’ approaches and spotting ideas that could work for us. </p>
                            <img loading="lazy" src={Pic6} className="images png" alt="img" />

                            <h3>Experimentation</h3>
                            <p>
                                I selected iconic pages and implemented the system into prototypes to ensure the usability and flexibility of the system. The experimentation included:
                            </p>
                            <ol>
                                <li>The system itself</li>
                                <li>Font choice</li>
                                <li>Accessibility</li>
                                <li>Nomenclature</li>
                            </ol>


                            <img loading="lazy" src={Pic5} className="images png" alt="img" />
                            <br />
                            <h3>Decide on the approach</h3>
                            <p>I compared the pros and cons of incremental and radical change with the design and engineering managers. Given our limited resources, we chose the incremental approach.</p>
                            <img loading="lazy" src={Pic8} className="images" alt="img" />
                            <br />
                        </div>
                        <div className="content-block" id="section3">
                            <h2>The solution</h2>
                            <h3>A unified type system</h3>
                            <p>The new system reflects the identity of the company and the needs of different products. </p>
                            <img loading="lazy" src={Pic9} className="images" alt="img" />
                            <h3>Semantic naming convention</h3>
                            <p>In response to the designers’ pain points that the current system was hard to use, I built the style and the usage into the name itself.</p>
                            <img loading="lazy" src={Pic10} className="images" alt="img" />
                            <h3>Accessibility</h3>
                            <p>The new typography choice had more clarity on the letters, ligatures and symbols, which makes it friendly to people with dyslexia.  </p>
                            <img loading="lazy" src={Pic11} className="images" alt="img" />
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Implementation</h2>
                            <p>To translate the design into practice, the typography solution was integrated directly into the tools used daily. The implementation includes:
                            </p>
                            <ul>
                                <li>A documentation website for guidelines and reference</li>
                                <li>A style dictionary to maintain consistency across platforms</li>
                                <li>A Figma library for seamless adoption by designers and engineers</li>
                            </ul>
                            <img loading="lazy" src={Pic12} className="images" alt="img" />
                            <h3>1. Documentation Website</h3>
                            <p>Scalable design relies on solid documentation, enabling a 50+ person team to find answers independently. Without it, constant inquiries would create bottlenecks. A well-structured system ensures consistency, efficiency, and smooth workflows.</p>
                            <p>Check out the shipped documentation: <a href="https://terra.vts.com/foundation/typography/overview">terra.vts.com/foundation/typography/overview</a></p>
                            <img loading="lazy" src={Pic13} className="images png" alt="img" />
                            <h3>2. Style dictionary</h3>
                            <p>Developers can import and use a package without re-defining the style every time. </p>
                            <img loading="lazy" src={Pic14} className="images png" alt="img" />
                            <h3>3. Figma library</h3>
                            <p> Designers can pick the pre-defined styles without designing from zero.</p>
                            <img loading="lazy" src={Pic15} className="images png" alt="img" />
                        </div>

                        <div className="content-block" id="section5">
                            <h2>People work</h2>
                            <p>   Understanding complex systems takes time, so repetition is key. I ran workshops and meetings to ensure adoption of typography tokens, often uncovering new issues—whether missing styles, unclear documentation, or usage confusion.
                            </p>
                            <p>
                                System work is never truly finished. There is no perfect solution—only continuous iteration as new challenges emerge.
                            </p>
                            <img loading="lazy" src={Pic16} className="images png" alt="img" />
                        </div>

                        <div className="content-block" id="section6">
                            <h2>Impact</h2>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                <img loading="lazy" alt="prototypes" src={Impact1} width="383" />
                                <img loading="lazy" alt="prototypes" src={Impact2} width="377" />
                                <img loading="lazy" alt="prototypes" src={Impact3} width="383" />
                                <img loading="lazy" alt="prototypes" src={Impact4} width="377" />
                            </div>
                            <div className="bullet-callout" style={{ marginTop: '24px' }}>
                                <ul>
                                    <li>Reduced cross-product inconsistency by centralizing typography and style patterns.</li>
                                    <li>Enabled 50+ designers and engineers to adopt shared guidelines through documentation and libraries.</li>
                                    <li>Shifted the effort from a one-off redesign into an operating design system embedded in delivery.</li>
                                </ul>
                            </div>
                        </div>


                        <div className="content-block" id="section7">
                            <h2>The biggest lesson</h2>
                            <p>Launching the system was the biggest challenge—people resist change.</p>
                            <p> After months of iterations and alignment within the product, design, and engineering teams, the design system team published the update. Within 20 minutes, panic erupted—sales, clients, and product managers flooded us with complaints, forcing an immediate rollback. Claims of unreadability and ugliness surfaced, but our research proved otherwise. The backlash was emotional, not rational—just like reactions to Apple’s flat UI or Google’s logo redesign.
                            </p>
                            <p>
                                The solution? Communication. I joined calls along with my engineers with sales and secured C-suite support. Three months later, the system finally launched.
                            </p>
                            <h3>
                                A system designer’s job isn’t just building the system — it’s driving adoption. </h3>
                        </div>

                        <div className="content-block" >
                            <InpageContactMe />
                        </div>

                    </ContentLayout>

                </div >
            </div >
        );
    }
}

export default DS;
