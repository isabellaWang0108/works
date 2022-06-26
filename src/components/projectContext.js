import React, { Component } from "react";
import { Link } from "react-router-dom";


const container = {
    display: 'flex',
    flexDirection: 'row',
    marginTop:0,
    columnGap:24
}

class ProjectContext extends Component {


    render() {
        return (
            <div style={container}>
                <p className="grey right-border">Duration: <br/> {this.props.duration}</p>
                <p className="grey right-border">My role: <br/>{this.props.role}</p>
                <p className="grey">Team: <br/>{this.props.team}</p>
            </div>

        )
    }

}

export default ProjectContext;
