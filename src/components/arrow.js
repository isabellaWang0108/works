import React, { Component } from "react";
import Arrow from "../assets/icons/arrow.svg"


const arrowDownContainer = {
    display: 'flex',
    flexDirection: 'column'
}
class ArrowDown extends Component {

    render() {

        return (
            <div style={arrowDownContainer} id="arrowDown">
                <img className="arr1op arrowDown" src={Arrow} alt="arrow1" />
                <img className="arr2op arrowDown" src={Arrow} alt="arrow2" />
                <img className="arr3op arrowDown" src={Arrow} alt="arrow3" />
            </div>

        );
    }
}



export default ArrowDown;
