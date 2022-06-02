import React, { Component } from "react";
import { Link } from "react-router-dom";


const container = {
    display: 'flex',
    flexDirection: 'column',
    position: "fixed",
    top: 0,
    width: "100%",
    left: 0,
    zIndex: 999
}

const navigation = {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    // height: window.innerWidth > 450 ? 60 : 50,
    justifyContent: 'flex-end',
    padding: '24px 12px',
    backgroundColor: 'rgba(250, 220, 224, 0.6)'
}

const logo = {
    cursor: 'pointer',
    zIndex: 60,
    fontSize: 24,
    position: 'fixed',
    left: 12,
    top: 20,
}

class NavigationBar extends Component {

    render() {
        return (
            <div style={container}>
                <div style={navigation}>
                    {/* logo */}
                    <Link to="/">
                        <div style={logo} className="logo bold pink">Isabella Wang</div>
                    </Link>

                    <Link to="/" style={this.props.projects ? { textDecoration: 'none' } : { textDecoration: 'underlined' }} >
                        <a href="/" className="bold navigationMargin">Projects</a>
                    </Link>

                    <Link to="/contact" style={this.props.contact ? { textDecoration: 'none' } : { textDecoration: 'underlined' }}>
                        <a href="/" className="bold pink navigationMargin">About Me</a>
                    </Link>
                </div >
                {window.location.hash === '#/' ? null : <Link to="/" className="icon grey">
                    <span class="material-symbols-outlined grey">
                        arrow_back
                    </span>
                    &nbsp; Back
                </Link>}
            </div>

        )
    }

}

export default NavigationBar;
