const INITIAL_STATE = {
  savingDepositsReport: {},
  savingDepositsFilter: {},
  isFetching: false,
  error: null,
  successMsg: null
};
const savingDepositsReportReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_SAVING_DEPOSITS_REPORT_REQUEST":
      return {
        ...currentState,
        savingDepositsReport: {},
        savingDepositsFilter: action.savingDepositsFilter,
        isFetching: true,
        error: null,
        successMsg: null,
      };
    case "FETCH_SAVING_DEPOSITS_REPORT_SUCCESS":
      return {
        ...currentState,
        savingDepositsReport: action.savingDepositsReport,
        isFetching: false,
        error: null,
        successMsg: action.message,
      };
    case "FETCH_SAVING_DEPOSITS_REPORT_FAILED":
      return {
        ...currentState,
        savingDepositsReport: {},
        isFetching: false,
        error: action.error,
        successMsg: null,
      };
    default:
      return currentState;
  }
};
export default savingDepositsReportReducer;
