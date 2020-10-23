import React from "react"

class Timeline extends React.Component {

    render() {
        const line = {
            width: 1,
            backgroundColor: '#FF1493',
            height: this.props.height,
            position: 'fixed',
            marginTop: 66,
            zIndex: 50

        }
        return (
            <div style={line} className="timeLine">
            </div>
        );
    }
}

export default Timeline;
