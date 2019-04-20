import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./Dash.css";
import bird from "../../images/bird.png";
import birdie from "../../images/Birdiee.png";

const LOGOUT =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/logout"
    : "http://localhost:3090/auth/logout";
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
            href={LOGOUT}
            onClick={() => {
              this.props.Logout();
            }}
          >
            Logout
          </a>
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
