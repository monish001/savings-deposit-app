const apiUrl = "/api/users/";
/** create user */
export const addNewUser = user => {
  console.log(user);
  return dispatch => {
    dispatch(addNewUserRequest(user));
    return fetch(apiUrl, {
      method: "post",
      body: user
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data.user);
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

//Async action
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

export const fetchUserById = userId => {
  return dispatch => {
    dispatch(fetchUserRequest());
    // Returns a promise
    return fetch(apiUrl + userId).then(response => {
      console.log(response);
      if (response.ok) {
        response.json().then(data => {
          dispatch(fetchUserSuccess(data.user[0], data.message));
        });
      } else {
        response.json().then(error => {
          dispatch(fetchUserFailed(error));
        });
      }
    });
  };
};
export const fetchUserRequest = () => {
  return {
    type: "FETCH_USER_REQUEST"
  };
};
//Sync action
export const fetchUserSuccess = (user, message) => {
  return {
    type: "FETCH_USER_SUCCESS",
    user: user,
    message: message,
    receivedAt: Date.now
  };
};
export const fetchUserFailed = error => {
  return {
    type: "FETCH_USER_FAILED",
    error
  };
};

export const showEditModal = userToEdit => {
  return {
    type: "SHOW_EDIT_USER__MODAL",
    user: userToEdit
  };
};
export const hideEditModal = () => {
  return {
    type: "HIDE_EDIT_USER__MODAL"
  };
};
export const editUser = user => {
  return dispatch => {
    dispatch(editUserRequest(user));
    return fetch(apiUrl, {
      method: "put",
      body: user
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
    type: "SHOW_DELETE_USER__MODAL",
    user: userToDelete
  };
};
export const hideDeleteModal = () => {
  return {
    type: "HIDE_DELETE_USER__MODAL"
  };
};
