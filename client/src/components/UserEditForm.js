import React from "react";
import {
  Image,
  Glyphicon,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";

const UserEditForm = props => {
  return (
    <div>
      <form
        className="form form-horizontal"
        id="UserEditForm"
        onSubmit={props.submitEditUser}
      >
        <div className="row">
          <div className="col-md-12">
            <FormGroup>
              <ControlLabel>Role</ControlLabel>
              <input type="hidden" value={props.editUserRequest._id} name="_id" />
              <FormControl
                componentClass="select"
                placeholder="Select role"
                defaultValue={props.editUserRequest.role}
                name="role"
              >
                <option value="REGULAR_USER">{`User${props.userToEdit.role === 'REGULAR_USER'?' (current)':''}`}</option>
                <option value="USER_MANAGER">{`User Manager${props.userToEdit.role === 'USER_MANAGER'?' (current)':''}`}</option>
                <option value="ADMIN">{`Admin${props.userToEdit.role === 'ADMIN'?' (current)':''}`}</option>
              </FormControl>
            </FormGroup>
          </div>
        </div>
        <FormGroup>
          <Button type="submit" bsStyle="info" bsSize="small" block>
            Update
          </Button>
        </FormGroup>
      </form>

      <div style={{ textAlign: "center" }}>
        {props.editUserRequest.photo &&
          <Image src={`${props.editUserRequest.photo}`} rounded />}
        {!props.editUserRequest.photo &&
          <Glyphicon style={{ fontSize: "20rem" }} glyph="user" />}
      </div>

      <form
        className="form form-horizontal"
        id="UserPhotoEditForm"
        onSubmit={props.submitNewPhoto}
      >
        <div className="row">
          <div className="col-md-12">
            <FormGroup>
              <ControlLabel>Upload new picture</ControlLabel>
              <input type="hidden" value={props.editUserRequest._id} name="_id" />
              <FormControl
                name="picture"
                type="file"
                onChange={props.setNewProfilePhoto}
              />
            </FormGroup>
            <FormGroup>
              <Button type="submit" bsStyle="info" bsSize="small" block>
                Update picture
              </Button>
            </FormGroup>
          </div>
        </div>
      </form>
    </div>
  );
};
export default UserEditForm;
