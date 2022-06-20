import React, { Component } from "react";
import Button from "../assets/icons/Back2Top.svg"

class Back2Top extends Component {
    back2top = (e) => {
        e.preventDefault();
       
    }


    render() {
        return (
            <div id="back2Top" style={{position:'fixed', bottom:30, right: 30, zIndex:100, display:"none"}}>
                <a onClick={this.props.onClick}><img src={Button}  width="42px"/></a>
            </div>
        )
    }

}

export default Back2Top;
