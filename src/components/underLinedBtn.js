import React from "react";
import { NavLink } from "react-router-dom";
import $ from 'jquery';
import NewPage from "../assets/icons/newPage.svg"

const button = {
    borderWidth: 2,
    padding: 12,
    cursor: 'pointer',
    color: "white",
    fontSize: 24,
    borderRadius: 12,
    marginLeft: 0,
    marginTop: 24,
    position: 'relative',
    zIndex: 80,
    backgroundColor: 'transparent',
    borderColor: 'white',
    boxSizing: 'border-box'
}

const underLined = {
    textDecoration: 'underline',
    borderWidth: 0,
    fontSize: 24,
    marginLeft: 0,
    padding: 0,
    marginTop: 24,
    backgroundColor: 'transparent',
    cursor: 'pointer',
}

class underLinedBtn extends React.Component {

    mouseEnter(e) {
        $(e.currentTarget).css('fontWeight', '800');
        $(e.currentTarget).css('fontSize', 26);
        $(e.currentTarget).css('opacity', '.8');
    }
    mouseOut(e) {
        $(e.currentTarget).css('fontWeight', '500')
        $(e.currentTarget).css('fontSize', 24);
        $(e.currentTarget).css('opacity', '1');
    }

    render() {
        return (
            this.props.innerLink ? (
                <NavLink to={this.props.link}>
                    <button
                        style={underLined}
                        onMouseEnter={this.mouseEnter}
                        onMouseOut={this.mouseOut}
                        onClick={(e) => e.stopPropagation()} // Prevent bubbling issues
                    >
                        {this.props.label} <span style={{ margin: '0pt 4pt' }}>
                            <img style={{ width: '13pt', color: 'black' }} src={NewPage} alt="new page" />
                        </span>
                    </button>
                </NavLink>
            ) : (
                <button
                    style={underLined}
                    onMouseEnter={this.mouseEnter}
                    onMouseOut={this.mouseOut}
                    onClick={(e) => {
                        e.preventDefault();
                        window.open(this.props.link, "_blank");
                    }}
                >
                    {this.props.label} <span style={{ margin: '0pt 4pt' }}>
                            <img style={{ width: '13pt', color: 'black' }} src={NewPage} alt="new page" />
                        </span>
                </button>
            )
        );
    }
}



export default underLinedBtn;
