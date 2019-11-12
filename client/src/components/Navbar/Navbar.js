import React, { Component } from "react";
import "./Navbar.css";
import { connect } from "react-redux";
const LOGOUT =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/auth/logout"
    : "http://localhost:3090/auth/logout";
class Navbar extends Component {
  state = { active: false, accountSetting: false };
  accountClick = () => {
    this.setState({ accountSetting: !this.state.accountSetting });
  };
  burgerClick = () => {
    this.setState({ active: !this.state.active });
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="logo">
            <a href="/">BIRDIE</a>
          </div>
          <div className="links">
            <ul
              className={
                this.state.active ? "navlinks nav-active" : "navlinks "
              }
            >
              <li
                className={
                  this.props.store.status ? "lilogin-inactive" : "lilogin"
                }
              >
                {console.log("props", this.props)}
                <a href="/login">Login</a>
              </li>
              <li
                className={
                  this.props.store.status ? "lilogin-inactive" : "lilogin"
                }
              >
                <a href="/signup">Sign Up</a>
              </li>
              <li className="liaccount" onClick={this.accountClick}>
                <img
                  src="https://via.placeholder.com/150"
                  className={
                    this.props.store.status ? "liimg liimg-active" : "liimg"
                  }
                />
              </li>
              <li>
                <a href="">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
            <div
              className={
                this.state.accountSetting
                  ? "accountSetting accountSetting-active"
                  : "accountSetting accountSetting-inactive"
              }
            >
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly"
                }}
              >
                <li>
                  <a href="/changeprofile">Change profile picture</a>
                </li>
                <li>
                  <a href="/setting">Open Settings</a>
                </li>
                <li>
                  <a
                    className=""
                    href={LOGOUT}
                    onClick={() => {
                      this.props.Logout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="burger" onClick={this.burgerClick}>
            <div
              className={this.state.active ? "line1 line1active" : "line1"}
            ></div>
            <div
              className={this.state.active ? "line2 line2active" : "line2"}
            ></div>
            <div
              className={this.state.active ? "line3 line3active" : "line3"}
            ></div>
          </div>
        </nav>
      </div>
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
)(Navbar);
