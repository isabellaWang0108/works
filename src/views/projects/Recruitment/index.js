import React from "react";
import { Link } from "react-router-dom";

import Navi from "../../../components/navi"
import Paragraph from "../../../components/paragraph"
import Prelude from "../../../components/prelude"
import Bullet from "../../../components/bullet"
import Copyright from "../../../assets/copyright/projects_Copyright.json"
import NavigationBar from "../../../components/navigation"

import SmoothHireImg from "../../../assets/images/smoothHire/smoothHireImg.jpg"
import pro1 from "../../../assets/images/smoothHire/richPicture.jpg"
import pro2 from "../../../assets/images/smoothHire/userResearch.jpg"
import pro3 from "../../../assets/images/smoothHire/competitors.jpg"
import pro4 from "../../../assets/images/smoothHire/ideas.png"
import pro5 from "../../../assets/images/smoothHire/value.png"

import de1 from "../../../assets/images/smoothHire/experiment1.png"
import de2 from "../../../assets/images/smoothHire/sketch.png"
import de3 from "../../../assets/images/smoothHire/experiment2.png"
import de4 from "../../../assets/videos/smoothHire.mov"
import de5 from "../../../assets/images/smoothHire/experiment3.png"
import de6 from "../../../assets/images/smoothHire/prototype.png"
import de7 from "../../../assets/images/smoothHire/companyCulture.svg"
import de8 from "../../../assets/images/smoothHire/jobApplication.svg"
import Experiment3 from "../../../assets/images/smoothHire/testing3.png"

import $ from 'jquery';
import ReactGA from 'react-ga';

const container = {
    paddingTop: window.innerWidth > 450 ? 60 : 50,
    position: 'fixed',
    width: '100%',
    overflow: 'scroll',
    height: "100vh",
    left: 0
}
class Recruitment extends React.Component {

    componentDidMount() {
        ReactGA.initialize('UA-148443721-2', { testMode: true });
    }

    onClick = (e) => {
        e.preventDefault();
        const selectPosition = $(".p" + e.target.className).position().top;
        $('#smoothHire').animate({ scrollTop: selectPosition }, 700);

        // google analytics
        ReactGA.event({
            category: 'inside thesis session',
            action: 'click on' + e.target.className
        })

    }


    turnPink = (theclass) => {
        $("." + theclass).css("color", "#FC2293")
            .css("text-decoration", "underline")
            .css("font-weight", "bold")
    }
    neutral = () => {
        $("li").css("color", "black")
            .css("text-decoration", "none")
            .css("font-weight", "normal")
    }

    scrollCheck(thePosition) {
        // for all the item in the menu except for the last one\
        for (var i = 0; i < Copyright.smoothHire.title.length - 1; i++) {
            if (thePosition > $(".pp" + i).position().top - 120 && thePosition < $(".pp" + (i + 1)).position().top) {
                this.neutral();
                this.turnPink('p' + i);
            }
        }

        // for the last item in the menu
        if (thePosition > $(".pp" + (Copyright.smoothHire.title.length - 1)).position().top) {
            this.neutral();
            this.turnPink('p' + (Copyright.smoothHire.title.length - 1));
        }
    }
    handleScroll = e => {
        e.preventDefault();
        this.scrollCheck($('#smoothHire').scrollTop())

    }

    render() {
        return (
            <div>
                <NavigationBar
                    contact
                    onClick={() => {
                        ReactGA.event({
                            category: 'back to homepage',
                            action: "back to home from smoothHire"
                        })
                    }}
                />
                <Navi />

                <div id="smoothHire" style={container} onScroll={this.handleScroll}>
                    {/* navigation bar ==============================================================================================  */}
                    <div id="navi" className="animated slideInDown">

                        <div id="content" >

                            <ul>Process
                        {Copyright.smoothHire.title.map((item, index) => {
                                return (
                                    <li key={index} onClick={this.onClick} className={"p" + index}>{item}
                                    </li>
                                )
                            })}
                            </ul>


                        </div>
                    </div>
                    {/*contect itself ==============================================================================================                  */}
                    <div id="info">
                        <Prelude
                            imgSrc={SmoothHireImg}
                            team={Copyright.smoothHire.team}
                            name={Copyright.smoothHire.name}
                            challenge={Copyright.smoothHire.challenge}
                            myrole={Copyright.smoothHire.myrole}
                            for={Copyright.smoothHire.for} />

                        <Paragraph banner={pro2} title={Copyright.smoothHire.title[0]} val="pp0" class="pp0">
                            <p>
                                {Copyright.smoothHire.content}
                            </p>

                        </Paragraph>

                        <Paragraph banner={pro1} title={Copyright.smoothHire.title[1]} val="pp1" class="pp1">
                            <p>
                                After analyzing the pain points we collected from the people, we refined the problem as:
                            <br /><br /><span className='bold'>For recruiters: </span> Every day, they are flooded by massive amounts of applications with different formats. It is hard for them to pick out candidates with the right qualification and skills.
                            <br /><br /><span className='bold'>For candidates: </span> They often found insufficient information to illustrate how their lives will look after getting into the company. Suppose they think they will figure out during the interview, usually after the application. In that case, they suffer from the "Resume black hole," which means the endless waiting after the submission with no idea where the companies are in the review process and when they can expect a callback. All those problems draw the young talents away from other opportunities that give them a response.
                        <br /><br /> To better understand the problem, we draw a rick picture to unveil the entire recruitment process to figure out all the stakeholders and technology involved. The solution can go beyond just recruiters and candidates but be anywhere in the process.
                        </p>

                        </Paragraph>




                        <Paragraph banner={pro3} title={Copyright.smoothHire.title[2]} val="pp2" class="pp2">
                            <p>There are often people who already realize the problem and trying to solve that. With the significant pain points in mind, we looked into other people's solutions to the pain points.
                       <br />
                        Here is what we learned from our ancestors:
                        </p>
                            <Bullet a="Automation is dangerous. Candidates want a touch of humans during the recruitment, but automation struggles with giving personal messages."
                                b="Recruitment is a two-side market, but we have to pick our side to help recruiters do their jobs easier or provide a better experience for candidates."
                            />

                        </Paragraph>

                        <Paragraph banner={pro4} title={Copyright.smoothHire.title[3]} val="pp3" class="pp3">
                            <p>  Based on the research take away, we started to generate ideas that solve 30 per person. A good idea should not only logical but also sounds good. We gathered together to vote on the best idea from the pitches. Initially, we had three ideas tied to each other, but after talking to our contact points, some are just not feasible at scale. If you want to know the process in detail, contact me!
                            Here is what we propose:
                         </p>
                            <p><span className="bold pink">
                                A transparent and time restricted recruitment process.
                    </span>
                                <br />
                        A job board should reveal a detailed recruitment process and estimated time for each stage to take. Candidates are guaranteed to get a callback once the clock hits the promised time. </p>
                            <br />
                        </Paragraph>

                        <Paragraph banner={pro5} title={Copyright.smoothHire.title[4]} val="pp4" class="pp4">
                            <p>
                            A good idea never immediately turns into the right product. We have to turn the concept into features. And features always come with their value and risk, so it is essential to debug the fatal risks before we jump to a conclusion and hand the proposal over to engineers. Engineering is expensive and sometimes irreversible.
                        <br />  <br />
                        For us, the RISKEST hypothesis is that recruiters can support the speed and transparency by putting out the recruitment process, team structure, company culture, and commitment to getting back to candidates in a limited time.
                        </p>
                        </Paragraph>

                        <Paragraph imgShadow={true} banner={de1} title={Copyright.smoothHire.title[5]} val="pp5" class="pp5">
                            <p>We designed our first experiment to test whether the company can commit to the time constraint: We pitched six startups and asked them to run their recruitment process. 1/2 of the startups were super interested, and they shared the breakdown of their recruitment process immediately. However, when it came to execution - they were afraid to commit to the 3-week time limit!
                        </p>
                        </Paragraph>
                        <Paragraph imgShadow={true} banner={de3}>
                            <p>The hypothesis on the recruiter side seems not working. How about candidates?
                            <br />We sent out emails with a job with the 3-week guaranteed callback to candidates. However, we found that candidates may not be able to commit either. </p>
                        </Paragraph>


                        <Paragraph imgShadow={true} banner={Experiment3}>
                            <p>
                                With a total failure on validating speed commitment from both recruiter and candidate sides, we have to think about the workaround. After several discussions, we decided to take transparency apart from speed and test whether transparency matters. If neither speed nor transparency can be validated, we will have to pivot to other ideas.
                        <br /><br />
                        We sent out emails with a job description with elements of transparency. Each link is tracked by analytics to a 404 page, so we will know who clicked on what. With concerns on the mere-exposure effect, we send out a total of 120 emails in total with shaffled order of links. If candidates care about transparency, they will click on the link to see further information. If they do not care, they will directly apply to the job. Once we can prove more than 54% of people care, the value is validated.
                        </p>
                        </Paragraph>

                        <Paragraph banner={de5}>
                            <p>
                                Luckily value of transparency is validated! Below is a chart of our statistics.
                        </p>
                        </Paragraph>

                        <Paragraph banner={de2} title={Copyright.smoothHire.title[6]} val="pp6" class="pp6">
                            <p>
                                Since transparency is validated, we started to prototype the solution.
                        </p>
                        </Paragraph>

                        <br /> <br /> <br />

                        <Paragraph imgShadow={true} banner={de7} title={Copyright.smoothHire.title[7]} val="pp7" class="pp7">
                            <p>Unlike most of the job boards, our job board includes different elements of transparency in addition to the primary job description, like the recruitment process, day-to-day-life samples.</p>
                        </Paragraph>

                        <Paragraph imgShadow={true} banner={de8}>
                            <p>Also, we have sessions to allow companies to showcase their culture.</p>
                        </Paragraph>

                        <Paragraph banner={de6}>
                            <p>If you're interested in having a general view of all the pages, below is an overview.</p>
                        </Paragraph>

                        <Paragraph video={de4} title={Copyright.smoothHire.title[8]} val="pp8" class="pp8">
                            <p>
                                Watch the video demo of our prototype. If you want to know further details about anything, contact me!
                        </p>
                        </Paragraph>

                        <Paragraph noImg={true}>
                            <Link to="/"> View other projects</Link>
                        </Paragraph>
                        <br /><br /><br /><br />
                    </div>
                </div>
            </div>
        );
    }
}

export default Recruitment;