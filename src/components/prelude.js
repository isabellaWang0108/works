import React from "react";
class Prelude extends React.Component {

    render() {
        return (
            <div style={{ marginTop: "2em", marginBottom: '4em' }}>
                {/* name */}
                <h1 className="bold h-28px">{this.props.name}</h1>
                  {/* challenge */}
                  {this.props.challenge ? <p className="grey">{this.props.challenge}</p>:null}
              
                {/* image source */}
                <img src={this.props.imgSrc} alt="heroimg" style={{ width: "100%"}}></img>
                {/* team composition */}
                {this.props.team ? <p><span className="bold">Team :&nbsp;  </span>{this.props.team}</p> : null}
                {/* type of project */}
                {this.props.for ? <p ><span className="bold">Type :&nbsp;  </span>{this.props.for}</p> : null}
                {/* duties */}
                {this.props.myrole ? <p ><span className="bold">My core duties :&nbsp;  </span>
                    {this.props.myrole.map((item, index) => {
                        return (<span style={{ lineHeight: 1.5 }} key={index}>
                            <br />&bull; &nbsp; {item}</span>)
                    })}
                </p > : null}
            </div>

        );
    }
}

export default Prelude;
