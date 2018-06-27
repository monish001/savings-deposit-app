const INITIAL_STATE = {
  // savingDepositsReport: {},
  // @todo mock data
  savingDepositsReport: {
    rows: [{
        _id: 1,
        bankName: 1,
        accountNumber: 2,
        initialAmount: 3,
        startDate: "2018-06-01T06:30:00.000Z",
        endDate: "2018-06-02T06:30:00.000Z",
        gains: 12.12,
        tax: 1.12
      },
      {
        _id: 2,
        bankName: 1,
        accountNumber: 2,
        initialAmount: 3,
        startDate: "2018-06-01T06:30:00.000Z",
        endDate: "2018-06-02T06:30:00.000Z",
        gains: -12.12,
        tax: 0
      }
    ],
    summary: {
      totalGains: 12,
      totalLoss: 13,
      totalTax: 14,
    },
    request: {
      startDate: "2018-06-01",
      endDate: "2018-07-01"
    }
  },
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