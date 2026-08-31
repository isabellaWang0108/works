import React from "react";
import WireframeBackground from "./WireframeBackground";

class ContentLayout extends React.Component {
    layoutRef = React.createRef();

    render() {
        return (
            <div className="content-layout" ref={this.layoutRef}>
                <div className="content-background-grid" aria-hidden="true">
                    <WireframeBackground />
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default ContentLayout;
