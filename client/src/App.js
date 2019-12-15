import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Dash from "./components/Dash";
import Forgot from "./components/Forgot/Forgot.js";
import ResetForm from "./components/Reset/Reset.js";
import credentials from "./components/cred/Cred.js";
import Photo from "./components/Photo/Photo.js";
// import FormWrapper from "./components/Global/FormWrapper/FormWrapper.js";
// import Row from "./components/Global/Row/Row.js";
// import Col from "./components/Global/Col/Col.js";
// import TitleDiv from "./components/Global/TitleDiv/TitleDiv.js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js";
// // import { RedirectUser } from "./components/Login/RedirectUser";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {console.log("Initial state of the App", this.props.store)}
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          {/* <ProtectedRoute
            exact
            path="/dash"
            component={this.props.store.status ? Dash : Home}
          /> */}
          <ProtectedRoute exact path="/dash" data="Dash" component={Dash} />
          <ProtectedRoute exact path="/changeprofile" component={Photo} />
          <Route exact path="/forgot" component={Forgot} />
          {/* <Route exact path="/test" component={Hey} /> */}
          <Route exact path="/recovery/reset" component={ResetForm} />
          <Route path="/credentials" component={credentials} />
          <Route exact path="*" component={Home} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    Login: () => {
      dispatch({
        type: "Login"
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
