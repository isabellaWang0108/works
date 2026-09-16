import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Linkedin from "../assets/images/contact/linkedin.svg"
import Email from "../assets/images/contact/email.svg"

const RESUME_URL = "https://drive.google.com/file/d/1scc8XYAKv6EB3kbu5vvYko-CKHW35W3-/view?usp=sharing";

const NavigationBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === "/";

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate("/");
    };

    return (
        <div className="site-nav-shell fade-in">
            <div className="site-nav-glass">
                {/* Logo */}
                <Link to="/" className="site-nav-brand-link">
                    <div className="site-nav-brand-lockup">
                        <div className="site-logo logo bold pink">
                            Isabella Wang
                        </div>
                    </div>
                </Link>
                <div className="site-nav-actions" aria-label="Primary links">
                    <Link
                        to="/projects"
                        className="site-nav-text-link site-nav-projects-link"
                        aria-label="All projects"
                    >
                        All projects
                    </Link>
                    <a
                        href="https://www.linkedin.com/in/isabella-wang-310181149/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="site-nav-icon-link site-nav-linkedin-link"
                        aria-label="LinkedIn"
                    >
                        <img src={Linkedin} alt="" aria-hidden="true" />
                    </a>
                    <a
                        href="mailto:wangxbella0108@gmail.com"
                        className="site-nav-icon-link site-nav-email-link"
                        aria-label="Email Isabella Wang"
                    >
                        <img src={Email} alt="" aria-hidden="true" />
                    </a>
                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="site-nav-link bold pink"
                        aria-label="Resume"
                    >
                        Resume
                        <span className="site-nav-resume-arrow" aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>

            {!isHomePage && (
                <button
                    type="button"
                    onClick={goBack}
                    className="icon backbtn back-btn-fixed"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span className="back-btn-label">Back</span>
                </button>
            )}
        </div>
    );
};

export default React.memo(NavigationBar);
