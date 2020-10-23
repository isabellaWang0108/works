import React from "react";


class Back extends React.Component {

    Goback = () => {
        window.history.back();
    }

    render() {

        return (

            <h3 className="pink" style={{ marginLeft: 12, cursor: 'pointer' }} onClick={this.Goback}>
                <br />
                &lt; Go back</h3>

        );
    }
}

export default Back;
