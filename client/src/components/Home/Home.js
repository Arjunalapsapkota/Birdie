import React, { Component, Fragment } from "react";
import "./home.css";
import bird from "../../images/bird.png";
import birdie from "../../images/Birdiee.png";
class Home extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <img src={birdie} className="logo" alt="" />
          <img src={bird} className="image" alt="" />
        </div>

        <p>hey i am here</p>
      </Fragment>
    );
  }
}

export default Home;
