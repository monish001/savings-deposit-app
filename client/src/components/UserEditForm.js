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
  /** @todo show image upload form and Other info. form (containing only role for now)  */
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
              <input type="hidden" value={props.userData._id} name="_id" />
              <FormControl
                componentClass="select"
                placeholder="Select role"
                defaultValue={props.userData.role}
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
            Update
          </Button>
        </FormGroup>
      </form>

      <div style={{ "text-align": "center" }}>
        {props.userData.photo &&
          <Image src={`${props.userData.photo}`} rounded />}
        {!props.userData.photo &&
          <Glyphicon style={{ "font-size": "20rem" }} glyph="user" />}
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
              <input type="hidden" value={props.userData._id} name="_id" />
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
