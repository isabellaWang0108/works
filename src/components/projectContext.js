import React, { Component } from "react";

class ProjectContext extends Component {


    render() {
        const items = [
            { label: "Role", value: this.props.role },
            { label: "Team", value: this.props.team },
        ];

        if (this.props.duration) {
            items.unshift({ label: "Duration", value: this.props.duration });
        }

        return (
            <div className="project-context">
                {items.map((item) => (
                    <div className="project-context-item" key={item.label}>
                        <div className="project-context-label">{item.label}</div>
                        <div className="project-context-value">{item.value}</div>
                    </div>
                ))}
            </div>
        )
    }

}

export default ProjectContext;
