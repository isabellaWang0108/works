import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Loading from "./components/loading"
import Homepage from "./views/homepage"
import Contact from "./views/contact.js"

import Vogether from "./views/projects/vogether"
import Recruitment from "./views/projects/Recruitment"
import Thesis from "./views/projects/Campy"
import Venture from "./views/projects/Venture"

class App extends Component {
  state = {
    isLoading: true
  }

  constructor() {
    super();
    this.state = { isLoading: true }
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ isLoading: false }) }, 2000)
  }


  render() {
    if (this.state.isLoading === true) {
      return <Loading />
    } else {
      return (
        <HashRouter basename='/'>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + "/"} component={Homepage} />
            <Route exact path={process.env.PUBLIC_URL + "/vogether"} component={Vogether} />
            <Route exact path={process.env.PUBLIC_URL + "/smoothHire"} component={Recruitment} />
            <Route exact path={process.env.PUBLIC_URL + "/thesis"} component={Thesis} />
            <Route exact path={process.env.PUBLIC_URL + "/contact"} component={Contact} />
            <Route exact path={process.env.PUBLIC_URL + "/venture"} component={Venture} />
          </Switch>
        </HashRouter>
      )
    }

  }
}
export default App;