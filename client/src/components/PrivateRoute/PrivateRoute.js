import React, { Component } from "react";
import Dashboard from "../Dash";
import { connect } from "react-redux";
import store from "../../store";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
const login = {
  type: "Login"
};
const logout = {
  type: "Logout"
};
const AUTH =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/check"
    : "http://localhost:3090/auth/check";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      console.log("calling api");
      fetch(AUTH)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log("Promise resolved:", data);
          data.msg === "OK" ? store.dispatch(login) : store.dispatch(login);
        });
      const { status } = store.getState();
      return status === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);
export default PrivateRoute;
// const mapStateToProps = state => {
//   return {
//     store: state
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     Login: () => {
//       dispatch({
//         type: "Login"
//       });
//     },
//     Logout: () => {
//       dispatch({ type: "Logout" });
//     }
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PrivateRoute);
