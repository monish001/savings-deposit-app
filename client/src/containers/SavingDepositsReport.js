import { connect } from "react-redux";
import SavingDepositsReport from "../components/SavingDepositsReport";
import * as savingDepositsReportActions from "../actions/savingDepositsReportActions";

// map state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    //you can now say this.props.mappedAppSate
    mappedSavingDepositsReportState: state.savingDepositsReportState
  };
};

// map actions to props
const mapDispatchToProps = dispatch => {
  return {
    //you can now say this.props.mappedAppActions
    mappedFetchSavingDepositsReport: filters =>
        dispatch(savingDepositsReportActions.fetchSavingDepositsReport(filters)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SavingDepositsReport);
