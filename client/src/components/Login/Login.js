// lets import all the dependencies

import React, { Component, Fragment } from "react";
import "./login.css";

//import birdie from "../../images/bird.png";

// import images
import birdiee from "../../images/Birdiee.png";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// let the app detect whether we are running our app in heroku or localhost
// and set the URL accordingly
// idea is to be able to run our program independent of the system
//
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
      username: "",
      password: ""
    },
    login: false,
    msg: ""
  };

  // detect changes in the input field, updates them in component store

  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(this.state.field);
    //setting object inside the state object
    this.setState(oldField => {
      console.log(oldField);
      return {
        field: {
          ...oldField.field,
          [name]: value
        },
        msg: ""
      };
    });
  };

  handlesubmit = async event => {
    event.preventDefault();
    console.log(this.state.field);
    //console.log(JSON.stringify(this.state));

    let status = true;
    if (!regex.test(this.state.field.username)) {
      status = false;
      this.setState({ msg: "Email not valid. example: abc@example.com" });
    }
    if (!this.state.field.password) {
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
        body: JSON.stringify(this.state.field)
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
      <Fragment>
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
                            title="username"
                            name="username"
                            required
                            value={this.state.username}
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
        {/* <div className="wrapper">
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
        {this.state.login ? this.handleRedirect() : null} */}
      </Fragment>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
