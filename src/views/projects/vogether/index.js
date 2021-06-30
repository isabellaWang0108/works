import React from "react";
import { Link } from "react-router-dom";


import Paragraph from "../../../components/paragraph"
import Prelude from "../../../components/prelude"
// import Bullet from "../../../components/bullet"
import Navi from "../../../components/navi"
import Copyright from "../../../assets/copyright/projects_Copyright.json"
import NavigationBar from "../../../components/navigation"

// import pro1 from "./logo.png"
import pro2 from "../../../assets/images/vogether/competitor.png"
import pro3 from "../../../assets/images/vogether/workflow.png"
import pro4 from "../../../assets/images/vogether/1-emotion.gif"
import pro5 from "../../../assets/images/vogether/2-record.gif"
import pro6 from "../../../assets/images/vogether/3-chat.gif"
import pro7 from "../../../assets/images/vogether/4-share.jpg"
import pro8 from "../../../assets/images/vogether/5-reaction.gif"
import pro9 from "../../../assets/images/vogether/hi.jpeg"


import de1 from "../../../assets/images/vogether/research.png"
import de2 from "../../../assets/images/vogether/storyboard.jpg"
import de4 from "../../../assets/images/vogether/prototype.png"
import de5 from "../../../assets/images/vogether/user.png"

import $ from 'jquery';
import ReactGA from 'react-ga';

const container = {
    paddingTop: window.innerWidth > 450 ? 60 : 50,
    left: 0,
    position: 'fixed',
    width: '100%',
    overflow: 'scroll',
    height: "100vh"
}

class Vogether extends React.Component {

    componentDidMount() {
        ReactGA.initialize('UA-148443721-2', { testMode: true });
    }

    onClick = (e) => {
        e.preventDefault();
        const selectPosition = $(".p" + e.target.className).position().top;
        $('#vogether').animate({ scrollTop: selectPosition }, 700);

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
        for (var i = 0; i < Copyright.vogether.title.length - 1; i++) {
            if (thePosition > $(".pp" + i).position().top - 120 && thePosition < $(".pp" + (i + 1)).position().top) {
                this.neutral();
                this.turnPink('p' + i);
            }
        }

        // for the last item in the menu
        if (thePosition > $(".pp" + (Copyright.vogether.title.length - 1)).position().top) {
            this.neutral();
            this.turnPink('p' + (Copyright.vogether.title.length - 1));
        }
    }
    handleScroll = e => {
        e.preventDefault();
        this.scrollCheck($('#vogether').scrollTop())

    }

    render() {
        return (
            <div>

                <NavigationBar
                    projects
                    onClick={() => {
                        ReactGA.event({
                            category: 'back to homepage',
                            action: "back to home from vogether"
                        })
                    }}
                />
                <Navi />
                <div id="vogether" style={container} onScroll={this.handleScroll}>

                    {/* navigation bar ==============================================================================================  */}
                    <div id="navi" className="animated slideInDown">
                        
                        <div id="content">
                            <ul>Design Process
                            {Copyright.vogether.title.map((item, index) => {
                                return (
                                    <li key={index} onClick={this.onClick} className={"p" + index}>{item}
                                    </li>
                                )
                            })}
                            </ul>


                            {/* <div id="recommend">
                            <br />
                            <ul>More projects like this<br />

                                {Copyright.vogether.otherProjects.map((item, index) => {
                                    return (
                                        <Link key={index} to={item.link}>{item.name}<br /></Link>
                                    )
                                })}
                            </ul>
                        </div> */}

                        </div>
                    </div>
                    {/*contect itself ==============================================================================================                  */}
                    <div id="info">
                        <Prelude
                            imgSrc={pro7}
                            descrip={Copyright.vogether.descrip}
                            name={Copyright.vogether.name}
                            challenge={Copyright.vogether.challenge}
                            myrole={Copyright.vogether.myrole}
                            for={Copyright.vogether.for} />

                        <Paragraph banner={de1} title={Copyright.vogether.title[0]} val="pp0" class="pp0">
                            <p>{Copyright.vogether.content.research[0]}</p>
                        </Paragraph>

                        <Paragraph banner={de2} title={Copyright.vogether.title[1]} val="pp1" class="pp1">
                            <p>{Copyright.vogether.content.storyBoarding}
                            </p>
                        </Paragraph>


                        <Paragraph banner={pro2} title={Copyright.vogether.title[2]} val="pp2" class="pp2">
                            <p>{Copyright.vogether.content.competitor}
                            </p>
                        </Paragraph>


                        <Paragraph banner={pro3} title={Copyright.vogether.title[3]} val="pp3" class="pp3">
                            <p> {Copyright.vogether.content.userFlow}</p>
                        </Paragraph>


                        <Paragraph banner={de4} title={Copyright.vogether.title[4]} val="pp4" class="pp4">
                            <p>{Copyright.vogether.content.prototype}
                            </p>
                        </Paragraph>


                        {/* all for demo=====================================++======+++++========================================================================================================== */}
                        <Paragraph banner={de5} title={Copyright.vogether.title[5]} val="pp5" class="pp5">
                            <p> {Copyright.vogether.content.usability}</p>
                        </Paragraph>

                        <Paragraph banner={pro4} title={Copyright.vogether.title[6]} val="pp6" class="pp6">
                            <p>Below is a display of my final work</p>
                            <br />
                            <span className="bold">Random exposure</span>
                            <p>Each user will record their own stories and listen to other people's stories according to emotions at the moment. Each color represents a mood.</p>
                        </Paragraph>

                        <Paragraph banner={pro5} >
                            <span className="bold">Record your story</span>
                            <p>You can record whatever you want to say. But be aware of what you say in each one, because the system only allows users to post a new one 2 hours after you send your recording.
                        </p>
                        </Paragraph>

                        <Paragraph banner={pro6}>
                            <span className="bold">Getting attention</span>
                            <p>Loneliness doesn't exist here. After you send your record, it will be posted for 2 hours. You will be able to see all the people listen to your story. THERE IS ALWAYS SOMEBODY LISTENING TO YOU! You can also chat with them if you want.
                        </p>
                        </Paragraph>

                        <Paragraph banner={pro7}>
                            <span className="bold">Record your story</span>
                            <p>Loneliness doesn't exist here. After you send your record, it will be posted for 2 hours. You will be able to see all the people listen to your story. THERE IS ALWAYS SOMEBODY LISTENING TO YOU! You can also chat with them if you want.
                        </p>
                        </Paragraph>

                        <Paragraph banner={pro8}>
                            <span className="bold">Emotion Archive</span>
                            <p>We will archive all your stories in your profile and corresponsive an analysis of the audiences. Share the trophies with your friends on social media! Have fun!
                        </p>
                        </Paragraph>

                        <Paragraph banner={pro9} title={Copyright.vogether.title[7]} val="pp7" class="pp7">
                            <p>It is just loneliness fulfilling app. We do not require you to provide any confidential information. The only thing you need to initiate it is an account, preferred name, and preferred location. We don't even care about their authenticity. You do not have to put in anything you don't want to. We will get to know you that you like us to know.

</p>
                        </Paragraph>

                        <Paragraph noImg={true}>
                            <Link to="/"> View other projects</Link>
                        </Paragraph>
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />




                    </div>
                </div>
            </div>
        );
    }
}

export default Vogether;