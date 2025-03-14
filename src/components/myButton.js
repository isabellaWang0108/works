import React from "react";
import { NavLink } from "react-router-dom";
import $ from 'jquery';

const button = {
    borderWidth: 2,
    padding: 12,
    cursor: 'pointer',
    color: "white",
    fontSize: 21,
    borderRadius: 12,
    marginLeft: 0,
    marginTop: 24,
    position: 'relative',
    zIndex: 80,
    backgroundColor: 'transparent',
    borderColor: 'white',
    boxSizing: 'border-box'
}


class Button extends React.Component {


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

    onClick = (e) => {
        e.preventDefault()
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        return (
            this.props.innerLink ? (
                <NavLink to={this.props.link}>
                    <button
                        style={button}
                        onMouseEnter={this.mouseEnter}
                        onMouseOut={this.mouseOut}
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {this.props.label}
                    </button>
                </NavLink>
            ) : (
                <button
                    style={button}
                    onMouseEnter={this.mouseEnter}
                    onMouseOut={this.mouseOut}
                    onClick={this.onClick}
                >
                    {this.props.label}
                </button>
            )
        );
    }
}



export default Button;
