import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./cred.css";
import birdiee from "../../images/Birdiee.png";
const Token = window.location.href.split("s/")[1];
const CRED_SUBMIT =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/recovery/credentials"
    : "http://localhost:3090/recovery/credentials";
class Cred extends Component {
  state = {
    password: "",
    repeat_password: "",
    token: "",
    back: false
  };
  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log("local state:", this.state);
  };
  handleClick = async event => {
    event.preventDefault();
    console.log("i am clicked");
    this.setState({ token: Token }, async function() {
      let res = await fetch(CRED_SUBMIT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(this.state)
      });
      let data = await res.json();
      console.log("Data from the server", data);
      data.msg === "OK" ? this.setState({ back: true }) : null;
    });
  };
  handleRedirect = () => {
    if (this.state.back) return <Redirect to="/home" />;
  };

  render() {
    return (
      <div className="poly-svg">
        <div className="container log-form">
          <img src={birdiee} className="image" alt="" />
          <br />
          <h3>Account Recovery</h3>
          <br />
          <div className={this.state.check ? "initial" : "display"}>
            <span>Enter your new password </span>
            <br />

            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />
            <span>Retype password </span>
            <br />
            <input
              type="password"
              name="repeat_password"
              value={this.state.repeat_password}
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary m-2" onClick={this.handleClick}>
              Next
            </button>
            <a href="/" className="mr-2">
              Home
            </a>
            <span>|</span>
            <a href="/signup" className="ml-2">
              Sign-Up
            </a>
          </div>
        </div>
        {this.state.back ? this.handleRedirect() : null}
      </div>
    );
  }
}

export default Cred;
