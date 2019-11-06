import React, { Component, Fragment } from "react";
import "./signup.css";
//import birdie from "../../images/bird.png";
import birdiee from "../../images/Birdiee.png";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
const GOOGLE_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/google"
    : "http://localhost:3090/auth/google";
const FACEBOOK_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/facebook"
    : "http://localhost:3090/auth/facebook";
const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$/;
class Signup extends Component {
  state = {
    hidden: true,
    username: "",
    email: "",
    password: "",
    phone: "",
    login: false,
    msg: ""
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(this.state);
    this.setState({
      [name]: value,
      msg: ""
    });
  };

  // handle submit ...
  // make api call to the server with email and password
  // we are using regular expressing to make sure if the email and password are actually valid
  handlesubmit = async event => {
    event.preventDefault();
    console.log(this.state);

    let status = true;
    if (!regex.test(this.state.email)) {
      status = false;
      this.setState({ msg: "Email not valid. example: abc@example.com" });
    }
    if (!passwordRegex.test(this.state.password)) {
      status = false;
      this.setState({
        msg:
          "Password must be between 8 and 12 characters, one digit and one alphabetic character, and no  special characters"
      });
    }
    console.log(JSON.stringify(this.state));
    if (status) {
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
    }
  };

  togglepassword = () => {
    this.setState({ hidden: !this.state.hidden });
  };
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
                <h2 className="pagetitle">Sign up form</h2>
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
                            placeholder="email"
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
                            type={this.state.hidden ? "password" : "text"}
                          />
                          <span
                            onClick={this.togglepassword}
                            toggle="#password"
                            class={
                              this.state.hidden
                                ? "fa fa-fw fa-eye field-icon toggle-password"
                                : "fa fa-fw fa-eye field-icon toggle-password fas fa-eye-slash"
                            }
                          ></span>
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
                            value="Sign up"
                            id="signButton"
                            className="btn btn-primary w-100"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className=" col-md-12">
                          <hr></hr>
                          <div id="continuelabel">
                            <span>Or continue with</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className=" col-md-12">
                          <a className="btn btn-primary" href={FACEBOOK_LOGIN}>
                            <i className="fab fa-2x fa-facebook" />
                          </a>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className=" col-md-12">
                          <a className="btn btn-danger" href={GOOGLE_LOGIN}>
                            <i className="fab fa-2x fa-google" />
                          </a>
                        </div>
                      </div>
                      <p className="text-center">
                        <a href="/">Have an account? Login Here!</a>
                      </p>
                    </form>
                  </section>
                </div>
              </div>
            </div>
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
