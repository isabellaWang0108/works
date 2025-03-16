import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import Pic1 from "../../../assets/images/DesignSystem/ds_pic1.png"
import Pic2 from "../../../assets/images/DesignSystem/ds_pic2.png"
import Pic3 from "../../../assets/images/DesignSystem/ds_pic3.png"
import Pic4 from "../../../assets/images/DesignSystem/ds_pic4.png"
import Pic5 from "../../../assets/images/DesignSystem/ds_pic5.png"
import Pic6 from "../../../assets/images/DesignSystem/ds_pic6.png"
// import Pic7 from "../../../assets/images/DesignSystem/ds_pic7.png"
import Pic8 from "../../../assets/images/DesignSystem/ds_pic8.svg"
import Pic9 from "../../../assets/images/DesignSystem/ds_pic9.svg"
import Pic10 from "../../../assets/images/DesignSystem/ds_pic10.svg"
import Pic11 from "../../../assets/images/DesignSystem/ds_pic11.svg"
import Pic12 from "../../../assets/images/DesignSystem/ds_pic12.svg"
import Pic13 from "../../../assets/images/DesignSystem/ds_pic13.png"
import Pic14 from "../../../assets/images/DesignSystem/ds_pic14.png"
import Pic15 from "../../../assets/images/DesignSystem/ds_pic15.png"
import Pic16 from "../../../assets/images/DesignSystem/ds_pic16.png"
import InpageContactMe from "../../../components/inpage_contactme"


class DS extends React.Component {

    content = [
        { title: "Defining the problems", id: "section1" },
        { title: "Finding the solutions", id: "section2" },
        { title: "The solution", id: "section3" },
        { title: "Technical implementation", id: "section4" },
        { title: "Soft implementation", id: "section5" },
        { title: "The biggest lesson", id: "section6" },
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
                        <h1 id="title">Building a design system </h1>
                        <ProjectContext duration="1 year" team="2 engineers, 2 designers" role="designer"></ProjectContext>
                        <p>I selected my Typography work at VTS as a case study to showcase my ability to simplify a complex system while introducing accessibility. You can find all my shipped design system work here: <a href="https://terra.vts.com" target="_blank" rel="noopener noreferrer">terra.vts.com</a>.
                            During my time at VTS, I achieved the following:</p>
                        <ol>
                            <li><p>Unify the components across 4+ products.</p></li>
                            <li><p>Create a sustainable and scalable component library in Figma and in code.</p></li>
                            <li><p>Streamlined the design to engineering hand-off. </p></li>
                        </ol>
                        <img src={Pic1} width="100%" alt="img" />
                        {/* menu bar ==============================================================================================  */}
                        <div className="animated slideInDown content-block left-nav">
                            {/* menu */}
                            <ul>Content
                                {this.content.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => this.menuItem(index + 1)} className={"p" + (index + 1)}>
                                           <button className="inpage_menu_item">{item.title}</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="content-block" id="section1">
                            <h2>Defining the problem</h2>
                            <h3>1. Auditing</h3>
                            <p>Auditing let me know what is out there, so I can have a better sense of the issues’ scope and come up with more targeted solutions.
                                I archived all the typography styles and usages across the products in a spreadsheet as part of the process.</p>
                            <img src={Pic2} width="100%" alt="img" />
                            <p><b>Issue 1: </b>There was no coherent typography usage within the same product. The pages looked disconnected.</p>
                            <img src={Pic3} width="100%" alt="img" />
                            <p><b>Issue 2: </b>Different products used different typographies, so the company's visual identity was not coherent.</p>
                            <img src={Pic4} width="100%" alt="img" />
                        </div>

                        <div className="content-block" id="section2">
                            <h2 >Finding the solution</h2>

                            <h3>Research</h3>
                            <p>I conducted primary research by gathering the design team to identify the need for different products.
                                I performed competitive analysis by studying other companies’ approaches and spotting ideas that could work for us. </p>
                            <img src={Pic6} width="100%" alt="img" />

                            <h3>Experimentation</h3>
                            <p>
                                I selected iconic pages and implemented the system into the prototypes to ensure the usability and flexibility of the system. The experimentation includes:
                            </p>
                            <ol>
                                <li>The system itself</li>
                                <li>Font choice</li>
                                <li>Accessibility</li>
                                <li>Nomenclature</li>
                            </ol>


                            <img src={Pic5} width="100%" alt="img" />
                            <br />
                            <h3>Decide on the approach</h3>
                            <p>To compared the pros and cons of incremental and radical change with the design and engineering manager. Given our limited resources, we chose the incremental approach.</p>
                            <img src={Pic8} width="100%" alt="img" />
                            <br />
                        </div>
                        <div className="content-block" id="section3">
                            <h2>The solution</h2>
                            <h3>A unified type system</h3>
                            <p>As a solution to incoherence. The new system reflects the identity of the company and the needs of different products. </p>
                            <img src={Pic9} width="100%" alt="img" />
                            <h3>Semantic naming convention</h3>
                            <p>In response to the designer’s pain point that the current system was hard to use, I built the style and the usage into the name itself.</p>
                            <img src={Pic10} width="100%" alt="img" />
                            <h3>Accessibility</h3>
                            <p>The new typography choice had more clarity on the letters, ligatures and symbols, which makes it friendly to people with dyslexia.  </p>
                            <img src={Pic11} width="100%" alt="img" />
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Technical implementation</h2>
                            <p>To translate the design into practice, the typography solution was integrated directly into the tools used daily. The implementation includes:
                            </p>
                            <ul>
                                <li>A documentation website for guidelines and reference</li>
                                <li>A style dictionary to maintain consistency across platforms</li>
                                <li>A Figma library for seamless adoption by designers and engineers</li>
                            </ul>
                            <img src={Pic12} width="100%" alt="img" />
                            <h3>1. Documentation Website</h3>
                            <p>Scalable design relies on solid documentation, enabling a 50+ person team to find answers independently. Without it, constant inquiries would create bottlenecks. A well-structured system ensures consistency, efficiency, and smooth workflows.</p>
                            <p>Check out the shipped documentation: <a href="https://terra.vts.com/foundation/typography/overview">terra.vts.com/foundation/typography/overview</a></p>
                            <img src={Pic13} width="100%" alt="img" />
                            <h3>2. Style dictionary</h3>
                            <p>Developers can import and use a package without re-defining the style every time. </p>
                            <img src={Pic14} width="100%" alt="img" />
                            <h3>3. Figma library</h3>
                            <p> Designers can pick the pre-defined styles without designing from zero.</p>
                            <img src={Pic15} width="100%" alt="img" />
                        </div>

                        <div className="content-block" id="section5">
                            <h2>Soft implementation</h2>
                            <p>   Understanding complex systems takes time, so repetition is key. I ran workshops and meetings to ensure adoption of typography tokens, often uncovering new issues—whether missing styles, unclear documentation, or usage confusion.
                            </p>
                            <p>
                                System work is never truly finished. There is no perfect solution—only continuous iteration as new challenges emerge.
                            </p>
                            <img src={Pic16} width="100%" alt="img" />
                        </div>

                        <div className="content-block" id="section6">
                            <h2>The biggest lesson</h2>
                            <p>Launching the system was the biggest challenge—people resist change.</p>
                            <p>    After months of iterations and alignment withint the product, design, and engineering team, we pushed the update. Within 20 minutes, panic erupted—sales, clients, and product managers flooded us with complaints, forcing an immediate rollback. Claims of unreadability and ugliness surfaced, but our research proved otherwise. The backlash was emotional, not rational—just like reactions to Apple’s flat UI or Google’s logo redesign.
                            </p>
                            <p>
                                The solution? Communication. We joined calls with the sales and secured C-suite support. Eight months later, the system finally launched.
                            </p>
                            <p>
                                Lesson learned: A system designer’s job isn’t just building—it’s driving adoption. </p>
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