import React from "react";
import "../css/index.css"

class Loading extends React.Component {

    render() {
        const facts = [
            "I dance Argentine Tango",
            "My favorite show is Love, Death, and Robots",
            "I like stand-up comedy",
            "I have two parakeets"
        ]
        
        return (
            <div className="loadingpage">
                <div className="loader circle"></div>
                <h2 style={{color:'white'}}>{facts[Math.floor(Math.random() * 4)]}
                </h2>
            </div>

        );
    }
}

export default Loading;
