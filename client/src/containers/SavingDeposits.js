import { connect } from "react-redux";
import * as savingDepositActions from "../actions/savingDepositActions";
import * as userActions from "../actions/usersActions";
import SavingDeposits from "../components/SavingDeposits";

// map state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    //you can now say this.props.mappedAppSate
    mappedSavingDepositState: state.savingDepositState,
    mappedUsersState: state.usersState,
    mappedProfileState: state.profileState,
  };
};

// map actions to props
const mapDispatchToProps = dispatch => {
  return {
    //you can now say this.props.mappedAppActions
    mappedFetchUsers: () => dispatch(userActions.fetchUsers()),

    mappedFetchSavingDeposits: (filters, isAdmin=false) =>
        dispatch(savingDepositActions.fetchSavingDeposits(filters, isAdmin)),
    mappedEditSavingDeposit: (savingDepositToEdit, isAdmin=false) =>
      dispatch(savingDepositActions.editSavingDeposit(savingDepositToEdit, isAdmin)),
    mappedShowEditModal: savingDepositToEdit =>
      dispatch(savingDepositActions.showEditModal(savingDepositToEdit)),
    mappedHideEditModal: () => dispatch(savingDepositActions.hideEditModal()),
    mappedDeleteSavingDeposit: (savingDepositToDelete, isAdmin) =>
      dispatch(savingDepositActions.deleteSavingDeposit(savingDepositToDelete, isAdmin)),
      mappedShowDeleteModal: savingDepositToDelete =>
      dispatch(savingDepositActions.showDeleteModal(savingDepositToDelete)),
    mappedHideDeleteModal: () =>
      dispatch(savingDepositActions.hideDeleteModal()),
    mappedShowGenerateReportModal: () =>
      dispatch(savingDepositActions.showGenerateReportModal()),
    mappedHideGenerateReportModal: () =>
      dispatch(savingDepositActions.hideGenerateReportModal()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SavingDeposits);
