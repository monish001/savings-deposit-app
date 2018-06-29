const INITIAL_STATE = {
  savingDepositsReport: {},
  // savingDepositsReport: {
  //   rows: [
  //     {
  //       _id: 1,
  //       userId: 2,
  //       bankName: "SBI",
  //       accountNumber: "6502349832489433",
  //       initialAmount: '300.00',
  //       startDate: "2018-06-01T06:30:00.000Z",
  //       endDate: "2018-06-02T06:30:00.000Z",
  //       interest: '10.01',
  //       tax: '30.00',
  //       gainsInUsd: '30.50',
  //       taxInUsd: '30.00'
  //     },
  //     {
  //       _id: 3,
  //       userId: 1,
  //       bankName: "HDFC BANK",
  //       accountNumber: "3534534534545",
  //       initialAmount: '200.00',
  //       startDate: "2018-06-03T06:30:00.000Z",
  //       endDate: "2018-06-04T06:30:00.000Z",
  //       interest: '-12.12',
  //       tax: '40.00',
  //       gainsInUsd: '-45.00',
  //       taxInUsd: '0.00'
  //     }
  //   ],
  //   summary: {
  //     totalGains: '12.00',
  //     totalLoss: '13.00',
  //     totalTax: '14.00'
  //   },
  //   request: {
  //     startDate: "2018-06-01",
  //     endDate: "2018-07-01"
  //   }
  // },
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
        successMsg: null
      };
    case "FETCH_SAVING_DEPOSITS_REPORT_SUCCESS":
      return {
        ...currentState,
        savingDepositsReport: action.savingDepositsReport,
        isFetching: false,
        error: null,
        successMsg: action.message
      };
    case "FETCH_SAVING_DEPOSITS_REPORT_FAILED":
      return {
        ...currentState,
        savingDepositsReport: {},
        isFetching: false,
        error: action.error,
        successMsg: null
      };
    default:
      return currentState;
  }
};
export default savingDepositsReportReducer;
