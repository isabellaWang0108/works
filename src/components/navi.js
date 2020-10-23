import React, { Component } from "react";
import $ from 'jquery';

class Navi extends Component {


    componentDidMount() {
        window.addEventListener('resize', this.width, true);

    }
    navishow = (e) => {
        e.preventDefault();
        if ($("#navi").css("display") === "block") {
            $("#navi").css("display", "none");
            $(".dropdown").text("Project Navigation");
        }
        else if ($("#navi").css("display") === "none") {
            $("#navi").css("display", "block");
            $(".dropdown").text("click to close");
        }
    }

    render() {
        return (
            <div className="mobile-navi">
                <button onClick={this.navishow} className="dropdown">Project Navigation</button>
            </div>
        )
    }

}

export default Navi;
