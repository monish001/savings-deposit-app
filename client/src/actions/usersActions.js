const apiUrl = "/api/users/";
/** create user */
export const addNewUser = user => {
  return dispatch => {
    dispatch(addNewUserRequest(user));
    return fetch(apiUrl, {
      method: "post",
      body: JSON.stringify(user),
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(addNewUserRequestSuccess(data.user, data.message));
        });
      } else {
        response.json().then(error => {
          dispatch(addNewUserRequestFailed(error));
        });
      }
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
    return fetch(apiUrl).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(fetchUsersSuccess(data.users, data.message));
        });
      } else {
        response.json().then(error => {
          dispatch(fetchUsersFailed(error));
        });
      }
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

// /* get a single user */
// export const fetchUserById = userId => {
//   return dispatch => {
//     dispatch(fetchUserRequest());
//     // Returns a promise
//     return fetch(apiUrl + userId).then(response => {
//       if (response.ok) {
//         response.json().then(data => {
//           dispatch(fetchUserSuccess(data.user[0], data.message));
//         });
//       } else {
//         response.json().then(error => {
//           dispatch(fetchUserFailed(error));
//         });
//       }
//     });
//   };
// };
// export const fetchUserRequest = () => {
//   return {
//     type: "FETCH_USER_REQUEST"
//   };
// };
// //Sync action
// export const fetchUserSuccess = (user, message) => {
//   return {
//     type: "FETCH_USER_SUCCESS",
//     user: user,
//     message: message,
//     receivedAt: Date.now
//   };
// };
// export const fetchUserFailed = error => {
//   return {
//     type: "FETCH_USER_FAILED",
//     error
//   };
// };

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
    const _apiUrl = apiUrl + oldUser._id + '/update-role-to-' + newUser.role.toLowerCase();
    return fetch(_apiUrl, {
      method: "put",
      body: newUser
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(editUserSuccess(data.user, data.message));
        });
      } else {
        response.json().then(error => {
          dispatch(editUserFailed(error));
        });
      }
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
    return fetch(apiUrl + user._id, {
      method: "delete"
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(deleteUserSuccess(data.message));
        });
      } else {
        response.json().then(error => {
          dispatch(deleteUserFailed(error));
        });
      }
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
    console.log('submitPicture', args);
    dispatch(submitPictureRequest());
    return fetch(apiUrl + args._id + "/update-picture", {
      method: "post",
      body: JSON.stringify(args),
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(submitPictureRequestSuccess(data.message));
        });
      } else {
        response.json().then(error => {
          dispatch(submitPictureRequestFailed(error));
        });
      }
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
    return fetch(apiUrl + user._id, {
      method: "post"
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(resetPasswordSuccess(data.message));
        });
      } else {
        response.json().then(error => {
          dispatch(resetPasswordFailed(error));
        });
      }
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
  console.log('showResetPasswordModal', userToResetPassword);
  return {
    type: "SHOW_RESET_PASSWORD_USER_MODAL",
    userToResetPassword: userToResetPassword,
  };
};
export const hideResetPasswordModal = () => {
  return {
    type: "HIDE_RESET_PASSWORD_USER_MODAL"
  };
};