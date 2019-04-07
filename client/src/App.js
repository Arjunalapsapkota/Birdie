import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Dash from "./components/Dash";
import Forgot from "./components/Forgot/Forgot.js";
// // import { RedirectUser } from "./components/Login/RedirectUser";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dash" component={Dash} />
          <Route exact path="/Forgot" component={Forgot} />
          <Route exact path="*" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
