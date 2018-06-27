import { connect } from "react-redux";
import * as userActions from "../actions/usersActions";
import Users from "../components/Users";

// map state from store to props
const mapStateToProps = state => {
  return {
    //you can now say this.props.mappedAppSate
    mappedUsersState: state.usersState,
    mappedProfileState: state.profileState,
  };
};
// map actions to props
const mapDispatchToProps = dispatch => {
  return {
    //you can now say this.props.mappedAppActions
    mappedFetchUsers: () => dispatch(userActions.fetchUsers()),
    mappedEditUser: userToEdit => dispatch(userActions.editUser(userToEdit)),
    mappedShowEditModal: userToEdit =>
      dispatch(userActions.showEditModal(userToEdit)),
    mappedHideEditModal: () => dispatch(userActions.hideEditModal()),
    mappedDeleteUser: userToDelete =>
      dispatch(userActions.deleteUser(userToDelete)),
    mappedShowDeleteModal: userToDelete =>
      dispatch(userActions.showDeleteModal(userToDelete)),
    mappedHideDeleteModal: () => dispatch(userActions.hideDeleteModal())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
