import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Loading from "./components/loading"
import Homepage from "./views/homepage"
import Contact from "./views/contact.js"

import Vogether from "./views/projects/vogether"
import ProductStudio from "./views/projects/ProductStudio"
import Thesis from "./views/projects/Thesis"
import DS from "./views/projects/DS"
import Voice from "./views/projects/Voice"

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
            <Route exact path={process.env.PUBLIC_URL + "/product-studio"} component={ProductStudio} />
            <Route exact path={process.env.PUBLIC_URL + "/thesis"} component={Thesis} />
            <Route exact path={process.env.PUBLIC_URL + "/contact"} component={Contact} />
            <Route exact path={process.env.PUBLIC_URL + "/design-system"} component={DS} />
            <Route exact path={process.env.PUBLIC_URL + "/voice"} component={Voice} />
          </Switch>
        </HashRouter>
      )
    }

  }
}
export default App;