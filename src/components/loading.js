import React from "react";
import "../css/loading.css"

class Loading extends React.Component {

    render() {
        const facts = [
            "I dance Argentine Tango",
            "My favorite song is HAVANA by Camila Cabello",
            "I traveled to Mexico alone for a month",
            "My favorite show is Love, Death and Robot",
            "My favorite food is ramen",
            "I have been to Japan 6 times",
            "I have ordered takeaway from a hospital in Colombia",
            "I have 2 parakeets, Var and Chu",
            "My favorite cocktail is Sangria",
            "I learnt chess with a homeless in NY"


        ]
        return (
            <div className="loadingpage">
                <div className="loader circle"></div>
                <h1>{facts[Math.floor(Math.random() * 9)]}
                </h1>
            </div>

        );
    }
}

export default Loading;
