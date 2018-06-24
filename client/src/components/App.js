// ./react-redux-client/src/components/App.js
import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
// @todo import SavingDepositForm from "./SavingDepositForm";
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // @todo
    // this.toggleAddSavingDeposit = this.toggleAddSavingDeposit.bind(this);
    // this.addSavingDeposit = this.addSavingDeposit.bind(this);
  }

  // @todo
  // toggleAddSavingDeposit(e) {
  //   e.preventDefault();
  //   this.props.mappedtoggleAddSavingDeposit();
  // }
  // addSavingDeposit(e) {
  //   e.preventDefault();
  //   const form = document.getElementById("addSavingDepositForm");
  //   if (form.savingDepositText.value !== "" && form.savingDepositDesc.value !== "") {
  //     const data = new FormData();
  //     data.append("savingDepositText", form.savingDepositText.value);
  //     data.append("savingDepositDesc", form.savingDepositDesc.value);
  //     this.props.mappedaddSavingDeposit(data);
  //   } else {
  //     return;
  //   }
  // }

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
{/*              <LinkContainer
                to={{ pathname: "/users", query: {} }}
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
        {/*        
          <div className="container">
            {appState.showaddSavingDeposit && <SavingDepositForm addSavingDeposit={this.addSavingDeposit} />}
            {this.props.children}
          </div>
        */}
      </div>
    );
  }
}
