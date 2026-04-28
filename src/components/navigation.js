import React from "react";
import { Link, useLocation } from "react-router-dom";


const container = {
    display: 'flex',
    flexDirection: 'column',
    position: "fixed",
    top: 0,
    width: "100vw",
    left: 0,
    zIndex: 999
}

const navigation = {
    width: "100vw",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '20px 0px',
    alignItems: 'center',
    backgroundColor: '#171717c9',
    backdropFilter: 'blur(10pt)'
}

const logo = {
    cursor: 'pointer',
    zIndex: 60,
    fontSize: 24,
    position: 'fixed',
    left: 12,
    top: window.innerWidth > 450 ? 20 : 14,
}


const NavigationBar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/"; // Adjust if needed

    return (
        <div style={container} className="fade-in">
            <div style={navigation}>
                {/* Logo */}
                <Link to="/">
                    <div style={logo} className="logo bold pink">
                        Isabella Wang
                    </div>
                </Link>
                <a
                    href="https://drive.google.com/file/d/1dbaLfbp0ysq0jpxBCEXDLSYdyJorgTE_/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: '16pt', textDecoration: 'none' }}
                    className="bold pink"
                >
                    Resume
                </a>
            </div>

            {!isHomePage && (
                <button
                    onClick={() =>( window.history.back())}
                    className="icon backbtn"
                    style={{ width: '88px' }}
                >
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    Back
                </button>
            )}
        </div>
    );
};

export default NavigationBar;