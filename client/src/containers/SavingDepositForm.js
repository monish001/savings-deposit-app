import { connect } from "react-redux";
import * as savingDepositActions from "../actions/savingDepositActions";
import SavingDepositForm from "../components/SavingDepositForm";

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
    mappedAddNewSavingDeposit: (savingDeposit, isAdmin=false) =>
      dispatch(savingDepositActions.addNewSavingDeposit(savingDeposit, isAdmin))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SavingDepositForm);
