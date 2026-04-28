import React, { Component } from "react";
import Button from "../assets/icons/Back2Top.svg"

class Back2Top extends Component {
    back2top = (e) => {
        e.preventDefault();
       
    }


    render() {
        return (
            <div id="back2Top" style={{position:'fixed', bottom:30, right: 30, zIndex:100, display:"none"}}>
                <button onClick={this.props.onClick}><img alt="back to the top" src={Button}  width="42px"/></button>
            </div>
        )
    }

}

export default Back2Top;
