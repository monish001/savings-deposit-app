import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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
              <a href="/#">Saving deposits App</a>
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
                onClick={this.toggleAddSavingDeposit}
              >
                <NavItem eventKey={1}>Saving deposits</NavItem>
              </LinkContainer>
{/*               <LinkContainer to={{ pathname: "/users", query: {} }} @todo
                onClick={this.toggleAddSavingDeposit}
              >
                <NavItem eventKey={1}>Users</NavItem>
              </LinkContainer>
*/}            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
            {this.props.children}
        </div>
      </div>
    );
  }
}
