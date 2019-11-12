import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store.js";
import { Redirect } from "react-router-dom";
import Home from "../Home";
import Dash from "../Dash";
const URL =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/check"
    : "http://localhost:3090/auth/check";

// fetch(URL, { credentials: "include" }) 00
//! Important , CORS issuses if used "*" for access-control-allow-origin
// this fetch url can be inside the componentDid mount
fetch(URL)
  .then(res => {
    return res.json();
  })
  .then(data => {
    data.msg === "OK"
      ? store.dispatch({ type: "Login" })
      : store.dispatch({ type: "Logout" }); // change this to Logout when you are done testing
  });

class ProtectedRoute extends Component {
  state = {};
  render() {
    return this.props.store.status ? <Dash /> : <Redirect to="/" />;
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
    },
    Logout: () => {
      dispatch({ type: "Logout" });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedRoute);
