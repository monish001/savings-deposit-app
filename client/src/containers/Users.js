import { connect } from "react-redux";
import * as userActions from "../actions/usersActions";
import Users from "../components/Users";

// map state from store to props
const mapStateToProps = state => {
  return {
    //you can now say this.props.mappedAppSate
    mappedUsersState: state.usersState,
    mappedProfileState: state.profileState
  };
};
// map actions to props
const mapDispatchToProps = dispatch => {
  return {
    //you can now say this.props.mappedAppActions
    mappedFetchUsers: () => dispatch(userActions.fetchUsers()),

    mappedEditUser: (userToEdit, oldUser) =>
      dispatch(userActions.editUser(userToEdit, oldUser)),
    mappedShowEditModal: userToEdit =>
      dispatch(userActions.showEditModal(userToEdit)),
    mappedHideEditModal: () => dispatch(userActions.hideEditModal()),

    mappedDeleteUser: userToDelete =>
      dispatch(userActions.deleteUser(userToDelete)),
    mappedShowDeleteModal: userToDelete =>
      dispatch(userActions.showDeleteModal(userToDelete)),
    mappedHideDeleteModal: () => dispatch(userActions.hideDeleteModal()),

    mappedResetPasswordUser: userToResetPassword =>
      dispatch(userActions.resetPassword(userToResetPassword)),
    mappedShowResetPasswordModal: userToResetPassword =>
      dispatch(userActions.showResetPasswordModal(userToResetPassword)),
    mappedHideResetPasswordModal: () =>
      dispatch(userActions.hideResetPasswordModal()),

    mappedUnblockUser: userToUnblock =>
      dispatch(userActions.unblockUser(userToUnblock)),
    mappedShowUnblockUserModal: userToUnblock =>
      dispatch(userActions.showUnblockUserModal(userToUnblock)),
    mappedHideUnblockUserModal: () =>
      dispatch(userActions.hideUnblockUserModal()),

    mappedUploadUserPictureInBrowser: base64Image =>
      dispatch(userActions.uploadUserPictureInBrowser(base64Image)),
    mappedSubmitPicture: userToEdit =>
      dispatch(userActions.submitPicture(userToEdit)),

    mappedInviteUser: email =>
      dispatch(userActions.inviteUser(email)),
    mappedShowInviteUserModal: () =>
      dispatch(userActions.showInviteUserModal()),
    mappedHideInviteUserModal: () =>
      dispatch(userActions.hideInviteUserModal()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
