import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import Pic1 from "../../../assets/images/Voice/pic_1.png"
import Pic2 from "../../../assets/images/Voice/pic_2.svg"
import Pic3 from "../../../assets/images/Voice/pic_3.png"
import Pic4 from "../../../assets/images/Voice/pic_4.png"
import Pic5 from "../../../assets/images/Voice/pic_5.svg"
import Pic6 from "../../../assets/images/Voice/pic_6.png"
import Pic7 from "../../../assets/images/Voice/pic_7.png"
import Pic8 from "../../../assets/images/Voice/pic_8.png"
import Pic9 from "../../../assets/images/Voice/pic_9.png"
import Pic10 from "../../../assets/images/Voice/pic_10.png"
import Pain1 from "../../../assets/images/Voice/pain_1.svg"
import Pain2 from "../../../assets/images/Voice/pain_2.svg"
import Pain3 from "../../../assets/images/Voice/pain_3.svg"
import InpageContactMe from "../../../components/inpage_contactme"

class Voice extends React.Component {

    content = [
        { title: "Pain points", id: "section1" },
        { title: "Friendlier UX", id: "section2" },
        { title: "Key design steps", id: "section3" },
        { title: "Impacts", id: "section4" },
        { title: "Key learnings", id: "section5" }
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
                        <h1 id="title">Lower the NFT creation barrier</h1>

                        <div className="inpage_hero_container">
                            <div className="inpage_hero_box">
                            <ProjectContext duration="3 months" team="1 PM, 6 engineers, 2 designers, 1 UX researcher" role="designer"></ProjectContext>
                            <p>In 2021, Voice launched a social NFT marketplace aimed at empowering emerging artists by offering a unique, free minting feature powered by the EOSIO protocol. I had the opportunity to take ownership in shaping the platform, from designing the artwork creation process to shaping the viewing experience from the ground up.
                        </p>
                                 </div>
                            <div className="inpage_hero_box">
                                <img src={Pic1} className="inpage_hero_img" alt="img" />
                            </div>
                        </div>


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
                            <h2>Pain points</h2>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                <img alt="prototypes" src={Pain1} width="307" />
                                <img alt="prototypes" src={Pain2} width="319" />
                                <img alt="prototypes" src={Pain3} width="267" />
                            </div>
                        </div>

                        <div className="content-block" id="section2">
                            <h2 >Friendlier UX </h2>
                            <h3>1. Simpler UX to create an NFT</h3>
                            <p>
                                One major pain point of minting NFTs is the lengthy process, often requiring over 8 steps. I simplified our platform’s process to enable users to publish artwork in just 4 steps, with the option to exclude sales.
                            </p>
                            <img alt="prototypes" src={Pic2} width='100%' />

                            <h3>2. Allows co-listing with collaborators</h3>
                            <img alt="prototypes" src={Pic3} width='100%' />

                            <h3>3. Explains all terminology</h3>
                            <p>
                                I identified technical terms in the NFT minting process that might be unfamiliar to non-technical users and ensured that all unavoidable jargon was accompanied by clear explanations to enhance user confidence.
                            </p>
                            <img alt="prototypes" src={Pic4} width='100%' />

                        </div>
                        <div className="content-block" id="section3">
                            <h2 >Key design steps</h2>
                            <img alt="prototypes" src={Pic5} width='100%' />

                            <h3>Wireframing to explore different concepts</h3>
                            <img alt="prototypes" src={Pic6} width='100%' />

                            <h3>User testing</h3>
                            <img alt="prototypes" src={Pic7} width='100%' />

                            <h3>Design system elements</h3>
                            <img alt="prototypes" src={Pic8} width='100%' />

                            <h3>Prototypes</h3>
                            <img alt="prototypes" src={Pic9} width='100%' />

                        </div>
                        <div className="content-block" id="section4">
                            <h2 >Impact</h2>
                            <p>The platform has gained popularity among emerging artists, and it has secured a partnership with <a href="https://www.vogue.com/article/2023-photovogue-digital-art-collection-voice">Vogue art residency</a>.</p>
                            <img alt="prototypes" src={Pic10} width='100%' />
                        </div>
                        <div className="content-block" id="section5">
                            <h2 >Key learnings</h2>
                            <h3>1. Explain technical terms</h3>
                            <p>When technical terms are unavoidable, providing tooltips with clear explanations is essential to making the technology accessible to non-technical users.
                                <h3>2. Take different levels of expertise into consideration </h3>
                            </p>
                            <p>Since users have varying levels of experience, designing tailored user flows is crucial to prevent user drop-off.</p>

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

export default Voice;