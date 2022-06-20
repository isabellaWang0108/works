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
    justifyContent: 'flex-end',
    padding: '20px 12px',
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

    handleBack() {
        window.history.back()
    }

    render() {
        return (
            <div style={container}>
                <div style={navigation}>
                    {/* logo */}
                    <Link to="/">
                        <div style={logo} className="logo bold pink">Isabella Wang</div>
                    </Link>

                    <Link to="/contact" style={this.props.contact ? { textDecoration: 'none' } : { textDecoration: 'underlined' }}>
                        <a href="/" className="bold pink navigationMargin">Project list</a>
                    </Link>
                </div >
                {window.location.hash === '#/' ? null : <a onClick={this.handleBack} className="icon grey">
                    <span className="material-symbols-outlined grey">
                        arrow_back
                    </span>
                    &nbsp; Back
                </a>}
            </div>

        )
    }

}

export default NavigationBar;
