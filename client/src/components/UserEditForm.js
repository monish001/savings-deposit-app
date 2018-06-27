import React from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

const UserEditForm = props => {
    /** @todo show image upload form and Other info. form (containing only role for now)  */
  return (
    <form
      className="form form-horizontal"
      id="UserEditForm"
      onSubmit={props.editUser}
    >
      <div className="row">
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>User: </ControlLabel>
            <input type="hidden" value={props.userData._id} name="id" />
            <FormControl
              type="text"
              placeholder="Enter user"
              name="userText"
              defaultValue={props.userData.userText}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Description: </ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Enter description"
              name="userDesc"
              defaultValue={props.userData.userDesc}
            />
          </FormGroup>
        </div>
      </div>
      <FormGroup>
        <Button type="submit" bsStyle="success" bsSize="large" block>
          Submit
        </Button>
      </FormGroup>
    </form>
  );
};
export default UserEditForm;
