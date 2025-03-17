import React, { Component } from "react";


const container = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
    columnGap: 12
}
const title = {
    fontSize: '13px',
    marginTop: '8px'
}

class ProjectContext extends Component {


    render() {
        return (
            <div style={container}>
                <div className="grey right-border bold">
                    <div style={title}>Duration:</div>
                    <div>{this.props.duration}</div>
                </div>
                <div className="grey right-border bold">
                    <div style={title}>My role:</div>
                    <div>{this.props.role}</div>
                </div>
                <div className="grey bold">
                    <div style={title}>Team:</div>
                    <div>{this.props.team}</div>
                </div>
            </div>

        )
    }

}

export default ProjectContext;
