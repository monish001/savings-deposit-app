import React from "react";
import { Image, Panel, Alert, Glyphicon, Button, Modal } from "react-bootstrap";
import { Link } from "react-router";
import UserEditForm from "./UserEditForm";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.submitEditUser = this.submitEditUser.bind(this);
    this.setNewProfilePhoto = this.setNewProfilePhoto.bind(this);
    this.submitNewPhoto = this.submitNewPhoto.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
  }
  componentWillMount() {
    // this.props.mappedFetchUsers(); @todo uncomment
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
    const showUnblock =
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
            <Link to={`/users/create`}>
              <Button onClick={() => {}} bsStyle="info" bsSize="small">
                <Glyphicon glyph="plus" /> Add new user
              </Button>
            </Link>
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

                {/*@todo reset password button*/}

                {/*<th>is Email Logged</th>
                <th>is Email Verified</th>
                <th>is Google Logged</th>
                <th>is Facebook Logged</th>*/}
                <th className="textCenter">Edit</th>
                <th className="textCenter">Delete</th>
                {showUnblock && <th className="textCenter">Unblock</th>}
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
                  {showUnblock &&
                    user.retryCount == 3 &&
                    <td>
                      {" "}<Button
                        onClick={() => this.showEditModal(user)}
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
        <Modal
          show={usersState.showDeleteModal}
          onHide={this.hideDeleteModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Delete user
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {usersState.userToDelete &&
              !usersState.isFetching &&
              <Alert bsStyle="warning">
                Are you sure you want to delete this user
                {" "}
                <strong>{usersState.userToDelete.userText} </strong>
                {" "}
                ?
              </Alert>}
            {usersState.userToDelete &&
              usersState.error &&
              <Alert bsStyle="danger">
                Failed. <strong>{usersState.error} </strong>
              </Alert>}
            {usersState.userToDelete &&
              !usersState.error &&
              usersState.isFetching &&
              <Alert bsStyle="success">
                <strong>Deleting... </strong>
              </Alert>}
            {!usersState.userToDelete &&
              !usersState.error &&
              !usersState.isFetching &&
              <Alert bsStyle="success">
                User <strong>{usersState.successMsg} </strong>
              </Alert>}
          </Modal.Body>
          <Modal.Footer>
            {!usersState.successMsg &&
              !usersState.isFetching &&
              <div>
                <Button bsSize="small" onClick={this.confirmDeleteUser}>
                  Yes
                </Button>
                <Button bsSize="small" onClick={this.hideDeleteModal}>
                  No
                </Button>
              </div>}
            {usersState.successMsg &&
              !usersState.isFetching &&
              <Button bsSize="small" onClick={this.hideDeleteModal}>
                Close
              </Button>}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
