import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import Pic1 from "../../../assets/images/ProductStudio/ps_pic1.jpg"
import Pic2 from "../../../assets/images/ProductStudio/ps_pic2.jpg"
import Pic3 from "../../../assets/images/ProductStudio/ps_pic3.jpg"
import Pic4 from "../../../assets/images/ProductStudio/ps_pic4.jpg"
import Pic5 from "../../../assets/images/ProductStudio/ps_pic5.svg?react"
import Pic6 from "../../../assets/images/ProductStudio/ps_pic6.svg?react"
import Pic7 from "../../../assets/images/ProductStudio/ps_pic7.svg?react"
import Pic8 from "../../../assets/images/ProductStudio/ps_pic8.svg?react"
import Pic9 from "../../../assets/images/ProductStudio/ps_pic9.jpg"
import InpageContactMe from "../../../components/inpage_contactme"


class ProductStudio extends React.Component {

    content = [
        { title: "Process and the goal", id: "section1" },
        { title: "Getting to know our users", id: "section2" },
        { title: "Pain points", id: "section3" },
        { title: "Learning from the ancesters", id: "section4" },
        { title: "Ideating", id: "section5" },
        { title: "Finding risks", id: "section6" },
        { title: "Validating the assumption", id: "section7" },
        { title: "After a total failure", id: "section8" },
        { title: "Build", id: "section9" }
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

        this.neutral();
        this.turnPink('p' + activeSection);
        $('#back2Top').css("display", activeSection >= 2 ? "inherit" : "none");
    }

    menuItem(val) {
        const container = $('.page-container');
        const selectPosition = this.getSectionScrollTop($("#section" + val), container);
        this.neutral();
        this.turnPink('p' + val);
        $('#back2Top').css("display", val >= 2 ? "inherit" : "none");
        container.animate({ scrollTop: Math.max(selectPosition - 96, 0) }, 100, () => this.scrollCheck());
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
                        <h1 id="title">How to hire millennial technical talents? </h1>
                        <div className="badgeRow" style={{ marginTop: 8 }}>
                            <span className="projectBadge">Research-led</span>
                            <span className="projectBadge">Experimentation</span>
                            <span className="projectBadge">Human-centered</span>
                        </div>
                        <p>This four-month DoD product sprint explored how to help recruiters and candidates make hiring more transparent and trustworthy. I led research synthesis, experimentation design, and prototype delivery to uncover a more honest recruitment experience.</p>
                        <ProjectContext duration="4 months" team="1 MBA, 1 engineer, 1 designer, 1 CM student" role="designer"></ProjectContext>
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
                            <h2>Process and goal</h2>
                            <p>Recruiters were overwhelmed by inconsistent applications, and candidates lacked clarity about company culture and timing. Our goal was to validate those pain points and design a hiring experience that felt transparent, trustworthy, and easy to engage with.
                                <br />
                                Our process involved:
                            </p>
                            <ul>
                                <li>User research</li>
                                <li>Competitive analysis</li>
                                <li>Ideation</li>
                                <li>Risk analysis</li>
                                <li>Experimentation</li>
                                <li>Iteration</li>
                                <li>Build</li>
                            </ul>
                        </div>

                        <div className="content-block" id="section2">
                            <h2 >Getting to know our users</h2>
                            <p>As a strategy of getting to know our users, we came up with a rich picture to identify the potential stakeholders involved in the recruitment process. Then we sourced and conducted qualitative interviews with people identified as a stakeholder. </p>
                            <img loading="lazy" src={Pic1} width="100%" alt="img" />
                        </div>
                        <div className="content-block" id="section3">
                            <h2 >Pain points</h2>
                            <p>After conducting 20+ interviews with various roles, we found some common pain points for most of our users.
                            </p>
                            <p><b>For recruiters:</b> They are flooded by massive amounts of applications with different formats every day. It is hard for them to pick candidates with the right qualifications and skills.</p>
                            <p><b>For candidates:</b> They often find insufficient information about a company's day-to-day operation, culture, and time to expect a callback. </p>
                        </div>
                        <div className="content-block" id="section4">
                            <h2 >Learning from the ancestors</h2>
                            <p>There are often people who have already realized the problem and have tried to solve it. We did a competitive analysis to learn the success and failures in the past.</p>
                            <p>Here is what we learned from our ancestors:</p>
                            <ol>
                                <li>Automation is dangerous. Candidates want a touch of humans during the recruitment, but automation struggles with giving personal messages.</li>
                                <li>Recruitment is a two-sided market, but we have to pick our side. We could either help recruiters do their jobs easier or provide a better experience for candidates.</li>
                            </ol>
                            <img loading="lazy" src={Pic2} width="100%" alt="img" />
                        </div>
                        <div className="content-block" id="section5">
                            <h2 >Ideating</h2>
                            <p> Based on the learnings from the research, we started our journey to find the best solution. Here are the criteria our team used to evaluate the idea:  </p>
                            <ul>
                                <li>A good idea should be not only logical but also sounds good. </li>
                                <li>The solution should be feasible.</li>
                                <li>The execution need to be scalable.</li>
                            </ul>
                            <p>Below is a sneak peek at our collaboration of voting out the best idea.</p>
                            <img loading="lazy" src={Pic3} width="100%" alt="img" />
                            <p>By the end, we reached one idea we all liked: A transparent and time-restricted recruitment process.</p>
                            <p>To execute this idea, we would make a job board that reveals a detailed recruitment process and estimated time for each stage to take. Thus, the candidates would be guaranteed to get a callback once the clock hits the promised time.</p>
                        </div>
                        <div className="content-block" id="section6">
                            <h2>Finding risks</h2>
                            <p>So far, the idea was based on four people’s collective assumptions and judgments. Before investing in engineering powers, we decided to conduct experiments to prove our riskiest assumption. </p>
                            <p>After putting together a chart to rank the riskiness of the assumptions, the riskiest hypothesis was that recruiters can support speed and transparency by putting out the recruitment process, team structure, company culture and committing to getting back to candidates in a limited time.</p>
                            <img loading="lazy" src={Pic4} width="100%" alt="img" />
                        </div>
                        <div className="content-block" id="section7">
                            <h2>Validating the assumption</h2>
                            <p>We designed our first experiment to test whether the company could commit to the time constraint: We pitched six startups and asked them to run their recruitment process. 1/2 of the startups were super interested, and they immediately shared the breakdown of their recruitment process. However, they were afraid to commit to the 3-week time limit when it was real! </p>
                            <Pic5 width="100%" />
                            <p>The hypothesis on the recruiter side seemed not to be working. How about candidates?</p>
                            <p>We sent out emails with a job with the 3-week guaranteed callback to candidates. However, we found that candidates could not commit either.</p>
                            <Pic6 width="100%" />
                        </div>
                        <div className="content-block" id="section8">
                            <h2>After a total failure</h2>
                            <p>Our first experiment failed to validate speed commitment from both recruiter and candidate sides. That failure forced us to rethink the problem and separate speed from transparency. If neither speed nor transparency held up, we would need to pivot to something else.</p>
                            <p>We conducted a 404-page experiment. The concept was to send out emails containing a job description with elements of transparency. All clicks were tracked by analytics, but they would direct candidates to a 404 page. From the analytics, we could see who clicked on what in what order. If candidates cared about transparency, they would click on the link to see more information; if they did not care, they would apply directly. Once we could prove more than 54% of people care, the value was validated.</p>
                            <p>We sent out a total of 120 emails with shuffled order of links.</p>
                            <Pic7 width="100%" />
                            <p>Based on our statistics, we proved that transparency was the stronger signal. This taught us that a better hiring experience starts by making information honest and easy to explore, even before speed is guaranteed.</p>
                            <Pic8 width="100%" />
                        </div>
                        <div className="content-block" id="section9">
                            <h2>Build</h2>
                            <p>After the riskiest assumption was validated, we proceeded to build the prototype.
                                We made a prototype of a job board including different elements of transparency in addition to the primary job description, like the recruitment process and day-to-day-life samples.</p>
                            <img loading="lazy" src={Pic9} width="100%" alt="img"/>
                        </div>
                        <div className="content-block" >
                            <InpageContactMe />
                        </div>
                    </ContentLayout>

                </div>
            </div>
        );
    }
}

export default ProductStudio;
