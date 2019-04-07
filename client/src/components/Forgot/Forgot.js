import React, { Component } from "react";
import "./Forgot.css";
import birdiee from "../../images/Birdiee.png";
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class Forgot extends Component {
  state = {
    email: "",
    reg_check: "initial",
    db_check: "initial",
    check: false
  };
  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: [value]
    });
  };
  handleClick = event => {
    event.preventDefault();
    emailRegex.test(this.state.email) ? this.setState({ i_check: true }) : null;
  };
  render() {
    return (
      <div className="poly-svg">
        <div className="container log-form">
          <img src={birdiee} className="image" alt="" />
          <br />
          <small>Account Recovery</small>
          <br />
          <span>Enter your Email </span>

          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary ml-2" onClick={this.handleClick}>
            Next
          </button>
          <label className={this.state.db_check}>
            Please Enter the valid email address associated with your account
          </label>
          <label className={this.state.reg_check}>Check your Email</label>
          <br />
          <a href="/login" className="mr-2">
            Login page
          </a>
          <span>|</span>
          <a href="/signup" className="ml-2">
            Sign Up
          </a>
        </div>
      </div>
    );
  }
}

export default Forgot;
