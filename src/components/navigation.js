import React, { Component } from "react";
import { Link } from "react-router-dom";


const container = {
    display: 'flex',
    flexDirection: 'column',
    position: "fixed",
    top: 0,
    width: "100vw",
    left: 0,
    zIndex: 999
}

const navigation = {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '20px 0px',
    alignItems: 'center',
    backgroundColor:'#171717c9',
    backdropFilter: 'blur(15pt)'
}

const logo = {
    cursor: 'pointer',
    zIndex: 60,
    fontSize: 24,
    position: 'fixed',
    left: 12,
    top: window.innerWidth > 450 ? 20 : 14,
}

class NavigationBar extends Component {

    handleBack = () => {
        window.history.back();
    }

    render() {
        return (
            <div style={container}>
                <div style={navigation}>
                    {/* logo */}
                    <Link to="/">
                        <div style={logo} className="logo bold pink">Isabella Wang</div>
                    </Link>


                    <a href="https://drive.google.com/file/d/1dbaLfbp0ysq0jpxBCEXDLSYdyJorgTE_/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{marginRight:'16px'}} className="bold pink">
                        Resume
                    </a>



                </div >
                {window.location.hash === '#/' ? null :
                    <button onClick={this.handleBack} className="icon backbtn">
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                         Back
                    </button>
                }
            </div>

        )
    }

}

export default NavigationBar;
