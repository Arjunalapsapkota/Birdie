import React, { Component, Fragment } from "react";
import "./login.css";
//import birdie from "../../images/bird.png";
import birdiee from "../../images/Birdiee.png";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
const axios = require("axios");

const FORM_SUBMIT =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/login"
    : "http://localhost:3090/auth/login";
class Login extends Component {
  state = {
    field: {
      username: "",
      password: ""
    },
    login: false,
    Username: "initial",
    Password: "initial"
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "username") this.setState({ Username: "initial" });
    if (name === "password") this.setState({ Password: "initial" });
    console.log(this.state.field);
    this.setState(previousStatus => ({
      field: {
        ...previousStatus.field,
        [name]: value
      }
    }));
  };
  handlesubmit = async event => {
    event.preventDefault();
    console.log(this.state.field);
    console.log(JSON.stringify(this.state));
    //let res = await fetch("/auth/login", {
    let res = await fetch(FORM_SUBMIT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(this.state.field)
    });
    let data = await res.json();
    console.log(data);
    this.setclass(data.message);
    if (data.msg === "OK") {
      this.props.Login();
      this.setState({ login: true });
    }
  };

  handleRedirect = () => {
    if (this.state.login) return <Redirect to="/dash" />;
  };

  setclass(data) {
    if (data === "No_User") this.setState({ Username: "Username" });
    else if (data === "Password_Error") {
      this.setState({ Password: "Password" });
    }
  }

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

              <label className={this.state.Username}>
                <i className="fas fa-times" /> Username Doesn't exist
              </label>
              <input
                type="password"
                className="m-2"
                title="username"
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <label className={this.state.Password}>
                <i className="fas fa-times" />
                Password doesn't match
              </label>
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
              <a className="forgot" href="/forgot">
                Forgot password?
              </a>
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
)(Login);
