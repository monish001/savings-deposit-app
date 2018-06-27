const apiUrl = "/api/users/self/saving-deposits/report/";

//Async action
export const fetchSavingDepositsReport = (filters = {}) => {
  // Returns a dispatcher function
  // that dispatches an action at later time
  const queryParams =
    filters &&
    Object.keys(filters)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(filters[k]))
      .join("&");
  const _apiUrl =
    apiUrl + (apiUrl.indexOf("?") === -1 ? "?" : "&") + queryParams;
  return dispatch => {
    dispatch(fetchSavingDepositsReportRequest(filters));
    // Returns a promise
    return fetch(_apiUrl).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(
            fetchSavingDepositsReportSuccess(
              data.savingDepositsReport,
              data.message
            )
          );
        });
      } else {
        response.json().then(error => {
          dispatch(fetchSavingDepositsReportFailed(error));
        });
      }
    });
  };
};
export const fetchSavingDepositsReportRequest = filters => {
  return {
    type: "FETCH_SAVING_DEPOSITS_REPORT_REQUEST",
    savingDepositsFilter: filters
  };
};
//Sync action
export const fetchSavingDepositsReportSuccess = (savingDeposits, message) => {
  return {
    type: "FETCH_SAVING_DEPOSITS_REPORT_SUCCESS",
    savingDeposits: savingDeposits,
    message: message,
    receivedAt: Date.now
  };
};
export const fetchSavingDepositsReportFailed = error => {
  return {
    type: "FETCH_SAVING_DEPOSITS_REPORT_FAILED",
    error
  };
};
