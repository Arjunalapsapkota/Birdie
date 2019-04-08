import React, { Component } from "react";
import "./Forgot.css";
import birdiee from "../../images/Birdiee.png";
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class Forgot extends Component {
  state = {
    email: "",
    reg_check: "initial",
    db_check: "initial",
    flag: false,
    check: false
  };
  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleClick = event => {
    event.preventDefault();

    const makeapicall = async () => {
      let res = await fetch("http://localhost:3090/recovery/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(this.state)
      });
      let data = await res.json();

      console.log("Data from the server", data);
      data.msg === "OK"
        ? this.setState({ check: true })
        : this.setState({ db_check: "display" });
    };

    emailRegex.test(this.state.email)
      ? (this.setState({ reg_check: "initial" }),
        this.setState({ flag: true }),
        makeapicall())
      : this.setState({ reg_check: "display" });
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
              Record Not Found !! <br />
              Please enter the email address associated with your account
            </label>
            <label className={this.state.reg_check}>
              Email-Address not valid! <br />
              Example: johndoe@company.com <br />
            </label>
            <br />
          </div>
          <div className={this.state.check ? "display" : "initial"}>
            <small>
              Instruction for account recovery has been sent to your Email.
            </small>
          </div>
          <a href="/" className="mr-2">
            Home
          </a>
          <span>|</span>
          <a href="/signup" className="ml-2">
            Sign-Up
          </a>
        </div>
      </div>
    );
  }
}

export default Forgot;
