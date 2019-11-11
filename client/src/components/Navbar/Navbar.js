import React, { Component } from "react";
import "./Navbar.css";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="logo">
            <a href="/">BIRDIE</a>
          </div>
          <div className="links">
            <ul>
              <li>
                <a href="">About</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Sign Up</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="burger">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
