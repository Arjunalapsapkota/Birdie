import React, { Component, Fragment } from "react";
import "./login.css";
import Navbar from "../Navbar/Navbar.js";
//import birdie from "../../images/bird.png";

import { connect } from "react-redux";
import store from "../../store.js";
import { Redirect } from "react-router-dom";

// let the app detect whether we are running our app in heroku or localhost
// and set the URL accordingly
// idea is to be able to run our program independent of the system

const URL =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/check"
    : "http://localhost:3090/auth/check";

const FORM_SUBMIT =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/login"
    : "http://localhost:3090/auth/login";

// email regex
const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class Login extends Component {
  // component level store
  state = {
    field: {
      email: "",
      password: ""
    },
    login: false,
    msg: ""
  };
  componentWillMount() {
    fetch(URL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        //data.statusCode ? this.setState({ login: true }) : null;
        data.msg === "OK" ? this.setState({ login: true }) : null;
      });
  }
  // detect changes in the input field, updates them in component store

  handleInputChange = event => {
    let { name, value } = event.target;
    if (name === "email") value = value.toLowerCase();
    this.setState({
      [name]: value,
      msg: ""
    });
  };

  handlesubmit = async event => {
    event.preventDefault();

    //console.log(JSON.stringify(this.state));

    let status = true;
    if (!regex.test(this.state.email)) {
      status = false;
      this.setState({ msg: "Email not valid. example: abc@example.com" });
    }
    if (!this.state.password) {
      status = false;
      this.setState({ msg: "Password field cannot be empty" });
    }
    //let res = await fetch("/auth/login", {
    if (status) {
      let res = await fetch(FORM_SUBMIT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      });
      let data = await res.json();
      this.setState({ msg: data.message });
      console.log(data);

      if (data.msg === "OK") {
        this.props.Login();
        this.setState({ login: true });
      }
    }
  };
  // redirecting function
  handleRedirect = () => {
    if (this.state.login) return <Redirect to="/dash" />;
  };

  render() {
    return (
      <div className="Login">
        <Navbar />
        <div className="loginContainer row shadow">
          <div className="col-md-4 p-0">
            <div className="loginImg"></div>
          </div>
          <div className="col-md-8">
            <div className="p-3 ">
              <div className="titleDiv">
                <h2 className="pagetitle">Log in</h2>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <section id="loginForm">
                    <form
                      autocomplete="off"
                      className="form-horizontal"
                      role="form"
                    >
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="col-md-2 control-label" for="Email">
                            Email
                          </label>
                          <input
                            autocomplete="false"
                            className="form-control valid"
                            id="Email"
                            title="email"
                            name="email"
                            required
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            placeholder="username"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            className="col-md-2 control-label"
                            for="Password"
                          >
                            Password
                          </label>
                          <input
                            autocomplete="false"
                            className="form-control valid"
                            title="username"
                            placeholder="password"
                            name="password"
                            id="password"
                            required
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type="password"
                          />
                        </div>
                      </div>
                      <div className="col-md-offset-2 col-md-10 hideRow">
                        <div className="form-group">
                          <label id="warning-label">{this.state.msg}</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className=" col-md-12">
                          <input
                            type="submit"
                            onClick={this.handlesubmit}
                            value="Log in"
                            className="btn btn-primary w-100"
                          />
                        </div>
                      </div>
                      <p className="text-center">
                        <a href="/signup">Register new user</a> |
                        <a href="/forgot">Forgot your password?</a>
                      </p>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.login ? this.handleRedirect() : null}
      </div>
    );
  }
}
// connecting the login component to redux store
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
