import React from "react";
import { FormGroup, ControlLabel, Alert, FormControl, Button } from "react-bootstrap";

export default class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.submitCreateUser = this.submitCreateUser.bind(this);
  }
  submitCreateUser(e) {
    e.preventDefault();
    const form = document.getElementById("UserCreateForm");
    const newUser = {
      role: form.role.value,
      email: form.email.value
    };
    this.props.mappedCreateUser(newUser);
  }
  render() {
    const usersState = this.props.mappedUsersState;
    return (
      <div>
        <form
          className="form form-horizontal"
          id="UserCreateForm"
          onSubmit={this.submitCreateUser}
        >
          <div className="row">
            <div className="col-md-12">
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="email"
                  placeholder="Enter email"
                  name="email"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Role</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="Select role"
                  defaultValue={'REGULAR_USER'}
                  name="role"
                >
                  <option value="REGULAR_USER">User</option>
                  <option value="USER_MANAGER">User Manager</option>
                  <option value="ADMIN">Admin</option>
                </FormControl>
              </FormGroup>
            </div>
          </div>
          <FormGroup>
            <Button type="submit" bsStyle="info" bsSize="small" block>
              Create
            </Button>
          </FormGroup>
        </form>
        {!usersState.isFetching &&
          usersState.successMsg &&
          <Alert bsStyle="success">
            New user
            <strong>{usersState.newUser.email}</strong> created!
          </Alert>}
        {!usersState.isFetching &&
          usersState.error &&
          <Alert bsStyle="danger">
            Failed!{" "}
            <strong>{usersState.error}</strong>
          </Alert>}
        {usersState.isFetching &&
          <Alert bsStyle="success">
            Creating...
          </Alert>}
      </div>
    );
  }
}
