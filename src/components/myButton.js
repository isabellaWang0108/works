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

    render() {

        return (
            this.props.underLined ? (
                this.props.link.startsWith('https') ? (
                    <a href={this.props.link} target="_blank" rel="noopener noreferrer">
                        <button
                            className="myButton"
                            style={underLined}
                            onMouseEnter={(e) => this.mouseEnter(e)}
                            onMouseOut={(e) => this.mouseOut(e)}
                            onClick={this.props.onClick}
                        >
                            {this.props.label}
                            <span style={{ margin: '0pt 4pt' }}>
                                <img style={{ width: '13pt', color: 'black' }} src={NewPage} alt="new page" />
                            </span>
                        </button>
                    </a>
                ) : (
                    <NavLink to={this.props.link}>
                        <button
                            className="myButton"
                            style={underLined}
                            onMouseEnter={(e) => this.mouseEnter(e)}
                            onMouseOut={(e) => this.mouseOut(e)}
                            onClick={this.props.onClick}
                        >
                            {this.props.label}
                            <span style={{ margin: '0pt 4pt' }}>
                                <img style={{ width: '13pt', color: 'black' }} src={NewPage} alt="new page" />
                            </span>
                        </button>
                    </NavLink>
                )
            ) :
                <button
                    style={button}
                    className="myButton"
                    href={this.props.link}
                    onMouseEnter={(e) => this.mouseEnter(e)}
                    onMouseOut={(e) => this.mouseOut(e)}
                    onClick={() => {
                        this.props.onClick();
                        this.onClick(this.props.link)
                    }}>
                    {this.props.label}
                </button>

        );
    }
}



export default Button;
