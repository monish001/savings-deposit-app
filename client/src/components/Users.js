import React from "react";
import { Image, Panel, Alert, Glyphicon, Button, Modal } from "react-bootstrap";
import { Link } from "react-router";
import UserEditForm from "./UserEditForm";
import UsersConfirmationModal from "./UsersConfirmationModal";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.submitEditUser = this.submitEditUser.bind(this);
    this.setNewProfilePhoto = this.setNewProfilePhoto.bind(this);
    this.submitNewPhoto = this.submitNewPhoto.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
    this.confirmResetPasswordUser = this.confirmResetPasswordUser.bind(this);
    this.hideResetPasswordModal = this.hideResetPasswordModal.bind(this);
    this.showResetPasswordModal = this.showResetPasswordModal.bind(this);
    this.confirmUnblockUser = this.confirmUnblockUser.bind(this);
    this.hideUnblockUserModal = this.hideUnblockUserModal.bind(this);
    this.showUnblockUserModal = this.showUnblockUserModal.bind(this);
  }
  componentWillMount() {
    // this.props.mappedFetchUsers(); @todo uncomment
  }
  hideUnblockUserModal() {
    this.props.mappedHideUnblockUserModal();
  }
  showUnblockUserModal(userToUnblock) {
    this.props.mappedShowUnblockUserModal(userToUnblock);
  }
  confirmUnblockUser() {
    this.props.mappedUnblockUser(this.props.mappedUsersState.userToUnblock);
  }
  hideResetPasswordModal() {
    this.props.mappedHideResetPasswordModal();
  }
  showResetPasswordModal(userToResetPassword) {
    this.props.mappedShowResetPasswordModal(userToResetPassword);
  }
  confirmResetPasswordUser() {
    this.props.mappedResetPasswordUser(
      this.props.mappedUsersState.userToResetPassword
    );
  }
  showEditModal(userToEdit) {
    this.props.mappedShowEditModal(userToEdit);
  }
  hideEditModal() {
    this.props.mappedHideEditModal();
  }
  submitEditUser(e) {
    e.preventDefault();
    const form = document.getElementById("UserEditForm");
    const newUser = {
      _id: form._id.value,
      role: form.role.value
    };
    const oldUser = this.props.mappedUsersState.users.find(
      user => user._id === form._id.value
    );
    this.props.mappedEditUser(newUser, oldUser);
  }
  setNewProfilePhoto(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.props.mappedUploadUserPictureInBrowser(reader.result);
    };
    reader.readAsDataURL(file);
  }
  submitNewPhoto(e) {
    e.preventDefault();
    const form = document.getElementById("UserEditForm");
    this.props.mappedSubmitPicture({
      _id: form._id.value,
      photo: this.props.mappedUsersState.imageToUpdate
    });
  }
  hideDeleteModal() {
    this.props.mappedHideDeleteModal();
  }
  showDeleteModal(userToDelete) {
    this.props.mappedShowDeleteModal(userToDelete);
  }
  confirmDeleteUser() {
    this.props.mappedDeleteUser(this.props.mappedUsersState.userToDelete);
  }
  render() {
    const profileState = this.props.mappedProfileState;
    const showInvite =
      profileState.profile &&
      profileState.profile.role &&
      profileState.profile.role === "ADMIN";
    const usersState = this.props.mappedUsersState;
    const users = usersState.users;
    const editUser = usersState.userToEdit;
    return (
      <div className="col-md-12">
        <h3 className="centerAlign">Users</h3>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Actions</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <div>
              <Link to={`/users/create`}>
                <Button onClick={() => {}} bsStyle="info" bsSize="small">
                  <Glyphicon glyph="plus" /> Add new user {/*@todo*/}
                </Button>
              </Link>
            </div><p />
            {showInvite &&
              <div>
                <Button onClick={() => {}} bsStyle="info" bsSize="small">
                  <Glyphicon glyph="envelope" /> Invite user {/*@todo*/}
                </Button>
              </div>}
          </Panel.Body>
        </Panel>
        {!users && usersState.isFetching && <p>Loading users....</p>}
        {users.length <= 0 &&
          !usersState.isFetching &&
          !usersState.error &&
          <p>No Users Available. Add a User to List here.</p>}

        {users.length <= 0 &&
          !usersState.isFetching &&
          usersState.error &&
          <p>Failed. {usersState.error}</p>}

        {users &&
          users.length > 0 &&
          !usersState.isFetching &&
          <table className="table usersTable">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Email</th>
                <th>Role</th>
                {/*<th>is Email Logged</th>
                <th>is Email Verified</th>
                <th>is Google Logged</th>
                <th>is Facebook Logged</th>*/}
                <th className="textCenter">Edit</th>
                <th className="textCenter">Delete</th>
                <th className="textCenter">Reset password</th>
                <th className="textCenter">Unblock</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={`user-${user._id}-${i}`}>
                  <td>
                    {user.photo &&
                      <Image
                        style={{ height: "3rem" }}
                        src={`${user.photo}`}
                        rounded
                      />}
                    {!user.photo &&
                      <Glyphicon
                        style={{ "font-size": "3rem" }}
                        glyph="user"
                      />}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="textCenter">
                    <Button
                      onClick={() => this.showEditModal(user)}
                      bsStyle="info"
                      bsSize="small"
                    >
                      <Glyphicon glyph="pencil" />
                    </Button>
                  </td>
                  <td className="textCenter">
                    <Button
                      onClick={() => this.showDeleteModal(user)}
                      bsStyle="danger"
                      bsSize="small"
                    >
                      <Glyphicon glyph="trash" />
                    </Button>
                  </td>
                  <td className="textCenter">
                    <Button
                      onClick={() => this.showResetPasswordModal(user)}
                      bsStyle="info"
                      bsSize="small"
                    >
                      <Glyphicon glyph="refresh" />
                    </Button>
                  </td>
                  {user.retryCount == 3 &&
                    <td>
                      {" "}<Button
                        onClick={() => this.showUnblockUserModal(user)}
                        bsStyle="info"
                        bsSize="small"
                      >
                        Unblock
                      </Button>
                    </td>}
                </tr>
              ))}
            </tbody>
          </table>}

        {/* Modal for editing user */}
        <Modal
          show={usersState.showEditModal}
          onHide={this.hideEditModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Edit Your User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12" style={{ float: "initial" }}>
              {editUser &&
                <UserEditForm
                  userData={editUser}
                  submitEditUser={this.submitEditUser}
                  setNewProfilePhoto={this.setNewProfilePhoto}
                  submitNewPhoto={this.submitNewPhoto}
                />}
              {editUser &&
                usersState.isFetching &&
                <Alert bsStyle="info">
                  <strong>Updating...... </strong>
                </Alert>}
              {editUser &&
                !usersState.isFetching &&
                usersState.error &&
                <Alert bsStyle="danger">
                  <strong>Failed. {usersState.error} </strong>
                </Alert>}
              {editUser &&
                !usersState.isFetching &&
                usersState.successMsg &&
                <Alert bsStyle="success">
                  Book
                  {" "}
                  <strong> {editUser.userText} </strong>
                  {usersState.successMsg}
                </Alert>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideEditModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for deleting user */}
        <UsersConfirmationModal
          show={usersState.showDeleteModal}
          onHide={this.hideDeleteModal}
          container={this}
          displayTitle="Delete user"
          usersState={usersState}
          user={usersState.userToDelete}
          confirm={this.confirmDeleteUser}
          hideUserModal={this.hideDeleteModal}
          displayBody="Are you sure you want to delete the user"
        />

        {/* Modal for reset password */}
        <UsersConfirmationModal
          show={usersState.showResetPasswordModal}
          onHide={this.hideResetPasswordModal}
          container={this}
          displayTitle="Reset password"
          usersState={usersState}
          user={usersState.userToResetPassword}
          confirm={this.confirmResetPasswordUser}
          hideUserModal={this.hideResetPasswordModal}
          displayBody="Are you sure you want to trigger password reset for user"
        />

        {/* Modal for unblock user */}
        <UsersConfirmationModal
          show={usersState.showUnblockUserModal}
          onHide={this.hideUnblockUserModal}
          container={this}
          displayTitle="Unblock user"
          usersState={usersState}
          user={usersState.userToUnblock}
          confirm={this.confirmUnblockUser}
          hideUserModal={this.hideUnblockUserModal}
          displayBody="Are you sure you want to unblock the user"
        />
      </div>
    );
  }
}
