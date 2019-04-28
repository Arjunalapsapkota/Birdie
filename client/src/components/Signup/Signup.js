import React, { Component, Fragment } from "react";
import "./signup.css";
//import birdie from "../../images/bird.png";
import birdiee from "../../images/Birdiee.png";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
const GOOGLE_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://cors-anywhere.herokuapp.com/https://birdiez.herokuapp.com/auth/google"
    : "https://cors-anywhere.herokuapp.com/http://localhost:3090/auth/google";
const FACEBOOK_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/facebook"
    : "http://localhost:3090/auth/facebook";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    phone: "",
    login: false
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(this.state);
    this.setState({
      [name]: value
    });
  };
  makeapi = async event => {
    event.preventDefault();
    const config = { headers: { something: "anything" } };
    fetch(GOOGLE_LOGIN, config)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log("data", data);
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
    if (data.msg === "OK") {
      this.props.Login();
      this.setState({ login: true });
    }
  };
  handleRedirect = () => {
    if (this.state.login) return <Redirect to="/dash" />;
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
                {/* <a className="btn btn-primary m-1" href={FACEBOOK_LOGIN}>
                  <i className="fab fa-2x fa-facebook" />
                </a> */}
                <button onClick={this.makeapi}>
                  <i className="fab fa-2x fa-facebook" />
                </button>
                <a className="btn btn-danger m-1" href={GOOGLE_LOGIN}>
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
        {this.state.login ? this.handleRedirect() : null}
      </Fragment>
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
    },
    Logout: () => {
      dispatch({ type: "Logout" });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
