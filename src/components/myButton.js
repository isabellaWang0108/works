import React from "react";
import { NavLink } from "react-router-dom";

class Button extends React.Component {
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
                        className={`portfolio-button ${this.props.className || ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {this.props.label}
                    </button>
                </NavLink>
            ) : (
                <button
                    className={`portfolio-button ${this.props.className || ""}`}
                    onClick={this.onClick}
                >
                    {this.props.label}
                </button>
            )
        );
    }
}



export default Button;
