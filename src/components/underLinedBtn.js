import React from "react";
import { NavLink } from "react-router-dom";
import $ from 'jquery';
import NewPage from "../assets/icons/newPage.svg"

const underLined = {
    textDecoration: 'underline',
    borderWidth: 0,
    fontSize: 21,
    marginLeft: 0,
    padding: '16px 0px',
    marginTop: 24,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: 12,
}

class underLinedBtn extends React.Component {

    mouseEnter(e) {
        $(e.currentTarget).css('fontWeight', '800');
        $(e.currentTarget).css('backgroundColor', '#dc7dae36');
    }
    mouseOut(e) {
        $(e.currentTarget).css('fontWeight', '500');
        $(e.currentTarget).css('backgroundColor', 'transparent');
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
                        {this.props.label}<span style={{ margin: '0pt 4pt' }}>
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
                    {this.props.label}<span style={{ margin: '0pt 4pt' }}>
                            <img style={{ width: '13pt', color: 'black' }} src={NewPage} alt="new page" />
                        </span>
                </button>
            )
        );
    }
}



export default underLinedBtn;
