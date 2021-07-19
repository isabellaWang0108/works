import React, { Component } from "react";
import { Link } from "react-router-dom";

const navigation = {
    position: "fixed",
    top: 0,
    width: "100%",
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    zIndex: 999,
    height: window.innerWidth > 450 ? 60 : 50,
    justifyContent: 'flex-end',
    paddingTop: 12
}

const logo = {
    cursor: 'pointer',
    zIndex: 60,
    fontSize: 24,
    position: 'fixed',
    left: 12,
    top: 12
}

// const yellowColor = {
//     color: '#f2911f'
// }
class NavigationBar extends Component {

    render() {
        return (
            <div onClick={this.props.onClick} style={navigation}>
                {/* logo */}
                <Link to="/">
                    <div style={logo} className="logo bold pink">Isabella Wang</div>
                </Link>
                {/* contact button */}
                {this.props.contact ?
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <a className="bold pink navigationMargin">About Me</a>
                    </Link>
                    : null}
                {/* project button */}
                {this.props.projects ?
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <a className="bold navigationMargin">Projects</a>
                    </Link> : null}
            </div>
        )
    }

}

export default NavigationBar;
