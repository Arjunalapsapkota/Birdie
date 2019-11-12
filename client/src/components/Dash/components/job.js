import React, { Component, Fragment } from "react";
import { Nav } from "react-bootstrap";
class Job extends Component {
  state = {};
  render() {
    return (
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-3">Nearby</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">US only</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">My Feed</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default Job;
