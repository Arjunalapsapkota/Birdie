import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store.js";
import { Redirect, Route } from "react-router-dom";
import Home from "../Home";
import Dash from "../Dash";
import Photo from "../Photo/Photo.js";
const URL =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/check"
    : "http://localhost:3090/auth/check";

// fetch(URL, { credentials: "include" }) 00
//! Important , CORS issuses if used "*" for access-control-allow-origin

// fetch(URL)
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     data.msg === "OK"
//       ? store.dispatch({ type: "Login" })
//       : store.dispatch({ type: "Logout" }); // change this to Logout when you are done testing
//   });
// const Auth = {
//   isAuthenticated: true,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100); // fake async
//   }
// };
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        store.getState().status ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
export default ProtectedRoute;
