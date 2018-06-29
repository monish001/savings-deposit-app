import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Panel, Alert, Glyphicon, Button, Modal } from "react-bootstrap";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const profileState = this.props.mappedProfileState;
    const showProfile = profileState.profile && profileState.profile.email;
    const showSds = // @todo handle admin and reg_user diffs.
      profileState.profile &&
      profileState.profile.role &&
      (profileState.profile.role === "ADMIN" ||
        profileState.profile.role === "REGULAR_USER");
    const showUsers =
      profileState.profile &&
      profileState.profile.role &&
      (profileState.profile.role === "USER_MANAGER" ||
        profileState.profile.role === "ADMIN");
    return (
      <div>
        <Navbar inverse collapseOnSelect className="customNav">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Saving Deposits App</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {showSds &&
                <LinkContainer
                  to={{ pathname: "/saving-deposits", query: {} }}
                  onClick={() => {}}
                >
                  <NavItem eventKey={1}>Saving Deposits</NavItem>
                </LinkContainer>}
              {showUsers &&
                <LinkContainer
                  to={{ pathname: "/users", query: {} }}
                  onClick={() => {}}
                >
                  <NavItem eventKey={2}>Users</NavItem>
                </LinkContainer>}
              {showProfile &&
                <LinkContainer
                  to={{ pathname: "/profile", query: {} }}
                  onClick={() => {}}
                >
                  <NavItem eventKey={3}>
                    <Glyphicon glyph="user" /> Profile
                  </NavItem>
                </LinkContainer>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
