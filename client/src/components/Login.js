import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Panel, Alert, Glyphicon, Button, Modal } from "react-bootstrap";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Image,
  Row,
  Grid,
  Col
} from "react-bootstrap";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const appState = this.props.mappedAppState;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <h3>Login</h3>
              <Form horizontal>
                <FormGroup controlId="formHorizontalLoginEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalLoginPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">Sign in</Button>
                  </Col>
                </FormGroup>
                <FormGroup controlId="">
                  <Col componentClass={ControlLabel} sm={2} />
                  <Col sm={10}>
                    <FormControl.Static>
                      OR
                    </FormControl.Static>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <div class="g-signin2" data-onsuccess="onSignIn" />
                  </Col>
                </FormGroup>
              </Form>
            </Col>
            <Col xs={12} md={6}>
              <h3>Signup</h3>
              <Form horizontal>
                <FormGroup controlId="formHorizontalSignupEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalSignupPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalSignupConfirmPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">Sign up</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}
