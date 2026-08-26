import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Linkedin from "../assets/images/contact/linkedin.svg"
import Email from "../assets/images/contact/email.svg"

const RESUME_URL = "https://drive.google.com/file/d/1dbaLfbp0ysq0jpxBCEXDLSYdyJorgTE_/view?usp=sharing";

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
                    <div className="site-logo logo bold pink">
                        Isabella Wang
                    </div>
                </Link>
                <div className="site-nav-actions" aria-label="Contact links">
                    <a
                        href="https://www.linkedin.com/in/isabella-wang-310181149/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="site-nav-icon-link"
                        aria-label="LinkedIn"
                    >
                        <img src={Linkedin} alt="" aria-hidden="true" />
                    </a>
                    <a
                        href="mailto:wangxbella0108@gmail.com"
                        className="site-nav-icon-link"
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
                    Back
                </button>
            )}
        </div>
    );
};

export default React.memo(NavigationBar);
