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
    const appState = this.props.mappedAppState;
    return (
      <div>
        <Navbar inverse collapseOnSelect className="customNav">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/#">Saving Deposits App</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to={{ pathname: "/", query: {} }}>
                <NavItem eventKey={1}>Home</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer
                to={{ pathname: "/saving-deposits", query: {} }}
                onClick={() => {}}
              >
                <NavItem eventKey={1}>Saving Deposits</NavItem>
              </LinkContainer>
              <LinkContainer
                to={{ pathname: "/profile", query: {} }}
                onClick={() => {}}
              >
                <NavItem eventKey={2}>
                  <Glyphicon glyph="user" /> Profile
                </NavItem>
              </LinkContainer>
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
