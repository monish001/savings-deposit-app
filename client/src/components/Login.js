import React from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Row,
  Grid,
  Col
} from "react-bootstrap";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login(e) {
    e.preventDefault();
    const form = document.getElementById("logInForm");
    const email = form.email.value;
    const password = form.password.value;
    this.props.mappedLogin({ email, password });
  }
  register(e) {
    e.preventDefault();
    const form = document.getElementById("signUpForm");
    const email = form.email.value;
    const password = form.password.value;
    const cpassword = form.cpassword.value;
    this.props.mappedRegister({ email, password, cpassword });
  }

  render() {
    const profileState = this.props.mappedProfileState;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <h3>Login</h3>
              <form
                className="form form-horizontal"
                id="logInForm"
                onSubmit={this.login}
              >
                <FormGroup controlId="formHorizontalLoginEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="email"
                      type="email"
                      placeholder="Email"
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalLoginPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit" bsStyle="info">
                      {`${profileState.isLoggingIn ? "Signing In..." : "Sign In"}`}
                    </Button>
                  </Col>
                </FormGroup>

                {profileState.loginError &&
                  <FormGroup controlId="formHorizontalFeedback">
                    <Col sm={12}>
                      <FormControl.Static>
                        {profileState.loginError}
                      </FormControl.Static>
                    </Col>
                  </FormGroup>}

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
              </form>
            </Col>
            <Col xs={12} md={6}>
              <h3>Signup</h3>
              <form
                className="form form-horizontal"
                id="signUpForm"
                onSubmit={this.register}
              >
                <FormGroup controlId="formHorizontalSignupEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="email"
                      type="email"
                      placeholder="Email"
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalSignupPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalSignupConfirmPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="cpassword"
                      type="password"
                      placeholder="Password"
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit" bsStyle="info">
                      {`${profileState.isSigningUp ? "Signing Up..." : "Sign Up"}`}
                    </Button>
                  </Col>
                </FormGroup>

                {profileState.signUpError &&
                  <FormGroup controlId="formHorizontalFeedback">
                    <Col sm={12}>
                      <FormControl.Static>
                        {profileState.signUpError}
                      </FormControl.Static>
                    </Col>
                  </FormGroup>}

              </form>
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}
