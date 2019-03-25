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
    //   let res = await fetch({
    //     url: "httpsss://localhost:3090/api/login",
    //     method: "post",
    //     data: JSON.stringify(this.State)
    //   });
    // };
    //   fetch("http://localhost:3090/api/login", {
    //     method: "POST", // or 'PUT'
    //     body: JSON.stringify(this.state), // data can be `string` or {object}!
    //     headers: {
    //       contentType: "application/x-www-form-urlencoded"
    //     }
    //   })
    // .then(res => res.json())
    // .then(response => console.log("Success:", JSON.stringify(response)))
    // .catch(error => console.error("Error:", error));
    // };
    let res = await fetch("http://localhost:3090/api/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(this.state)
      // body data type must match "Content-Type" header
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
