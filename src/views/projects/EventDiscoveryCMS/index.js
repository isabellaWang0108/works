import React from "react";
import ContentLayout from "../../../components/contentLayout"
import NavigationBar from "../../../components/navigation"
import Back2Top from "../../../components/back2top"
import ProjectHero from "../../../components/projectHero"
import { EVENT_DISCOVERY_CMS_TAGS } from "../../../components/projectTags"
import HERO_PROJECT_DETAILS from "../../../data/heroProjectDetails"
import PROJECT_SUMMARIES from "../../../data/projectSummaries"
import $ from 'jquery';
import InpageContactMe from "../../../components/inpage_contactme"

import NYTangoProduct from "../../../assets/images/home/Project card/NYTango_product.png"
import ResponsiveEvent from "../../../assets/images/NYTango/responsive_event.png"
import DifferentMentalModel from "../../../assets/images/NYTango/different_mental_modal.png"
import Theme from "../../../assets/images/NYTango/theme.png"
import DifferentAdminView from "../../../assets/images/NYTango/different_admin_view.png"
import ComplexWorkflow from "../../../assets/images/NYTango/complex_workflow.png"
import InterdependentLogic from "../../../assets/images/NYTango/interdependent_logic.png"

class EventDiscoveryCMS extends React.Component {
    activeSection = null;
    scrollCheckFrame = null;
    scrollCheckLastRun = 0;

    content = [
        { title: "Context", id: "section1" },
        { title: "Consumer discovery", id: "section2" },
        { title: "Admin CMS", id: "section3" },
        { title: "Impact", id: "section4" },
    ]

    turnPink = (theclass) => {
        $("." + theclass + " button").css("font-weight", "normal")
            .css("border", "solid 1px #BDBBBE")
            .css("background", "rgba(252, 34, 147, 0.12)")
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

        if (activeSection !== this.activeSection) {
            this.activeSection = activeSection;
            this.neutral();
            this.turnPink('p' + activeSection);
        }
        $('#back2Top').css("display", activeSection >= 2 ? "inherit" : "none");
    }

    menuItem(val) {
        const container = $('.page-container');
        const selectPosition = this.getSectionScrollTop($("#section" + val), container);
        this.activeSection = val;
        this.neutral();
        this.turnPink('p' + val);
        $('#back2Top').css("display", val >= 2 ? "inherit" : "none");
        container.animate({ scrollTop: Math.max(selectPosition - 96, 0) }, 100, () => this.scrollCheck());
    }

    handleScroll = () => {
        const now = window.performance.now();
        if (now - this.scrollCheckLastRun < 80) {
            return;
        }

        if (this.scrollCheckFrame) {
            return;
        }

        this.scrollCheckFrame = window.requestAnimationFrame(() => {
            this.scrollCheckFrame = null;
            this.scrollCheckLastRun = window.performance.now();
            this.scrollCheck();
        });
    }

    componentWillUnmount() {
        if (this.scrollCheckFrame) {
            window.cancelAnimationFrame(this.scrollCheckFrame);
        }
    }

    render() {
        return (
            <div className="page-container project-page" onScroll={this.handleScroll}>
                <NavigationBar />
                <Back2Top onClick={() => $('.page-container').animate({ scrollTop: 0 }, 100)} />
                <div>
                    <ContentLayout>
                        <ProjectHero
                            className="event-discovery-hero"
                            title={PROJECT_SUMMARIES.NYTango.title}
                            tags={EVENT_DISCOVERY_CMS_TAGS}
                            duration="2 months"
                            team="1 AI-augmented designer"
                            role="Product design, Full-stack dev"
                            summary={PROJECT_SUMMARIES.NYTango.summary}
                            ownership={HERO_PROJECT_DETAILS.NYTango.ownership}
                            image={NYTangoProduct}
                            imageAlt="NY Tango event discovery and management interface"
                            stats={[
                                { label: "Duration", value: "2 mo" },
                                { label: "Design + dev", value: "Lead" },
                                { label: "AI-augmented designer", value: "1" },
                            ]}
                        />

                        <div className="animated slideInDown content-block left-nav">
                            <ul>
                                <p className="left_nav_title">Content</p>
                                {this.content.map((item, index) => (
                                    <li key={index} onClick={() => this.menuItem(index + 1)} className={"p" + (index + 1)}>
                                        <button className="inpage_menu_item">{item.title}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="content-block fade-in" id="section1">
                            <h2>Context</h2>
                            <ul className="context-points">
                                <li><strong>Scattered discovery:</strong> local events lived across social posts, private groups, outdated calendars, and organizer spreadsheets.</li>
                                <li><strong>Two audiences:</strong> attendees needed fast confidence in what to attend, while organizers needed a reliable way to publish and update event details.</li>
                                <li><strong>Core design challenge:</strong> make one event data model work across different mental models, from casual browsing to structured schedule management.</li>
                            </ul>
                        </div>

                        <div className="content-block" id="section2">
                            <h2>Consumer discovery</h2>
                            <h3>Responsive event discovery</h3>
                            <img loading="lazy" decoding="async" src={ResponsiveEvent} alt="Responsive event discovery screens across devices" style={{ width: "100%", display: "block" }} />

                            <h3>Same information, different mental models</h3>
                            <img loading="lazy" decoding="async" src={DifferentMentalModel} alt="Same event information presented for different user mental models" style={{ width: "100%", display: "block" }} />

                            <h3>Dark and light mode</h3>
                            <img loading="lazy" decoding="async" src={Theme} alt="Dark and light mode event discovery interface" style={{ width: "100%", display: "block" }} />
                        </div>

                        <div className="content-block" id="section3">
                            <h2>Admin CMS</h2>
                            <h3>Different edit needs for different mental models</h3>
                            <img loading="lazy" decoding="async" src={DifferentAdminView} alt="Admin table and calendar views for different editing mental models" style={{ width: "100%", display: "block" }} />

                            <h3>Goal-dependent workflows</h3>
                            <p>
                                Each event type required different inputs, so the modal adapted to the organizer’s chosen workflow.
                            </p>
                            <img loading="lazy" decoding="async" src={ComplexWorkflow} alt="Goal-dependent event creation workflow with different input paths" style={{ width: "100%", display: "block" }} />
                            <h3>Interdependent event logic</h3>
                            <p>
                                Event setup had connected rules across venues, schedules, pricing, and publishing. I made those dependencies visible so admins could move through complex updates without breaking event data.
                            </p>
                            <img loading="lazy" decoding="async" src={InterdependentLogic} alt="Interdependent event logic for venue, schedule, class, and organizer updates" style={{ width: "100%", display: "block" }} />
                        </div>

                        <div className="content-block" id="section4">
                            <h2>Impact</h2>
                            <div className="impact-metric-list">
                                <ul>
                                    <li><strong>80% less manual operations</strong> by automating recurring event creation.</li>
                                    <li><strong>Intuitive across mental models</strong> with views that fit different planning and editing use cases.</li>
                                    <li><strong>Maintenance time cut from hours to minutes</strong> by modularizing reusable data and replacing scattered updates with structured organizer workflows.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-block">
                            <InpageContactMe />
                        </div>

                    </ContentLayout>
                </div>
            </div>
        );
    }
}

export default EventDiscoveryCMS;
