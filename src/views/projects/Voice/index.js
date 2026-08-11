import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectContext from "../../../components/projectContext"
import $ from 'jquery';
import VoiceProduct from "../../../assets/images/home/Project card/Voice_product.svg"
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
        { title: "Impact", id: "section4" },
        { title: "Key learnings", id: "section5" }
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
                        <h1 id="title" className="fade-in">Making NFT Creation Easier for Emerging Artists</h1>
                        <div className="badgeRow" style={{ marginTop: 8 }}>
                            <span className="projectBadge">Consumer-facing</span>
                            <span className="projectBadge">Technical workflow</span>
                            <span className="projectBadge">Digital marketplace</span>
                        </div>

                        <div className="inpage_hero_container fade-in">
                            <div className="inpage_hero_box">
                                <ProjectContext duration="3 months" team="1 PM, 6 engineers, 2 designers, 1 UX researcher" role="designer"></ProjectContext>
                                <p>In 2021, Voice launched a social NFT marketplace to empower emerging artists with a simpler, more accessible minting experience. I shaped the artwork creation flow, removed jargon, and designed a platform that helped artists publish NFTs with greater confidence.{' '}
                                    <a href="https://web.archive.org/web/20211118223756/https://www.voice.com/" target="_blank" rel="noopener noreferrer">See archived product</a>
                                </p>

                            </div>
                            <div className="inpage_hero_box">
                                <img src={VoiceProduct} className="inpage_hero_img" alt="Voice NFT creator tool interface" />
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
                            <h2>Pain points</h2>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                <img loading="lazy" alt="prototypes" src={Pain1} width="307" />
                                <img loading="lazy" alt="prototypes" src={Pain2} width="319" />
                                <img loading="lazy" alt="prototypes" src={Pain3} width="267" />
                            </div>
                        </div>

                        <div className="content-block" id="section2">
                            <h2 >Friendlier UX </h2>
                            <h3>1. Simpler UX to create an NFT</h3>
                            <p>
                                One major pain point of minting NFTs is the lengthy process, often requiring over 8 steps. I simplified our platform’s process to enable users to publish artwork in just 4 steps, with the option to exclude sales.
                            </p>
                            <img loading="lazy" alt="prototypes" src={Pic2} width='100%' />

                            <h3>2. Allows co-listing with collaborators</h3>
                            <img loading="lazy" alt="prototypes" src={Pic3} width='100%' />

                            <h3>3. Explains all terminology</h3>
                            <p>
                                I identified technical terms in the NFT minting process that might be unfamiliar to non-technical users and ensured that all unavoidable jargon was accompanied by clear explanations to enhance user confidence.
                            </p>
                            <img loading="lazy" alt="prototypes" src={Pic4} width='100%' />

                        </div>
                        <div className="content-block" id="section3">
                            <h2 >Key design steps</h2>
                            <img loading="lazy" alt="prototypes" src={Pic5} width='100%' />

                            <h3>Wireframing to explore different concepts</h3>
                            <img loading="lazy" alt="prototypes" src={Pic6} width='100%' />

                            <h3>User testing</h3>
                            <img loading="lazy" alt="prototypes" src={Pic7} width='100%' />

                            <h3>Design system elements</h3>
                            <img loading="lazy" alt="prototypes" src={Pic8} width='100%' />

                            <h3>Prototypes</h3>
                            <img loading="lazy" alt="prototypes" src={Pic9} width='100%' />

                        </div>
                        <div className="content-block" id="section4">
                            <h2 >Impact</h2>
                            <p>The platform gained traction among emerging artists and helped the product earn a high-profile partnership with <a href="https://www.vogue.com/article/2023-photovogue-digital-art-collection-voice">Vogue art residency</a>.</p>
                            <img loading="lazy" alt="prototypes" src={Pic10} width='100%' />
                        </div>
                        <div className="content-block" id="section5">
                            <h2 >Key learnings</h2>
                            <h3>1. Explain technical terms</h3>
                            <p>When technical terms are unavoidable, providing tooltips with clear explanations is essential to making the technology accessible to non-technical users.</p>
                            <h3>2. Take different levels of expertise into consideration </h3>
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
