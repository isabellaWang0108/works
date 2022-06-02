import React, { Component } from "react";
import $ from 'jquery';
import Button from "../assets/icons/Back2Top.svg"

class Back2Top extends Component {

    back2top = (e) => {
        e.preventDefault();
       
    }

    render() {
        return (
            <div id="back2Top" style={{position:'fixed', bottom:30, right: 30, zIndex:100, display:"none"}}>
            {/* <h1>hi</h1> */}
                <a href="#title"><img src={Button}  width="42px"/></a>
            </div>
        )
    }

}

export default Back2Top;
