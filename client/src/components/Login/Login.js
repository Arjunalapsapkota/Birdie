import React, { Component, Fragment } from "react";
import "./login.css";

import birdie from "../../images/bird.png";
import birdiee from "../../images/Birdiee.png";
const axios = require("axios");
class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(this.state);
    this.setState({
      [name]: value
    });
  };
  handlesubmit = async event => {
    event.preventDefault();
    console.log(this.state);
    console.log(JSON.stringify(this.state));
    //let res = await fetch("/auth/login", {
    let res = await fetch("https://birdiez.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(this.state)
    });
    let data = await res.json();
    console.log(data);
  };
  render() {
    return (
      <Fragment>
        <div className="poly-svg">
          <div className="container log-form">
            <img src={birdiee} className="image" alt="" />
            <h2>Login to your account</h2>
            <hr />
            <form>
              <input
                type="text"
                className="m-2"
                title="username"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                placeholder="username"
              />
              <input
                type="password"
                className="m-2"
                title="username"
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <br />
              <button
                type="submit"
                onClick={this.handlesubmit}
                className="btn btn-primary"
              >
                Login
              </button>
              <br />
              <a className="account" href="/signup">
                Dont have an account? Sign Up Here
              </a>
              <br />
              <a className="forgot" href="#">
                Forgot password?
              </a>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
