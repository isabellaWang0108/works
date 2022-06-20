import React from "react";
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
