import React from "react"
import "../css/index.css"
import { Link } from "react-router-dom";


function Card(props) {


    return (
        <Link to={props.location}>
        <div className="card animated fadeInUp">
            <img alt="1" className="cardImg" src={props.img} />
            <div className="Card-content">
                <h1>{props.title}</h1>
                <h3 className="grey">{props.type}</h3>
                <p className="descrip">{props.descrip}</p>
            </div>
        </div>
        </Link>
    )
}

export default Card;
