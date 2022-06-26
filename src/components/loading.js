import React from "react";
import "../css/loading.css"

class Loading extends React.Component {

    render() {
        const facts = [
            "I dance Argentine Tango",
            "I am learning Flamenco",
            "I traveled to Mexico alone for a month",
            "My favorite show is Love, Death, and Robots",
            "I have been to Japan 6 times",
            "I like stand-up comedy",
            "I have two parakeets",
            "I can't resist bird videos",
            "I learned chess from a homeless person in NY"


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
