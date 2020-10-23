import React from "react"

function Bullet(props) {

    return (
        <span>
            {props.a ? <div >  &bull;  {props.a}</div> : null}
            <br/>
            {props.b ? <div > &bull;   {props.b} </div> : null}
            <br/>
            {props.c ? <div > &bull;   {props.c}</div> : null}
            <br/>
            {props.d ? <div > &bull;   {props.d}</div> : null}
            <br/>
            {props.e ? <div > &bull;   {props.e}</div> : null}
        </span>
    )
}

export default Bullet;
