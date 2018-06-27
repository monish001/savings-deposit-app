import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Image,
  Row,
  Grid,
  Col,
  Form,
  Button,
  Glyphicon
} from "react-bootstrap";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const profileState = this.props.mappedProfileState;
    // @todo mock data
    profileState.profile.email = "ac@abc.com";
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              {profileState.pic &&
                <Image src={`"${profileState.pic}"`} rounded />}
              {!profileState.pic &&
                <div style={{"text-align":"center"}}><Glyphicon style={{ "font-size": "20rem" }} glyph="user" /></div>}
              <FormGroup>
                <Button type="submit" bsStyle="info" bsSize="large" block>
                  Upload new picture
                </Button>
              </FormGroup>

            </Col>
            <Col xs={12} md={8}>
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl.Static>
                      {profileState.profile.email}
                    </FormControl.Static>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Old Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Confirm Old Password
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </Col>
                </FormGroup><FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    New Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="New Password" />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Button type="submit" bsStyle="info" bsSize="large" block>
                    Update password
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
