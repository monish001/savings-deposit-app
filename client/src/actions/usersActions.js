import getErrorMessage from './common';
const apiUrl = "/api/users/";
/** create user */
export const addNewUser = user => {
  return dispatch => {
    dispatch(addNewUserRequest(user));
    const _apiUrl = apiUrl + user.role.toLowerCase();
    return fetch(_apiUrl, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(user)
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(addNewUserRequestSuccess(data.user, data.message));
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        getErrorMessage(error, errorMessage => dispatch(addNewUserRequestFailed(errorMessage)));
      });
  };
};
export const addNewUserRequest = user => {
  return {
    type: "ADD_NEW_USER_REQUEST",
    user
  };
};
export const addNewUserRequestSuccess = (user, message) => {
  return {
    type: "ADD_NEW_USER_REQUEST_SUCCESS",
    user: user,
    message: message
  };
};
export const addNewUserRequestFailed = error => {
  return {
    type: "ADD_NEW_USER_REQUEST_FAILED",
    error
  };
};

// get list of users
export const fetchUsers = () => {
  // Returns a dispatcher function
  // that dispatches an action at later time
  return dispatch => {
    dispatch(fetchUsersRequest());
    // Returns a promise
    return fetch(apiUrl, {
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(fetchUsersSuccess(data.users, data.message));
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        getErrorMessage(error, errorMessage => dispatch(fetchUsersFailed(errorMessage)));
      });
  };
};
export const fetchUsersRequest = () => {
  return {
    type: "FETCH_USERS_REQUEST"
  };
};
//Sync action
export const fetchUsersSuccess = (users, message) => {
  return {
    type: "FETCH_USERS_SUCCESS",
    users: users,
    message: message,
    receivedAt: Date.now
  };
};
export const fetchUsersFailed = error => {
  return {
    type: "FETCH_USERS_FAILED",
    error
  };
};

// edit user
export const showEditModal = userToEdit => {
  return {
    type: "SHOW_EDIT_USER_MODAL",
    user: userToEdit
  };
};
export const hideEditModal = () => {
  return {
    type: "HIDE_EDIT_USER_MODAL"
  };
};
export const editUser = (newUser, oldUser) => {
  return dispatch => {
    dispatch(editUserRequest(newUser));
    const _apiUrl =
      apiUrl +
      oldUser._id +
      "/" +
      oldUser.role.toLowerCase() +
      "/" +
      newUser.role.toLowerCase();
    return fetch(_apiUrl, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(newUser)
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(editUserSuccess(data.user, data.message));
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        getErrorMessage(error, errorMessage => dispatch(editUserFailed(errorMessage)));
      });
  };
};
export const editUserRequest = user => {
  return {
    type: "EDIT_USER_REQUEST",
    user
  };
};
export const editUserSuccess = (user, message) => {
  return {
    type: "EDIT_USER_SUCCESS",
    user: user,
    message: message
  };
};
export const editUserFailed = error => {
  return {
    type: "EDIT_USER_FAILED",
    error
  };
};

// delete user
export const deleteUser = user => {
  return dispatch => {
    dispatch(deleteUserRequest(user));
    return fetch(apiUrl + user.role.toLowerCase() + "/" + user._id, {
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      method: "delete"
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(deleteUserSuccess(data.message));
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        getErrorMessage(error, errorMessage => dispatch(deleteUserFailed(errorMessage)));
      });
  };
};
export const deleteUserRequest = user => {
  return {
    type: "DELETE_USER_REQUEST",
    user
  };
};
export const deleteUserSuccess = message => {
  return {
    type: "DELETE_USER_SUCCESS",
    message: message
  };
};
export const deleteUserFailed = error => {
  return {
    type: "DELETE_USER_FAILED",
    error
  };
};
export const showDeleteModal = userToDelete => {
  return {
    type: "SHOW_DELETE_USER_MODAL",
    user: userToDelete
  };
};
export const hideDeleteModal = () => {
  return {
    type: "HIDE_DELETE_USER_MODAL"
  };
};

// update profile picture
export const uploadUserPictureInBrowser = base64Image => {
  return {
    type: "UPLOAD_USER_PICTURE_IN_BROWSER",
    imageToUpdate: base64Image
  };
};
export const submitPicture = args => {
  return dispatch => {
    console.log("submitPicture", args);
    dispatch(submitPictureRequest());
    return fetch(apiUrl + args._id, {
      method: "put",
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
            dispatch(submitPictureRequestSuccess(data.message));
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        getErrorMessage(error, errorMessage => dispatch(submitPictureRequestFailed(errorMessage)));
      });
  };
};
export const submitPictureRequest = () => {
  return {
    type: "UPDATE_USER_PICTURE_REQUEST"
  };
};
export const submitPictureRequestSuccess = message => {
  return {
    type: "UPDATE_USER_PICTURE_SUCCESS",
    message: message
  };
};
export const submitPictureRequestFailed = error => {
  return {
    type: "UPDATE_USER_PICTURE_FAILED",
    error
  };
};

// reset password
export const resetPassword = user => {
  return dispatch => {
    dispatch(resetPasswordRequest(user));
    return fetch(apiUrl + user._id + "/password/reset", {
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      method: "put"
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(resetPasswordSuccess(data.message));
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        getErrorMessage(error, errorMessage => dispatch(resetPasswordFailed(errorMessage)));
      });
  };
};
export const resetPasswordRequest = user => {
  return {
    type: "RESET_PASSWORD_USER_REQUEST",
    user
  };
};
export const resetPasswordSuccess = message => {
  return {
    type: "RESET_PASSWORD_USER_SUCCESS",
    message: message
  };
};
export const resetPasswordFailed = error => {
  return {
    type: "RESET_PASSWORD_USER_FAILED",
    error
  };
};
export const showResetPasswordModal = userToResetPassword => {
  console.log("showResetPasswordModal", userToResetPassword);
  return {
    type: "SHOW_RESET_PASSWORD_USER_MODAL",
    userToResetPassword: userToResetPassword
  };
};
export const hideResetPasswordModal = () => {
  return {
    type: "HIDE_RESET_PASSWORD_USER_MODAL"
  };
};

// unblock user
export const unblockUser = user => {
  return dispatch => {
    dispatch(unblockUserRequest(user));
    return fetch(apiUrl + user._id + "/login-retry-count/reset", {
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      method: "put"
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(unblockUserSuccess(data.message));
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        getErrorMessage(error, errorMessage => dispatch(unblockUserFailed(errorMessage)));
      });
  };
};
export const unblockUserRequest = user => {
  return {
    type: "UNBLOCK_USER_REQUEST",
    user
  };
};
export const unblockUserSuccess = message => {
  return {
    type: "UNBLOCK_USER_SUCCESS",
    message: message
  };
};
export const unblockUserFailed = error => {
  return {
    type: "UNBLOCK_USER_FAILED",
    error
  };
};
export const showUnblockUserModal = userToUnblock => {
  return {
    type: "SHOW_UNBLOCK_USER_MODAL",
    userToUnblock: userToUnblock
  };
};
export const hideUnblockUserModal = () => {
  return {
    type: "HIDE_UNBLOCK_USER_MODAL"
  };
};

// invite user
export const inviteUser = email => {
  return dispatch => {
    dispatch(inviteUserRequest());
    return fetch(apiUrl + "invite", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({ email })
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(inviteUserSuccess(data.message));
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        getErrorMessage(error, errorMessage => dispatch(inviteUserFailed(errorMessage)));
      });
  };
};
export const inviteUserRequest = () => {
  return {
    type: "INVITE_USER_REQUEST"
  };
};
export const inviteUserSuccess = message => {
  return {
    type: "INVITE_USER_SUCCESS",
    message: message
  };
};
export const inviteUserFailed = error => {
  return {
    type: "INVITE_USER_FAILED",
    error
  };
};
export const showInviteUserModal = () => {
  return {
    type: "SHOW_INVITE_USER_MODAL"
  };
};
export const hideInviteUserModal = () => {
  return {
    type: "HIDE_INVITE_USER_MODAL"
  };
};
