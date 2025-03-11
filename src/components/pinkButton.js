import React from "react";
import { NavLink } from "react-router-dom";
import $ from 'jquery';

const button = {
    borderWidth: 2,
    padding: 12,
    cursor: 'pointer',
    color: "black",
    fontSize: 21,
    borderRadius: 12,
    marginLeft: 0,
    marginTop: 24,
    position: 'relative',
    zIndex: 80,
    backgroundColor: 'transparent',
    borderColor:'black',
    boxSizing:'border-box'
}


class PinkButton extends React.Component {

    mouseEnter(e) {
        $(".pinkButton").css('background-color', 'rgba(255, 255, 255, 0.2)')
        $(".pinkButton").css('borderColor', 'black')
        $(".pinkButton").css('fontWeight', '800')
    }
    mouseOut() {
        $(".pinkButton").css('background-color', 'transparent');
        $(".pinkButton").css('borderColor', '#4A4A4A')
        $(".pinkButton").css('fontWeight', '500')
    }
    onClick(data) {
        window.open(data, '_blank');
        $(".pinkButton").css('borderColor', '#FC2293')
    }
    render() {

        return (
            this.props.innerLink ?
                <NavLink to={this.props.link}>
                    <button
                        className="pinkButton"
                        style={button}
                        href={this.props.link}
                        onMouseEnter={this.mouseEnter}
                        onMouseOut={this.mouseOut}
                        onClick={this.props.onClick}>
                        {this.props.label}
                    </button>
                </NavLink> :
                <button
                    className="pinkButton"
                    style={button}
                    href={this.props.link}
                    onMouseEnter={this.mouseEnter}
                    onMouseOut={this.mouseOut}
                    onClick={() =>{ 
                        this.props.onClick();
                        this.onClick(this.props.link)}}>
                    {this.props.label}
                </button>

        );
    }
}



export default PinkButton;
