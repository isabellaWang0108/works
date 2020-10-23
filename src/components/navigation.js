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
    Logoclick = () => {
        window.location.href = "/";
    }
    render() {
        return (
            <div onClick={this.props.onClick} style={navigation}>
                {/* logo */}
                <div style={logo} onClick={this.Logoclick} className="logo bold pink">Isabella Wang</div>
                {/* contact button */}
                {this.props.contact ?
                    <Link to="/contact">
                        <h1 className="bold pink navigationMargin">contact</h1>
                    </Link>
                    : null}
                {/* project button */}
                {this.props.projects ? <a className="bold navigationMargin" onClick={this.Logoclick} href='/'>projects</a> : null}
            </div>
        )
    }

}

export default NavigationBar;
