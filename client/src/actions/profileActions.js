import getErrorMessage from './common';
const apiUrl = "/api/";
/** login actions  */
export const login = args => {
  return dispatch => {
    dispatch(loginRequest(args));
    return fetch(apiUrl + "login", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(args)
    })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(loginRequestSuccess(data.profile, data.message));
        });
      } else {
        return Promise.reject(response);
      }
    }).catch(error => {
      getErrorMessage(error, errorMessage => dispatch(loginRequestFailed(errorMessage)));
  });;
  };
};
export const loginRequest = args => {
  return {
    type: "LOGIN_REQUEST",
    args
  };
};
export const loginRequestSuccess = (profile, message) => {
  return {
    type: "LOGIN_SUCCESS",
    profile: profile,
    message: message
  };
};
export const loginRequestFailed = error => {
  return {
    type: "LOGIN_FAILED",
    error
  };
};

/** register actions  */
export const register = args => {
  return dispatch => {
    dispatch(registerRequest(args));
    return fetch(apiUrl + "register", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(args)
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(registerRequestSuccess(data.message));
        });
      } else {
        // push error further for the next `catch`, like
        return Promise.reject(response);
      }
    }).catch(error => {
      getErrorMessage(error, errorMessage => dispatch(registerRequestFailed(errorMessage)));
    });
  };
};
export const registerRequest = args => {
  return {
    type: "REGISTER_REQUEST",
    args
  };
};
export const registerRequestSuccess = message => {
  return {
    type: "REGISTER_SUCCESS",
    message: message
  };
};
export const registerRequestFailed = error => {
  return {
    type: "REGISTER_FAILED",
    error
  };
};

/** update profile pic actions  */
export const uploadPictureInBrowser = base64Image => {
  return {
    type: "UPLOAD_PICTURE_IN_BROWSER",
    imageToUpdate: base64Image
  };
};
export const submitPicture = args => {
  return dispatch => {
    dispatch(submitPictureRequest());
    return fetch(apiUrl + "users/self", {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(args)
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(submitPictureRequestSuccess(data.message));
        });
      } else {
        // push error further for the next `catch`, like
        return Promise.reject(response);
      }
    }).catch(error => {
      getErrorMessage(error, errorMessage => dispatch(submitPictureRequestFailed(errorMessage)));
    });
  };
};
export const submitPictureRequest = () => {
  return {
    type: "UPDATE_PICTURE_REQUEST"
  };
};
export const submitPictureRequestSuccess = message => {
  return {
    type: "UPDATE_PICTURE_SUCCESS",
    message: message
  };
};
export const submitPictureRequestFailed = error => {
  return {
    type: "UPDATE_PICTURE_FAILED",
    error
  };
};

/** update password actions  */
export const updatePassword = args => {
  return dispatch => {
    dispatch(updatePasswordRequest());
    return fetch(apiUrl + "users/self/password", {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },

      credentials: "same-origin",
      body: JSON.stringify(args)
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(updatePasswordRequestSuccess(data.message));
        });
      } else {
        // push error further for the next `catch`, like
        return Promise.reject(response);
      }
    }).catch(error => {
      getErrorMessage(error, errorMessage => dispatch(updatePasswordRequestFailed(errorMessage)));
    });
  };
};
export const updatePasswordRequest = () => {
  return {
    type: "UPDATE_PASSWORD_REQUEST"
  };
};
export const updatePasswordRequestSuccess = message => {
  return {
    type: "UPDATE_PASSWORD_SUCCESS",
    message: message
  };
};
export const updatePasswordRequestFailed = error => {
  return {
    type: "UPDATE_PASSWORD_FAILED",
    error
  };
};
