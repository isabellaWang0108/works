import React from "react";
import "../css/loading.css"

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
                <h2>{facts[Math.floor(Math.random() * 9)]}
                </h2>
            </div>

        );
    }
}

export default Loading;
