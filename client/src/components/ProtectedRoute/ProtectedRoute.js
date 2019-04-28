import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store.js";
import Home from "../Home";
import Dash from "../Dash";
const URL =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/check"
    : "http://localhost:3090/auth/check";

fetch(URL, { credentials: "include" })
  .then(res => {
    return res.json();
    setTimeout(1000);
  })
  .then(data => {
    data.msg === "OK"
      ? store.dispatch({ type: "Login" })
      : store.dispatch({ type: "Logout" });
  });

class ProtectedRoute extends Component {
  state = {};
  render() {
    return this.props.store.status ? <Dash /> : <Home />;
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
