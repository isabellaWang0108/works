import React from "react";
import { Link } from "react-router-dom";

import Navi from "../../../components/navi"
import Paragraph from "../../../components/paragraph"
import Prelude from "../../../components/prelude"
import Copyright from "../../../assets/copyright/projects_Copyright.json"
import NavigationBar from "../../../components/navigation"
import Deck from "../../../assets/copyright/Alwa_Product_Introduction.pdf"

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
class Venture extends React.Component {

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
        for (var i = 0; i < Copyright.venture.title.length - 1; i++) {
            if (thePosition > $(".pp" + i).position().top - 120 && thePosition < $(".pp" + (i + 1)).position().top) {
                this.neutral();
                this.turnPink('p' + i);
            }
        }

        // for the last item in the menu
        if (thePosition > $(".pp" + (Copyright.venture.title.length - 1)).position().top) {
            this.neutral();
            this.turnPink('p' + (Copyright.venture.title.length - 1));
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

                            <ul>Content
                        {Copyright.venture.title.map((item, index) => {
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
                            imgSrc={' '}
                            name="Startup Venture"
                            challenge="This is a venture of finding out how to help people to flourish in their life. I interviewed more than 20 potential users, including industry professionals, professional life coaches, and university students, to know people's pain points and behaviors. The market fit kept shifting after we gained more in-depth customer insight. It was challenging to find the market fit, but we still found possible gaps among all the existing competitors to bring something new." />



                        <Paragraph banner={' '} title={Copyright.venture.title[2]} val="pp0" class="pp0">
                            <a href="https://medium.com/@wangxbella0108/what-i-learnt-from-my-users-about-life-coach-c7d4e1dfaf16">
                                <h1>What I learnt from my users about life coach?</h1>
                            </a>

                            <a href="https://medium.com/@wangxbella0108/what-are-peoples-attitude-towards-life-coach-54f99a738371">
                                <h1>What are people’s attitude towards life coach?</h1>
                            </a>

                            <a href="https://medium.com/@wangxbella0108/what-is-mentorship-do-i-need-it-79a23ffc64a3">
                                <h1>What is mentorship? Do I need it?</h1>
                            </a>

                        </Paragraph>

                        <Paragraph banner={' '} title={Copyright.venture.title[3]} val="pp1" class="pp1">
                            <a href="https://medium.com/@wangxbella0108/you-cant-get-it-right-you-can-commit-to-the-mistake-f11dc6e4573e">
                                <h1>You can’t get it right ≠ you can commit to the mistakes</h1>
                            </a>

                            <a href="https://medium.com/@wangxbella0108/business-thinking-vs-product-thinking-4639f66c7ed6">
                                <h1>Business thinking vs Product thinking</h1>
                            </a>

                        </Paragraph>


                        <Paragraph banner={' '} title={Copyright.venture.title[0]} val="pp2" class="pp2">
                            <p>
                                <iframe src={Deck} title="title1" width="100%" height="500px"></iframe>
                            </p>

                        </Paragraph>

                        <Paragraph banner={' '} title={Copyright.venture.title[1]} val="pp3" class="pp3">

                            <p>User onboarding</p>
                            <iframe src="https://drive.google.com/file/d/1EpWCAdyjkTmuZJyS4eUX2jK8URIzF5fn/preview" title="title2" width="640" height="400"></iframe>
                            <br />
                            <p>Finding mentor</p>
                            <iframe src="https://drive.google.com/file/d/1QN2FlK-PJ-wFvAJRoKy57ByBnWQ-hrfo/preview" title="title3" width="640" height="400"></iframe>


                            <br /><br /><br /><br /><br /><br />
                            <Link to="/"> View other projects </Link>

                        </Paragraph>





                        <br /><br /><br /><br />




                        <br /><br /><br /><br />
                    </div>
                </div>
            </div>
        );
    }
}

export default Venture;