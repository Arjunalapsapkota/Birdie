import React, { Component, Fragment } from "react";
import Login from "../Login";
import "./home.css";
import bird from "../../images/bird600x400.png";
import birdie from "../../images/Birdiee.png";
class Home extends Component {
  render() {
    return (
      <Fragment>
        <div className="">
          <img src={birdie} className="logo" alt="" />
          <img src={bird} className="image" alt="" />
        </div>
        <Login />
      </Fragment>
    );
  }
}

export default Home;
