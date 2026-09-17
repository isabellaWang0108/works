import React from "react";
import { NavLink } from "react-router-dom";

class underLinedBtn extends React.Component {

    render() {
        return (
            this.props.innerLink ? (
                <NavLink to={this.props.link}>
                    <button
                        className={`portfolio-button ${this.props.className || ""}`}
                        onClick={(e) => e.stopPropagation()} // Prevent bubbling issues
                    >
                        {this.props.label}
                    </button>
                </NavLink>
            ) : (
                <button
                    className={`portfolio-button ${this.props.className || ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        window.open(this.props.link, "_blank");
                    }}
                >
                    {this.props.label}
                </button>
            )
        );
    }
}



export default underLinedBtn;
