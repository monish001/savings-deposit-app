const INITIAL_STATE = {
  // savingDeposits: [],
  savingDeposits: [{ // @todo mock data
    _id: 1,
    userId: 2,
    bankName: 'SBI',
    accountNumber: '6502349832489433',
    initialAmount: 300.00,
    startDate: "2018-06-01T06:30:00.000Z",
    endDate: "2018-06-02T06:30:00.000Z",
    interest: 10.01,
    tax: 30
  },{ // @todo mock data
    _id: 3,
    userId: 1,
    bankName: 'HDFC BANK',
    accountNumber: '3534534534545',
    initialAmount: 200.00,
    startDate: "2018-06-03T06:30:00.000Z",
    endDate: "2018-06-04T06:30:00.000Z",
    interest: -12.12,
    tax: 40
  }],
  savingDepositsFilter: {},
  savingDeposit: { // @todo mock data
    _id: 1,
    userId: 2,
    bankName: 'SBI',
    accountNumber: '6502349832489433',
    initialAmount: 300.00,
    startDate: "2018-06-01T06:30:00.000Z",
    endDate: "2018-06-02T06:30:00.000Z",
    interest: 10.01,
    tax: 30
  },
  // savingDeposit: null,
  isFetching: false,
  error: null,
  successMsg: null,
  showDeleteModal: false,
  savingDepositToDelete: null,
  showGenerateReportModal: false,
  showEditModal: false,
  savingDepositToEdit: null,
  newSavingDeposit: null
};
const savingDepositReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_SAVING_DEPOSITS_REQUEST":
      return {
        ...currentState,
        savingDeposits: [],
        savingDepositsFilter: action.savingDepositsFilter,
        savingDeposit: null,
        isFetching: true,
        error: null,
        successMsg: null,
      };
    case "FETCH_SAVING_DEPOSITS_SUCCESS":
      return {
        ...currentState,
        savingDeposits: action.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showGenerateReportModal: false,
      };
    case "FETCH_SAVING_DEPOSITS_FAILED":
      return {
        ...currentState,
        savingDeposits: [],
        savingDeposit: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
      };
    case "FETCH_SAVING_DEPOSIT_REQUEST":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: true,
        error: null,
        successMsg: null,
      };
    case "FETCH_SAVING_DEPOSIT_SUCCESS":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: action.savingDeposit,
        isFetching: false,
        error: null,
        successMsg: action.message,
      };
    case "FETCH_SAVING_DEPOSIT_FAILED":
      return {
        ...currentState,
        savingDeposits: [],
        savingDeposit: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
      };
    case "ADD_NEW_SAVING_DEPOSIT_REQUEST":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: true,
        error: null,
        successMsg: null,
        newSavingDeposit: action.savingDeposit
      };
    case "ADD_NEW_SAVING_DEPOSIT_REQUEST_FAILED":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        newSavingDeposit: null
      };
    case "ADD_NEW_SAVING_DEPOSIT_REQUEST_SUCCESS":
      const nextState = {
        ...currentState,
        savingDeposits: [...currentState.savingDeposits, action.savingDeposit],
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        newSavingDeposit: action.savingDeposit
      };
      return nextState;
    case "SHOW_EDIT_SD_MODAL":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showEditModal: true,
        savingDepositToEdit: action.savingDeposit,
        newSavingDeposit: null
      };
    case "HIDE_EDIT_SD_MODAL":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showEditModal: false,
        savingDepositToEdit: null,
        newSavingDeposit: null
      };
    case "EDIT_SAVING_DEPOSIT_REQUEST":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showEditModal: true,
        newSavingDeposit: null
      };
    case "EDIT_SAVING_DEPOSIT_SUCCESS":
      const updatedSavingDeposits = currentState.savingDeposits.map(savingDeposit => {
        if (savingDeposit._id !== action.savingDeposit._id) {
          //This is not the item we care about, keep it as is
          return savingDeposit;
        }
        //Otherwise, this is the one we want to return an updated value
        return { ...savingDeposit,
          ...action.savingDeposit
        };
      });
      return {
        ...currentState,
        savingDeposits: updatedSavingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showEditModal: true,
        savingDepositToEdit: null,
        newSavingDeposit: null
      };
    case "EDIT_SAVING_DEPOSIT_FAILED":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showEditModal: true,
        savingDepositToEdit: currentState.savingDepositToEdit,
        newSavingDeposit: null
      };
    case "DELETE_SAVING_DEPOSIT_REQUEST":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: true,
        savingDepositToDelete: action.savingDeposit,
        newSavingDeposit: null
      };
    case "DELETE_SAVING_DEPOSIT_SUCCESS":
      const filteredSavingDeposits = currentState.savingDeposits.filter(
        savingDeposit => savingDeposit._id !== currentState.savingDepositToDelete._id
      );
      return {
        ...currentState,
        savingDeposits: filteredSavingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: true,
        savingDepositToDelete: null,
        newSavingDeposit: null
      };
    case "DELETE_SAVING_DEPOSIT_FAILED":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: true,
        savingDepositToDelete: currentState.savingDepositToDelete,
        newSavingDeposit: null
      };
    case "SHOW_DELETE_SD_MODAL":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: true,
        savingDepositToDelete: action.savingDeposit,
        newSavingDeposit: null
      };
    case "HIDE_DELETE_SD_MODAL":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        savingDepositToDelete: null,
        newSavingDeposit: null
      };
    case "SHOW_GENERATE_REPORT_SD_MODAL":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showGenerateReportModal: true,
        newSavingDeposit: null
      };
    case "HIDE_GENERATE_REPORT_SD_MODAL":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showGenerateReportModal: false,
        newSavingDeposit: null
      };
    default:
      return currentState;
  }
};
export default savingDepositReducer;