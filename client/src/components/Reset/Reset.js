import React, { Component } from "react";
import "./Reset.css";
import birdiee from "../../images/Birdiee.png";
class Reset extends Component {
  state = {
    password: "",
    rpassword: "",
    match: false,
    didchange: false,
    holder: "initial"
  };
  handleinputChange = event => {
    event.preventdefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="poly-svg">
        <div className="container log-form m-auto">
          <img src={birdiee} className="image" alt="" />
          <br />
          <small>New Password </small>
          <br />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleinputChange}
            name="password"
            className={this.state.holder}
          />
          <br />
          <small>Repeat Password </small>
          <br />
          <input
            type="password"
            value={this.state.rpassword}
            onChange={this.handleinputChange}
            className={this.state.holder}
            name="rpassword"
          />
          <br />
          <button className="btn btn-primary mt-2">Next</button>
        </div>
      </div>
    );
  }
}
export default Reset;
