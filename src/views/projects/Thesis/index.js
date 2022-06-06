import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import $ from 'jquery';
import Pic1 from "../../../assets/images/Thesis/thesis_pic1.svg"
import Pic2 from "../../../assets/images/Thesis/thesis_pic2.svg"
import Pic3 from "../../../assets/images/Thesis/thesis_pic3.svg"
import Pic4 from "../../../assets/images/Thesis/thesis_pic4.svg"
import Gallary1 from "../../../assets/images/Thesis/gallery1.jpg"
import Gallary2 from "../../../assets/images/Thesis/gallery2.jpg"


class Thesis extends React.Component {

    content = [
        { title: "Journey summary", id: "section1" },
        { title: "Media 1", id: "section2" },
        { title: "Media 2", id: "section3" },
        { title: "Media 3", id: "section4" },
        { title: "After thesis ends", id: "section5" },
        { title: "Behind scene", id: "section6" }
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
        this.scrollCheck($('.page-container').scrollTop());
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
                        <h1 id="title">What will we become, now that life means living with computers?</h1>
                        <p>My thesis is a one-year research journey and self-exploration that ultimately defined my passion and research focus. You will find a collection of works that reflect my stand on the topic on this page.</p>

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
                            <h2>Journey summary</h2>
                            <p>My journey started from responding to a common theme in sci-fi, "Will AI replace humans?". I was inspired to make the Data Wall and Black Box while figuring out where the current technology stands. After I better understood artificial intelligence's limitations, I shifted my focus to the human aspect of the relationship. As an entry point to understanding human perspective, I started by emphasizing my most familiar audience, designers. I learned about the relationship between AI and designers from the world's ongoing projects, which eventually led to an envisioning piece, Integrated Assistant. By the end of the thesis, I formed a firm belief that "Technology will become the best human assistant." The journey continues regardless of my thesis's due. Today's technology falls short of being human's best assistant, so I am committed to exploring what makes an assistant good.</p>
                            <img src={Pic1} width="100%" />
                        </div>

                        <div className="content-block" id="section2">
                            <h2 >Media 1: Data Wall</h2>
                            <p>Inspired by the data mining and chemical rocket concept, I made a data visualization piece that conveys a sense of the scale of the data consumption of a machine learning project. I intend to evoke audiences questioning the source and process by visualizing conceptual classification models and databases used to implement artificial intelligence in automating the design decision process. When you see the data, you know it can hardly replace humans in creativity.</p>
                            <img src={Gallary1} width="100%" />
                            <img src={Gallary2} width="100%" />
                        </div>
                        <div className="content-block" id="section3">
                            <h2 >Media 2: Black box</h2>
                            <p>This piece is an ethical statement about machine learning. It is an interactive piece that personally brings audiences to experience the traditional problem-solving process in the computing system. It reflects the black box issue and hopes people will walk away, thinking critically about AI's reliability.
                                <a href="https://isabellawang0108.github.io/3Dprogramming/" target="_blank">Click here for original view.</a>
                            </p>
                            <iframe width="100%" height="450px" src="https://isabellawang0108.github.io/3Dprogramming/" title="Black box" name="Back box"></iframe>
                        </div>
                        <div className="content-block" id="section4">
                            <h2 >Media 3: Integrated Assistant</h2>
                            <p>This project intends to demonstrate a vision of the future designer-technology relationship. It is presented in a format of a descriptive marketing page demonstrating the features of the conceptual digital assistant. The website communicates the product’s form, usage, interaction, and pain points it intends to solve. <a href="https://thesiscampy.webflow.io/" target="_blank">Click here for details.</a></p>
                            <img src={Pic2} width="100%" />
                        </div>
                        <div className="content-block" id="section5">
                            <h2 >After thesis ends</h2>
                            <p> From this journey of interest searching, I found my passion, automation. After the thesis ended, I started my career as a product designer and continued developing my professional and interpersonal skills. I kept exploring the human-technology relationship and learning about automation in my personal life.
                            </p>
                            <p>
                                Recently, I automated my apartment and learned about integrated system technologies. This project put me closer to the human role in the human-computer relationship. I get to see the automation pain points, technical limitations, and desire for the next thing.
                            </p>
                            <p>
                                Check out "<a href="https://wangxbella0108.medium.com/how-smart-to-be-a-smart-home-d4c53322e1ff" target="_blank">How smart to be a smart home?</a>" to see my thoughts.
                            </p>
                        </div>
                        <div className="content-block" id="section6">
                            <h2 >Behind scene</h2>
                            <p>I want this page to focus on the outcome of my journey, but I know that people like to see the process and expect to see them. Thus, I decided to briefly include some behind-scenes of my above projects by the end of this reading. </p>
                            <br />
                            <h3>Research</h3>
                            <p>Most of my inspirations come from real-world products, scientific research papers, and chatting with people. I have a <a href="https://wangxbella.tumblr.com/post/616766731539693568/thesis-case-studies-ai-computer-vision-based" target="_blank">Tumblr page</a> documenting my take-away from some of the case studies if you want to see more details.</p>
                            <img src={Pic3} width="100%" />
                            <br />
                            <h3>Ideation</h3>
                            <p>My mind kept spinning while I was absorbing new information. I kept a list of ideas and evolved them through time. They are usually in the format of written notes, sketches, and mind-map. Below is one example of the efforts it takes to get one fruit.</p>
                            <img src={Pic4} width="100%" />
                            <br />
                            <h3>Iteration</h3>
                            <p>I treat my work seriously. I always figure out a way to make them better. Certain methodologies have been proven efficient for me: Pausing and reviewing with a fresh brain; Talking to people; Learning more.</p>
                        </div>
                    </ContentLayout>

                </div>
            </div>
        );
    }
}

export default Thesis;