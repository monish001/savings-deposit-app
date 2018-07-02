import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Image, Glyphicon } from "react-bootstrap";
import { browserHistory } from "react-router";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.checkLandingPage(this.props);
  }
  
  componentWillUpdate(nextProps, nextState) {
  }
  componentWillReceiveProps(nextProps) {
    this.checkLandingPage(nextProps);
  }
  checkLandingPage(props) {
    const profileState = props.mappedProfileState;
    const isLoggedIn = profileState.profile && profileState.profile.email;
    const isRootRoute = props.location.pathname === "/";

    if (isLoggedIn && isRootRoute) {
      const role = profileState.profile && profileState.profile.role;
      this.redirectToLandingPage(role);
    }
    if (!isLoggedIn && isRootRoute) {
      browserHistory.replace("/login");
    }
  }
  redirectToLandingPage(role) {
    let url;
    switch (role) {
      case "ADMIN":
      case "USER_MANAGER":
        url = "/users";
        break;
      case "REGULAR_USER":
        url = "/saving-deposits";
        break;
      default:
        url = "/profile";
    }
    browserHistory.replace(url);
  }
  render() {
    const profileState = this.props.mappedProfileState;
    const showProfile = profileState.profile && profileState.profile.email;
    const showSds =
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
              <LinkContainer
                to={{ pathname: "/", query: {} }}
                onClick={() => {}}
              >
                <div>Saving Deposits App</div>
              </LinkContainer>
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
                    {profileState &&
                      profileState.profile &&
                      profileState.profile.photo &&
                      <Image
                        style={{ height: "14px" }}
                        src={`${profileState.profile.photo}`}
                        rounded
                      />}
                    {!(profileState &&
                      profileState.profile &&
                      profileState.profile.photo) && <Glyphicon glyph="user" />}
                    {" "}Profile
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
