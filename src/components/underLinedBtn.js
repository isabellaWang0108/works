import React from "react";
import { NavLink } from "react-router-dom";
import NewPage from "../assets/icons/newPage.svg"

class underLinedBtn extends React.Component {

    render() {
        return (
            this.props.innerLink ? (
                <NavLink to={this.props.link}>
                    <button
                        className={`portfolio-button ${this.props.className || ""}`}
                        onClick={(e) => e.stopPropagation()} // Prevent bubbling issues
                    >
                        {this.props.label}<span className="portfolio-button-icon">
                            <img src={NewPage} alt="new page" />
                        </span>
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
                    {this.props.label}<span className="portfolio-button-icon">
                        <img src={NewPage} alt="new page" />
                    </span>
                </button>
            )
        );
    }
}



export default underLinedBtn;
