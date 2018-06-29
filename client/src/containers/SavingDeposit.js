import { connect } from "react-redux";
import * as savingDeposit from "../actions/savingDepositActions";
import SavingDeposit from "../components/SavingDeposit";
// map state from store to props
const mapStateToProps = state => {
  return {
    //you can now say this.props.mappedAppSate
    mappedSavingDepositState: state.savingDepositState,
    mappedProfileState: state.profileState,
  };
};
// map actions to props
const mapDispatchToProps = dispatch => {
  return {
    //you can now say this.props.mappedAppActions
    mappedFetchSavingDepositById: (savingDepositId, isAdmin=false) =>
      dispatch(savingDeposit.fetchSavingDepositById(savingDepositId, isAdmin))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SavingDeposit);
