import getErrorMessage from './common';
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
    return fetch(_apiUrl, {
      method: "get",
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    }).then(response => {
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
        return Promise.reject(response);
      }
    })
    .catch(error => {
      getErrorMessage(error, errorMessage => dispatch(fetchSavingDepositsReportFailed(errorMessage)));
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
export const fetchSavingDepositsReportSuccess = (savingDepositsReport, message) => {
  return {
    type: "FETCH_SAVING_DEPOSITS_REPORT_SUCCESS",
    savingDepositsReport,
    message,
  };
};
export const fetchSavingDepositsReportFailed = error => {
  return {
    type: "FETCH_SAVING_DEPOSITS_REPORT_FAILED",
    error
  };
};
