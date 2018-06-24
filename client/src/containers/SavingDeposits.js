// ./react-redux-client/src/containers/SavingDeposits.js
import { connect } from "react-redux";
import * as savingDepositActions from "../actions/savingDepositActions";
import SavingDeposits from "../components/SavingDeposits";
// map state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    //you can now say this.props.mappedAppSate
    mappedSavingDepositState: state.savingDepositState
  };
};
// map actions to props
const mapDispatchToProps = dispatch => {
  return {
    //you can now say this.props.mappedAppActions
    fetchSavingDeposits: () =>
      dispatch(savingDepositActions.fetchSavingDeposits()),
    mappedEditSavingDeposit: savingDepositToEdit =>
      dispatch(savingDepositActions.editSavingDeposit(savingDepositToEdit)),
    mappedShowEditModal: savingDepositToEdit =>
      dispatch(savingDepositActions.showEditModal(savingDepositToEdit)),
    mappedHideEditModal: () => dispatch(savingDepositActions.hideEditModal()),
    mappedDeleteSavingDeposit: savingDepositToDelete =>
      dispatch(savingDepositActions.deleteSavingDeposit(savingDepositToDelete)),
    mappedshowDeleteModal: savingDepositToDelete =>
      dispatch(savingDepositActions.showDeleteModal(savingDepositToDelete)),
    mappedhideDeleteModal: () =>
      dispatch(savingDepositActions.hideDeleteModal()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SavingDeposits);
