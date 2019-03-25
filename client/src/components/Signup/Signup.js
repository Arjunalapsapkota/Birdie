import React, { Component, Fragment } from "react";
import "./signup.css";
import birdie from "../../images/bird.png";
import birdiee from "../../images/Birdiee.png";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    phone: ""
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
    let res = await fetch("/make a route", {
      method: "POST",
      body: JSON.stringify(this.state)
    });
  };
  render() {
    return (
      <Fragment>
        <div className="poly-svg">
          <div className="container sign-form">
            <img src={birdiee} className="image" alt="" />
            <h2>Sign Up Here</h2>
            <hr />

            <form>
              <div className="mx-auto">
                <btn className="btn btn-primary m-1">
                  <i className=" fab fa-2x fa-facebook-square" />
                </btn>
                <btn className="btn btn-danger m-1">
                  <i className="fab fa-2x fa-google" />
                </btn>
              </div>
              <label htmlFor="username">
                Choose a Username, Must be unique:
              </label>
              <input
                type="text"
                label="username"
                className=" form-control"
                title="username"
                placeholder="Choose a username"
                value={this.state.username}
                name="username"
                onChange={this.handleInputChange}
              />
              <label htmlFor="email">Enter your email address:</label>
              <input
                type="text"
                className=" form-control"
                title="email"
                placeholder="Email"
                value={this.state.email}
                name="email"
                onChange={this.handleInputChange}
              />
              <label htmlFor="phone">Phone-number</label>
              <input
                type="phone"
                className=" form-control"
                title="phone"
                placeholder="Phone Number"
                value={this.state.phone}
                name="phone"
                onChange={this.handleInputChange}
              />
              <label htmlFor="password">Choose a strong Password:</label>
              <input
                type="password"
                className=" form-control"
                title="username"
                placeholder="Set a password"
                value={this.state.password}
                name="password"
                onChange={this.handleInputChange}
              />
              <br />
              <button
                type="submit"
                onClick={this.handlesubmit}
                className="btn btn-primary"
              >
                Sign Up
              </button>
              <br />
              <a className="account" href="/Home">
                Have an account? Login Here
              </a>
              <br />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Signup;
