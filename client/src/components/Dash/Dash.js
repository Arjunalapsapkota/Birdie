import React, { Component, Fragment } from "react";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import "./Dash.css";
import bird from "../../images/bird600x400.png";
import birdie from "../../images/Birdiee.png";
import Job from "./components/job.js";
import Navbar from "../Navbar/Navbar.js";
const LOGOUT =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/logout"
    : "http://localhost:3090/auth/logout";
class Dash extends Component {
  state = {
    username: "Arjun sapkota"
  };

  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="container">
          <div>
            <div className="board-container">
              <div className="myprofile">
                <div className="profile-brand">
                  <img
                    src="data:image/png;base64,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"
                    className="image-brand"
                  />
                  {this.state.username}
                  <a
                    className="btn btn-primary m-1 logout"
                    href={LOGOUT}
                    onClick={() => {
                      this.props.Logout();
                    }}
                  >
                    Logout
                  </a>
                </div>
              </div>
              <div className="board">
                <Job />
              </div>
              <div className="recent"></div>
            </div>
          </div>
        </div>
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
)(Dash);

// older code
/* 
<img src={birdie} className="logo" alt="" />
          <img src={bird} className="image" alt="" />
          <p> User Profile</p>
          <a
            className="btn btn-primary m-1"
            href={LOGOUT}
            onClick={() => {
              this.props.Logout();
            }}
          >
            Logout
          </a>
*/
