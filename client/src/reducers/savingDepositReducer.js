const INITIAL_STATE = {
  savingDeposits: [],
  savingDepositsFilter: {},
  savingDeposit: null,
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
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null
      };
    case "FETCH_SAVING_DEPOSITS_SUCCESS":
      return {
        ...currentState,
        savingDeposits: action.savingDeposits,
        savingDeposit: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null
      };
    case "FETCH_SAVING_DEPOSITS_FAILED":
      return {
        ...currentState,
        savingDeposits: [],
        savingDeposit: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null
      };
    case "FETCH_SAVING_DEPOSIT_REQUEST":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null
      };
    case "FETCH_SAVING_DEPOSIT_SUCCESS":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: action.savingDeposit,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null
      };
    case "FETCH_SAVING_DEPOSIT_FAILED":
      return {
        ...currentState,
        savingDeposits: [],
        savingDeposit: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null
      };
    case "ADD_NEW_SAVING_DEPOSIT_REQUEST":
      return {
        ...currentState,
        savingDeposits: currentState.savingDeposits,
        savingDeposit: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null,
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
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null,
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
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null,
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
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
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
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
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
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: true,
        savingDepositToEdit: action.savingDeposit,
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
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: true,
        savingDepositToEdit: action.savingDeposit,
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
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
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
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null,
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
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null,
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
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null,
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
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null,
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
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null,
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
        showDeleteModal: true,
        savingDepositToDelete: action.savingDeposit,
        showGenerateReportModal: true,
        showEditModal: false,
        savingDepositToEdit: null,
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
        showDeleteModal: false,
        savingDepositToDelete: null,
        showGenerateReportModal: false,
        showEditModal: false,
        savingDepositToEdit: null,
        newSavingDeposit: null
      };
    default:
      return currentState;
  }
};
export default savingDepositReducer;