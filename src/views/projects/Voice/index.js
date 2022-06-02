import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import $ from 'jquery';
import Pic1 from "../../../assets/images/Voice/voice_pic1.svg"
import Pic2 from "../../../assets/images/Voice/voice_pic2.svg"
import Pic3 from "../../../assets/images/Voice/voice_pic3.svg"
import Pic4 from "../../../assets/images/Voice/voice_pic4.svg"
import Pic5 from "../../../assets/images/Voice/voice_pic5.svg"
import Pic6 from "../../../assets/images/Voice/voice_pic6.svg"
import Pdf1 from "../../../assets/images/Voice/competitive-analysis.pdf"

class Voice extends React.Component {

    content = [
        { title: "Overview", id: "section1" },
        { title: "Research", id: "section2" },
        { title: "Competitive analysis", id: "section3" },
        { title: "Product and UX alignment", id: "section4" },
        { title: "Rapid prototyping", id: "section5" },
        { title: "User testing", id: "section6" },
        { title: "Iteration", id: "section7" },
        { title: "To be continued", id: "section8" }
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
                <Back2Top />
                <div >

                    {/*contect itself ==============================================================================================                  */}
                    <ContentLayout>
                        <h1 id="title">Designing an NFT creation feature for everyday users</h1>
                        <p>This case study demonstrates my workflow in a generic product design project. You will see one of my works at Voice: designing an NFT minting feature for everyday users.</p>

                        {/* menu bar ==============================================================================================  */}
                        <div className="animated slideInDown content-block left-nav">
                            {/* menu */}
                            <ul>Content
                                {this.content.map((item, index) => {
                                    return (
                                        <li key={index} className={"p" + (index + 1)}>
                                            <a to={"#" + item.id}>{item.title}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="content-block" id="section1">
                            <h2>Overview</h2>
                            <p>Determined by the business and marketing decision, my product manager brought me a task, “designing an NFT minting feature for everyday users.” I started this project with an abstract goal and a list of product requirements.
                            </p>
                            <p>  Below is a brief of my workflow. It is a double-diamond process in general. Research is to discover the problem. Competitive analysis is to define the pain points. Product and UX alignment is to loop in early feedback from a cross-functional team. As projects usually have a short amount of time to work on at a startup, for me, rapid prototyping serves as both ideation and “wireframe” to explore the potential solutions. If time allows, I recruit users through usertesting.com to validate my design and iterate to address the issues before I deliver. I hand off pixel-perfect prototypes in the delivery and set up success metrics with PM to pave for future iterations. Just like most of the design, it’s a never-ending journey. After delivery, the project keeps going. It usually can go back to any step within the process based on our feedback.</p>
                            <img src={Pic1} />
                        </div>

                        <div className="content-block" id="section2">
                            <h2 >Research</h2>
                            <p>Partnered with a user researcher and consultant from the marketing team, we put together some general personas of “everyday users”. As the persona details are confidential, I won’t list them out here. From the interviews with our target users, we came to top three pain points that our users are facing:</p>
                            <ol>
                                <li>Lengthy process (On average it takes more than 7 steps to mint an NFT )</li>
                                <li>Unintuitive terminology(e.g. gas fee, minting fee, royalty fee...)</li>
                                <li>Expensive ($150 minting fee, 20% transaction fee)</li>
                            </ol>
                            <p>As Voice has a patent blockchain with low gas fee, we were at a unique position offering a cheaper and affordable platform. Hence, my focus really comes down to bringing down the barrier and complexity of the NFT space for non-techy, non-crypto-savvy users.</p>

                        </div>
                        <div className="content-block" id="section3">
                            <h2 >Competitive analysis</h2>
                            <p>With insights on user pain points, I looked into the existing platforms and saw what we could do differently to be better than other NFT minting platforms. </p>
                            <p>From the analysis, I learned what really needed for us to do better was to make the daunting creation form friendly and explain the terminologies better. But how do we do that?</p>
                            <iframe width="100%" height="450px" src={Pdf1} title="Black box" name="Back box"></iframe>
                        </div>
                        <div className="content-block" id="section4">
                            <h2 >Product and UX alignment</h2>
                            <p>After learning from the user research, I did a workshop with my product manager and engineer on creating a user flow to ensure my design not only addresses my solution but also captures the feature and technical requirement.</p>
                            <img src={Pic2} width="100%" />
                            <p> For the lengthy process pain point, I proposed different ways to shorten the steps by</p>
                            <ol>
                                <li> Making authentification optional in the creation.</li>
                                <li>Reduce the amount of data we ask from the users.</li>
                                <li>Letting users sign up through Google or Facebook</li>
                            </ol>
                            <br />
                            <p>To make the terminology friendly, I proposed</p>
                            <ol>
                                <li>Using alternative vocabulary if applicable.</li>
                                <li>Adding helper text or tooltips beside jargon so users can learn as they create.</li>
                            </ol>
                            <img src={Pic3} width="100%" />
                            <p>However, some ideas got pushed back by engineers due to technical constraints. For example, we do not want to cut certain data for simplicity because there is a required data model for information to log into the blockchain in the first place. Some ideas were pushed back from PMs because a simpler UX will compromise the business’s selling point. For example, we don’t want to compromise the authentification before users can sell the NFT as “real user” is one major selling point to ensure the authenticity of the NFTs on our platform. </p>
                            <p>In the end, the best thing I could do at the moment was to divide the information into digestible pieces. The minting process is lengthy, but the technical requirement doesn't allow the total number of steps to be shortened; Terminologies are unfriendly, but most of them have no daily-vocabulary alternative.</p>
                        </div>
                        <div className="content-block" id="section5">
                            <h2 >Rapid prototyping</h2>
                            <p> I started prototyping with a clear idea about what I needed to address. Below is a screenshot of my exploration board.
                            </p>
                            <img src={Pic4} width="100%" />
                        </div>
                        <div className="content-block" id="section6">
                            <h2 >User testing</h2>
                            <p>
                                The user testing and prototyping always go hand-in-hand. Below is one of the user testing I ran to A/B test the most intuitive interaction of splitting creator share in the creation flow.
                                <a href="https://github.com/isabellaWang0108/Multi-authorship-UX-testing-autoFill">See Github page for details</a>.
                            </p>
                            <img src={Pic5} width="100%" />
                        </div>
                        <div className="content-block" id="section7">
                            <h2>Iteration</h2>
                            <p>After several design reviews and iterations, I landed on the below prototype for the release. </p>
                            <p>In the design, I addressed the pain points by
                                <ol>
                                    <li>Splitting the form into multiple steps so the information does not overload the users.</li>
                                    <li>Making sure each step doesn't contain more than 5 items so users don't feel the page is daunting.</li>
                                    <li>Having preview on the side to provide instant feedback on every action, so users keep motivated.</li>
                                    <li>Providing tooltips on potentially tricky vocabularies.</li>
                                </ol>
                                <p>See the prototype below.</p>
                                <iframe src="https://drive.google.com/file/d/1X6v-gczHJYD-1jD5jTj0HUrgqYf8EWfv/preview" width="100%" height="480"></iframe>
                            </p>
                        </div>
                        <div className="content-block" id="section8">
                            <h2>delivery</h2>
                            <p>In addition to handling the prototype and interaction specs, I also think about the error and edge cases handling. In this case, it contains
                                <ol>
                                    <li>Thumbnails representing different media types.</li>
                                    <li>Visuals for an extreme large number of creators displaying.</li>
                                    <li>Errors when editing the credits.</li>
                                </ol>
                            </p>
                            <img src={Pic6} width="100%" />
                        </div>
                        <div className="content-block" id="section9">
                            <h2>To be continued</h2>
                            <p>Just like all the design projects, it is a never-ending process. Delivery is a pause, not an end. Upon delivery, I set up a success metric with my product manager to track the potential improvement in the future. For this creation project, the quantitative data is a high success rate in the creation, from users uploading a media to minting it successfully. The qualitative data is a creator’s feeling. We keep track of data and receive user feedback to keep improving the feature.</p>
                        </div>
                    </ContentLayout>

                </div>
            </div>
        );
    }
}

export default Voice;