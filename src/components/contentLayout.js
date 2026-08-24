import React from "react";

class ContentLayout extends React.Component {
    layoutRef = React.createRef();

    render() {
        return (
            <div className="content-layout" ref={this.layoutRef}>
                <div className="content-background-grid" aria-hidden="true">
                    <span>0101</span>
                    <span>AI_FLOW</span>
                    <span>SYS</span>
                    <span>UX</span>
                    <span>1010</span>
                    <span>MODEL</span>
                    <span>0101</span>
                    <span>DESIGN</span>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default ContentLayout;
