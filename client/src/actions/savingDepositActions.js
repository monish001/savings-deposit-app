function getApiUrl(isAdmin) {
  return (isAdmin ? "/api/admin/saving-deposits/" : "/api/users/self/saving-deposits/");
}
export const addNewSavingDeposit = (savingDeposit, isAdmin = false) => {
  return dispatch => {
    dispatch(addNewSavingDepositRequest(savingDeposit));
    const apiUrl = getApiUrl(isAdmin);
    return fetch(apiUrl, {
      method: "post",
      body: JSON.stringify(savingDeposit)
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(
            addNewSavingDepositRequestSuccess(data.savingDeposit, data.message)
          );
        });
      } else {
        response.json().then(error => {
          dispatch(addNewSavingDepositRequestFailed(error));
        });
      }
    });
  };
};
export const addNewSavingDepositRequest = savingDeposit => {
  return {
    type: "ADD_NEW_SAVING_DEPOSIT_REQUEST",
    savingDeposit
  };
};
export const addNewSavingDepositRequestSuccess = (savingDeposit, message) => {
  return {
    type: "ADD_NEW_SAVING_DEPOSIT_REQUEST_SUCCESS",
    savingDeposit: savingDeposit,
    message: message
  };
};
export const addNewSavingDepositRequestFailed = error => {
  return {
    type: "ADD_NEW_SAVING_DEPOSIT_REQUEST_FAILED",
    error
  };
};

//Async action
export const fetchSavingDeposits = (filters={}, isAdmin) => {
  // Returns a dispatcher function
  // that dispatches an action at later time
  const apiUrl = getApiUrl(isAdmin);
  const queryParams = filters && Object.keys(filters)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(filters[k]))
    .join("&");
  const _apiUrl =
    apiUrl + (apiUrl.indexOf("?") === -1 ? "?" : "&") + queryParams;
  return dispatch => {
    dispatch(fetchSavingDepositsRequest(filters));
    // Returns a promise
    return fetch(_apiUrl).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(
            fetchSavingDepositsSuccess(data.savingDeposits, data.message)
          );
        });
      } else {
        response.json().then(error => {
          dispatch(fetchSavingDepositsFailed(error));
        });
      }
    });
  };
};
export const fetchSavingDepositsRequest = (filters) => {
  return {
    type: "FETCH_SAVING_DEPOSITS_REQUEST",
    savingDepositsFilter: filters
  };
};
//Sync action
export const fetchSavingDepositsSuccess = (savingDeposits, message) => {
  return {
    type: "FETCH_SAVING_DEPOSITS_SUCCESS",
    savingDeposits: savingDeposits,
    message: message,
    receivedAt: Date.now
  };
};
export const fetchSavingDepositsFailed = error => {
  return {
    type: "FETCH_SAVING_DEPOSITS_FAILED",
    error
  };
};

export const fetchSavingDepositById = (savingDepositId, isAdmin=false) => {
  return dispatch => {
    dispatch(fetchSavingDepositRequest());
    // Returns a promise
    const apiUrl = getApiUrl(isAdmin);
    return fetch(apiUrl + savingDepositId).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(
            fetchSavingDepositSuccess(data.savingDeposit[0], data.message)
          );
        });
      } else {
        response.json().then(error => {
          dispatch(fetchSavingDepositFailed(error));
        });
      }
    });
  };
};
export const fetchSavingDepositRequest = () => {
  return {
    type: "FETCH_SAVING_DEPOSIT_REQUEST"
  };
};
//Sync action
export const fetchSavingDepositSuccess = (savingDeposit, message) => {
  return {
    type: "FETCH_SAVING_DEPOSIT_SUCCESS",
    savingDeposit: savingDeposit,
    message: message,
    receivedAt: Date.now
  };
};
export const fetchSavingDepositFailed = error => {
  return {
    type: "FETCH_SAVING_DEPOSIT_FAILED",
    error
  };
};

export const showEditModal = savingDepositToEdit => {
  return {
    type: "SHOW_EDIT_SD_MODAL",
    savingDeposit: savingDepositToEdit
  };
};
export const hideEditModal = () => {
  return {
    type: "HIDE_EDIT_SD_MODAL"
  };
};
export const editSavingDeposit = (savingDeposit, isAdmin=false) => {
  return dispatch => {
    dispatch(editSavingDepositRequest(savingDeposit));
    const apiUrl = getApiUrl(isAdmin);
    return fetch(apiUrl, {
      method: "put",
      body: savingDeposit
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(editSavingDepositSuccess(data.savingDeposit, data.message));
        });
      } else {
        response.json().then(error => {
          dispatch(editSavingDepositFailed(error));
        });
      }
    });
  };
};
export const editSavingDepositRequest = savingDeposit => {
  return {
    type: "EDIT_SAVING_DEPOSIT_REQUEST",
    savingDeposit
  };
};
export const editSavingDepositSuccess = (savingDeposit, message) => {
  return {
    type: "EDIT_SAVING_DEPOSIT_SUCCESS",
    savingDeposit: savingDeposit,
    message: message
  };
};
export const editSavingDepositFailed = error => {
  return {
    type: "EDIT_SAVING_DEPOSIT_FAILED",
    error
  };
};

export const deleteSavingDeposit = (savingDeposit, isAdmin=false) => {
  return dispatch => {
    dispatch(deleteSavingDepositRequest(savingDeposit));
    const apiUrl = getApiUrl(isAdmin);
    return fetch(apiUrl + savingDeposit._id, {
      method: "delete"
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(deleteSavingDepositSuccess(data.message));
        });
      } else {
        response.json().then(error => {
          dispatch(deleteSavingDepositFailed(error));
        });
      }
    });
  };
};
export const deleteSavingDepositRequest = savingDeposit => {
  return {
    type: "DELETE_SAVING_DEPOSIT_REQUEST",
    savingDeposit
  };
};
export const deleteSavingDepositSuccess = message => {
  return {
    type: "DELETE_SAVING_DEPOSIT_SUCCESS",
    message: message
  };
};
export const deleteSavingDepositFailed = error => {
  return {
    type: "DELETE_SAVING_DEPOSIT_FAILED",
    error
  };
};
export const showDeleteModal = savingDepositToDelete => {
  return {
    type: "SHOW_DELETE_SD_MODAL",
    savingDeposit: savingDepositToDelete
  };
};
export const hideDeleteModal = () => {
  return {
    type: "HIDE_DELETE_SD_MODAL"
  };
};
export const showGenerateReportModal = () => {
  return {
    type: "SHOW_GENERATE_REPORT_SD_MODAL",
  };
};
export const hideGenerateReportModal = () => {
  return {
    type: "HIDE_GENERATE_REPORT_SD_MODAL"
  };
};
