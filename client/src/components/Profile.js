import React from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Image,
  Row,
  Grid,
  Col,
  Button,
  Glyphicon,
  Alert
} from "react-bootstrap";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.uploadPicture = this.uploadPicture.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitPicture = this.submitPicture.bind(this);
  }

  submitPicture(e) {
    e.preventDefault();
    this.props.mappedSubmitPicture({
      photo: this.props.mappedProfileState.imageToUpdate,
    });
  }

  uploadPicture(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.props.mappedUploadPictureInBrowser(reader.result);
    };
    reader.readAsDataURL(file);
  }

  updatePassword(e) {
    e.preventDefault();
    const formData = document.getElementById("updatePasswordForm");
    const args = {
      oldPassword: formData.oldPassword.value,
      newPassword: formData.newPassword.value,
      confirmNewPassword: formData.confirmNewPassword.value
    };
    this.props.mappedUpdatePassword(args);
  }

  render() {
    const profileState = this.props.mappedProfileState;

    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center" }}>
                {profileState.profile && profileState.profile.photo &&
                  <Image src={`${profileState.profile.photo}`} rounded />}
                {!(profileState.profile && profileState.profile.photo) &&
                  <Glyphicon style={{ fontSize: "20rem" }} glyph="user" />}
              </div>
              <form
                className="form form-horizontal"
                id="updateProfilePictureForm"
                onSubmit={this.submitPicture}
              >
                <FormGroup>
                  <ControlLabel>Upload new picture</ControlLabel>
                  <FormControl
                    name="picture"
                    type="file"
                    onChange={this.uploadPicture}
                  />
                </FormGroup>
                <FormGroup>
                  <Button type="submit" bsStyle="info" bsSize="small" block>
                    {!profileState.isUpdatingPicture
                      ? "Update picture"
                      : "Updating..."}
                  </Button>
                </FormGroup>
              </form>
              {!profileState.isUpdatingPicture &&
                profileState.pictureSuccess &&
                <Alert bsStyle="success">
                  <strong>Success. {profileState.pictureSuccess}</strong>
                </Alert>}
              {!profileState.isUpdatingPicture &&
                profileState.pictureError &&
                <Alert bsStyle="danger">
                  <strong>Failed. {profileState.pictureError} </strong>
                </Alert>}
            </Col>
            <Col md={1} />
            <Col xs={12} md={7}>
              <form
                className="form form-horizontal"
                id="updatePasswordForm"
                onSubmit={this.updatePassword}
              >
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl.Static>
                      {profileState.profile && profileState.profile.email}
                    </FormControl.Static>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalOldPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Old Password
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="oldPassword"
                      type="password"
                      placeholder="Password"
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalNewPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    New Password
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalConfirmNewPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Confirm New Password
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="confirmNewPassword"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Button type="submit" bsStyle="info" bsSize="small" block>
                    {profileState.isUpdatingPassword
                      ? "Updating..."
                      : "Update password"}
                  </Button>
                </FormGroup>
              </form>

              {!profileState.isUpdatingPassword &&
                profileState.passwordChangeSuccess &&
                <Alert bsStyle="success">
                  <strong>Success. {profileState.passwordChangeSuccess}</strong>
                </Alert>}
              {!profileState.isUpdatingPassword &&
                profileState.passwordChangeError &&
                <Alert bsStyle="danger">
                  <strong>Failed. {profileState.passwordChangeError} </strong>
                </Alert>}

            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
