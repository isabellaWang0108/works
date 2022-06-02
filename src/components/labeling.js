import React from "react"

class Labeling extends React.Component {

    render() {
        const container = {
            display: 'flex',
        }
        const pinkSquare = {
            width: '43px',
            height: '10px',
            backgroundColor: '#FF1493',

        }
        const text = {
            fontSize: 18,
            marginTop: -5,
            marginLeft: 12,
            fontFamily: 'SuisseIntl-SemiBold',
            color: this.props.color
        }
        return (
            <div style={container}>
                <div className="pinkSquare" style={pinkSquare}></div>
                <div style={text}>{this.props.time}</div>
            </div>
        );
    }
}

export default Labeling;
