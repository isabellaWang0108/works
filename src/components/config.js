import React from "react";

class Config extends React.Component {

    render() {
        const config={
            position:'fixed',
            top:'30%',
            left:'0',
            width:'100%',
            textAlign:'center'
        }
        const input={
            border:'solid 2px #FC2293',
            width:"20em",
            height:'3em',
            fontSize:'16px'
        }
        const submit={
            background:'#FC2293',
            color:'white',
            padding:'.5em 2em',
            marginTop:'2em',
            cursor:"pointer"
        }
        return (

            <div style={config}>
                <h2>Please Enter password</h2>
                <input type="password" style={input} id="password" placeholder="please enter password"></input>
                <h3 className="pink" id="incorrectpw"> </h3>
                <button onClick={this.props.click} style={submit}> submit</button>
            </div>

        );
    }
}

export default Config;
