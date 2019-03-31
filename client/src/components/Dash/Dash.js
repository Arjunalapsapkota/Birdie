import React, { Component, Fragment } from "react";

import "./Dash.css";
import bird from "../../images/bird.png";
import birdie from "../../images/Birdiee.png";
class Dash extends Component {
  render() {
    return (
      <Fragment>
        <div className="">
          <img src={birdie} className="logo" alt="" />
          <img src={bird} className="image" alt="" />
          <p> User Profile</p>
          <a
            className="btn btn-primary m-1"
            href="http://birdiez.herokuapp.com/auth/logout"
          >
            Logout
          </a>
        </div>
      </Fragment>
    );
  }
}

export default Dash;
