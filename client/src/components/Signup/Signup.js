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
    console.log(JSON.stringify(this.state));
    let res = await fetch("/auth/signup", {
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
  handleGoogleAuth = async event => {
    event.preventDefault();
    console.log("G button clicked");
    let res = await fetch("/auth/google", {
      method: "GET",
      mode: "no-cors"
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
                <a
                  className="btn btn-primary m-1"
                  href="http://localhost:3090/auth/facebook"
                >
                  <i className="fab fa-2x fa-facebook" />
                </a>
                <a
                  className="btn btn-danger m-1"
                  href="http://localhost:3090/auth/google"
                >
                  <i className="fab fa-2x fa-google" />
                </a>
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
