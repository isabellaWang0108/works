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
import Pic5 from "../../../assets/images/ProductStudio/ps_pic5.svg"
import Pic6 from "../../../assets/images/ProductStudio/ps_pic6.svg"
import Pic7 from "../../../assets/images/ProductStudio/ps_pic7.svg"
import Pic8 from "../../../assets/images/ProductStudio/ps_pic8.svg"
import Pic9 from "../../../assets/images/ProductStudio/ps_pic9.jpg"

class ProductStudio extends React.Component {

    content = [
        { title: "Process and the goal", id: "section1" },
        { title: "Getting to know our users", id: "section2" },
        { title: "Pain points", id: "section3" },
        { title: "Learning from the ancesters", id: "section4" },
        { title: "Ideating", id: "section5" },
        { title: "Finding risks", id: "section6" },
        { title: "Validate the assumption", id: "section7" },
        { title: "After a total failure", id: "section8" },
        { title: "Build", id: "section9" }
    ]



    turnPink = (theclass) => {
        $("." + theclass + " a").css("color", "#FC2293")
            .css("font-weight", "bold")
    }
    neutral = () => {
        $("li a").css("color", "black")
            .css("text-decoration", "none")
            .css("font-weight", "normal")
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
                        <h1 id="title">How to hire millennial technical talents? </h1>
                        <p>This is a four-month product challenge given by the US Department of Defense to investigate how to hire millennial technical talents and make a product that represents the solution. In this project, I worked on a team of four and mainly took charge of doing research and designing experimentation.</p>
                        <ProjectContext duration="4 months" team="1 MBA, 1 engineer, 1 designer, 1 CM student" role="designer"></ProjectContext>
                        {/* menu bar ==============================================================================================  */}
                        <div className="animated slideInDown content-block left-nav">
                            {/* menu */}
                            <ul>Content
                                {this.content.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => this.menuItem(index + 1)} className={"p" + (index + 1)}>
                                            <a >{item.title}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="content-block" id="section1">
                            <h2>Process and goal</h2>
                            <p>In this project, our goal was to validate the key pain points in the recruitment process and develop a solution.
                                <br />
                                Our process involves:
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
                            <p>As a strategy of getting to know our users, we came up with a rick picture to identify the potential stakeholders involved in the recruitment process. Then we sourced and conducted qualitative interviews with people identified as a stakeholder. </p>
                            <img src={Pic1} width="100%" />
                        </div>
                        <div className="content-block" id="section3">
                            <h2 >Pain points</h2>
                            <p>After conducting 20+ interviews with various roles, we found some common pain points for most of our users.
                            </p>
                            <p><b>For recruiters:</b> They are flooded by massive amounts of applications with different formats every day. It is hard for them to pick candidates with the right qualifications and skills.</p>
                            <p><b>For candidates:</b>They often found insufficient information about a company's day-to-day operation, culture, and time to expect a callback. </p>
                        </div>
                        <div className="content-block" id="section4">
                            <h2 >Learning from the ancesters</h2>
                            <p>There are often people who already realize the problem and trying to solve that. We did a competitive analysis, learning the success and failures in the past.</p>
                            <p>Here is what we learned from our ancestors:</p>
                            <ol>
                                <li>Automation is dangerous. Candidates want a touch of humans during the recruitment, but automation struggles with giving personal messages.</li>
                                <li>Recruitment is a two-sided market, but we have to pick our side to help recruiters do their jobs easier or provide a better experience for candidates.</li>
                            </ol>
                            <img src={Pic2} width="100%" />
                        </div>
                        <div className="content-block" id="section5">
                            <h2 >Ideating</h2>
                            <p> Based on the learnings from the research, we started our journey to find the best solution. Here are the criteria our team uses to evaluate the idea:  </p>
                            <ul>
                                <li>A good idea should be not only logical but also sounds good. </li>
                                <li>The solution should be feasible.</li>
                                <li>The execution is scalable.</li>
                            </ul>
                            <p>Below is a sneak peek at our collaboration of voting out the best idea.</p>
                            <img src={Pic3} width="100%" />
                            <p>By the end, we reached to one idea we all like: A transparent and time-restricted recruitment process.</p>
                            <p>To execute this idea, we would make a job board that reveals a detailed recruitment process and estimated time for each stage to take. Thus, the candidates are guaranteed to get a callback once the clock hits the promised time.</p>
                        </div>
                        <div className="content-block" id="section6">
                            <h2>Finding risks</h2>
                            <p>So far, the idea is based on four people’s collective assumptions and judgments. Before investing in engineering powers, we decided to conduct experiments to prove our riskest assumption. </p>
                            <p>After putting together a chart to rank the riskiness of the assumptions, the riskest hypothesis is that recruiters can support speed and transparency by putting out the recruitment process, team structure, company culture, and committing to getting back to candidates in a limited time.</p>
                            <img src={Pic4} width="100%" />
                        </div>
                        <div className="content-block" id="section7">
                            <h2>Validate the assumption</h2>
                            <p>We designed our first experiment to test whether the company could commit to the time constraint: We pitched six startups and asked them to run their recruitment process. 1/2 of the startups were super interested, and they immediately shared the breakdown of their recruitment process. However, they were afraid to commit to the 3-week time limit when it’s real! </p>
                            <img src={Pic5} width="100%" />
                            <p>The hypothesis on the recruiter side seems not to be working. How about candidates?</p>
                            <p>We sent out emails with a job with the 3-week guaranteed callback to candidates. However, we found that candidates may not be able to commit either.</p>
                            <img src={Pic6} width="100%" />
                        </div>
                        <div className="content-block" id="section8">
                            <h2>After a total failure</h2>
                            <p>With a total failure in validating speed commitment from both recruiter and candidate sides, we have to think about the workaround. After several discussions, we decided to take transparency apart from speed and test whether openness matters. If neither speed nor transparency can be validated, we will have to pivot to other ideas.</p>
                            <p>We conducted a 404-page experiment. The concept is to send out emails with a job description with elements of transparency. Each click is tracked by analytics, but they will direct candidates to a 404 page. We will know who clicked on what in what order from the analytics. If candidates care about transparency, they will click on the link to see further information; If they do not care, they will apply directly. Once we can prove more than 54% of people care, the value is validated.
                            </p>
                            <p>We sent out a total of 120 emails with shaffled order of links.</p>
                            <img src={Pic7} width="100%" />
                            <p>Luck knocked on our door this time. Based on our statistic chart, the value of transparency is valid! </p>
                            <img src={Pic8} width="100%" />
                        </div>
                        <div className="content-block" id="section9">
                            <h2>Build</h2>
                            <p>After the riskest assumption is validated, we proceeded to build the prototype.
                                We made a prototype of a job board includes different elements of transparency in addition to the primary job description, like the recruitment process, day-to-day-life samples.</p>
                            <img src={Pic9} width="100%" />
                        </div>
                    </ContentLayout>

                </div>
            </div>
        );
    }
}

export default ProductStudio;