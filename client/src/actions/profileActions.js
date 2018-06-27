const apiUrl = "/api/";
/** login actions  */
export const login = args => {
  return dispatch => {
    dispatch(loginRequest(args));
    return fetch(apiUrl + 'login', {
      method: "post",
      body: args
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(
            loginRequestSuccess(data.profile, data.message)
          );
        });
      } else {
        response.json().then(error => {
          dispatch(loginRequestFailed(error));
        });
      }
    });
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
      return fetch(apiUrl + 'register', {
        method: "post",
        body: args
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(
              registerRequestSuccess(data.message)
            );
          });
        } else {
          response.json().then(error => {
            dispatch(registerRequestFailed(error));
          });
        }
      });
    };
  };
  export const registerRequest = args => {
    return {
      type: "REGISTER_REQUEST",
      args
    };
  };
  export const registerRequestSuccess = (message) => {
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
export const updatePicture = args => {
    return dispatch => {
      dispatch(updatePictureRequest(args));
      return fetch(apiUrl + 'users/self/update-picture', {
        method: "post",
        body: args
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(
              updatePictureRequestSuccess(data.message)
            );
          });
        } else {
          response.json().then(error => {
            dispatch(updatePictureRequestFailed(error));
          });
        }
      });
    };
  };
  export const updatePictureRequest = args => {
    return {
      type: "UPDATE_PICTURE_REQUEST",
      args
    };
  };
  export const updatePictureRequestSuccess = (message) => {
    return {
      type: "UPDATE_PICTURE_SUCCESS",
      message: message
    };
  };
  export const updatePictureRequestFailed = error => {
    return {
      type: "UPDATE_PICTURE_FAILED",
      error
    };
  };

/** update password actions  */
export const updatePassword = args => {
    return dispatch => {
      dispatch(updatePasswordRequest(args));
      return fetch(apiUrl + 'users/self/update-password', {
        method: "post",
        body: args
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(
              updatePasswordRequestSuccess(data.message)
            );
          });
        } else {
          response.json().then(error => {
            dispatch(updatePasswordRequestFailed(error));
          });
        }
      });
    };
  };
  export const updatePasswordRequest = args => {
    return {
      type: "UPDATE_PASSWORD_REQUEST",
      args
    };
  };
  export const updatePasswordRequestSuccess = (message) => {
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
