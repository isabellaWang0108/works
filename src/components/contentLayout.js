import React from "react";
import Thesis from "../views/projects/Thesis";
class ContentLayout extends React.Component {
  
    render() {
        return (
            <div className="content-layout">
                {this.props.children}
            </div>

        );
    }
}

export default ContentLayout;
