const INITIAL_STATE = {
  // @todo mock data
  // users: [],
  users: [
    {
      _id: "<guid - 1>",
      email: "test@qw.com",
      role: "USER_MANAGER",
      photo: null,
      googleId: 12345678,
      facebookId: null,
      isEmailLoggedIn: false,
      isEmailVerified: false,
      retryCount: 0
    },
    {
      _id: "<guid - 2>",
      email: "test1@qw.com",
      role: "ADMIN",
      photo: "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
      googleId: null,
      facebookId: null,
      isEmailLoggedIn: true,
      isEmailVerified: true,
      retryCount: 3
    }
  ],

  // user: null,
  isFetching: false,
  error: null,
  successMsg: null,
  showDeleteModal: false,
  userToDelete: null,
  showEditModal: false,
  userToEdit: null,
  newUser: null,
  imageToUpdate: null,
  isUpdatingPicture: false,
  showResetPasswordModal: false,
  userToResetPassword: null
};
const userReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...currentState,
        users: [],
        user: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...currentState,
        users: action.users,
        user: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null
      };
    case "FETCH_USERS_FAILED":
      return {
        ...currentState,
        users: [],
        user: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null
      };
    // case "FETCH_USER_REQUEST":
    //   return {
    //     ...currentState,
    //     users: currentState.users,
    //     user: null,
    //     isFetching: true,
    //     error: null,
    //     successMsg: null,
    //     showDeleteModal: false,
    //     userToDelete: null,
    //     showEditModal: false,
    //     userToEdit: null
    //   };
    // case "FETCH_USER_SUCCESS":
    //   return {
    //     ...currentState,
    //     users: currentState.users,
    //     user: action.user,
    //     isFetching: false,
    //     error: null,
    //     successMsg: action.message,
    //     showDeleteModal: false,
    //     userToDelete: null,
    //     showEditModal: false,
    //     userToEdit: null
    //   };
    // case "FETCH_USER_FAILED":
    //   return {
    //     ...currentState,
    //     users: [],
    //     user: null,
    //     isFetching: false,
    //     error: action.error,
    //     successMsg: null,
    //     showDeleteModal: false,
    //     userToDelete: null,
    //     showEditModal: false,
    //     userToEdit: null
    //   };


    case "ADD_NEW_USER_REQUEST":
      return {
        ...currentState,
        users: currentState.users,
        isFetching: true,
        error: null,
        successMsg: null,
        newUser: action.user
      };
    case "ADD_NEW_USER_REQUEST_FAILED":
      return {
        ...currentState,
        users: currentState.users,
        isFetching: false,
        error: action.error,
        successMsg: null,
        newUser: currentState.newUser
      };
    case "ADD_NEW_USER_REQUEST_SUCCESS":
      const nextState = {
        ...currentState,
        users: [...currentState.users, action.user],
        isFetching: false,
        error: null,
        successMsg: action.message,
        newUser: null
      };
      return nextState;
    case "SHOW_EDIT_USER_MODAL":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: true,
        userToEdit: action.user,
        newUser: null
      };
    case "HIDE_EDIT_USER_MODAL":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null,
        newUser: null
      };
    case "EDIT_USER_REQUEST":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: true,
        userToEdit: action.user,
        newUser: null
      };
    case "EDIT_USER_SUCCESS":
      const updatedUsers = currentState.users.map(user => {
        if (user._id !== action.user._id) {
          //This is not the item we care about, keep it as is
          return user;
        }
        //Otherwise, this is the one we want to return an updated value
        return {
          ...user,
          ...action.user
        };
      });
      return {
        ...currentState,
        users: updatedUsers,
        user: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: true,
        userToEdit: action.user,
        newUser: null
      };
    case "EDIT_USER_FAILED":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: true,
        userToEdit: currentState.userToEdit,
        newUser: null
      };
    case "DELETE_USER_REQUEST":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: true,
        userToDelete: action.user,
        showEditModal: false,
        userToEdit: null,
        newUser: null
      };
    case "DELETE_USER_SUCCESS":
      const filteredUsers = currentState.users.filter(
        user => user._id !== currentState.userToDelete._id
      );
      return {
        ...currentState,
        users: filteredUsers,
        user: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: true,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null,
        newUser: null
      };
    case "DELETE_USER_FAILED":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: true,
        showEditModal: false,
        userToEdit: null,
        newUser: null
      };
    case "SHOW_DELETE_USER_MODAL":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: true,
        userToDelete: action.user,
        showEditModal: false,
        userToEdit: null,
        newUser: null
      };
    case "HIDE_DELETE_USER_MODAL":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null,
        newUser: null
      };

    case "UPLOAD_USER_PICTURE_IN_BROWSER":
      return {
        ...currentState,
        imageToUpdate: action.imageToUpdate
      };
    case "UPDATE_USER_PICTURE_REQUEST":
      return {
        ...currentState,
        isUpdatingPicture: true
      };
    case "UPDATE_USER_PICTURE_SUCCESS":
      const updatedUsers1 = currentState.users.map(user => {
        if (user._id !== action.user._id) {
          //This is not the item we care about, keep it as is
          return user;
        }
        //Otherwise, this is the one we want to return an updated value
        return {
          ...user,
          ...action.user
        };
      });
      return {
        ...currentState,
        successMsg: action.message,
        error: null,
        isUpdatingPicture: false,
        imageToUpdate: null,
        users: updatedUsers1
      };
    case "UPDATE_USER_PICTURE_FAILED":
      return {
        ...currentState,
        successMsg: null,
        error: action.error,
        isUpdatingPicture: false
      };

    case "RESET_PASSWORD_USER_REQUEST":
      return {
        ...currentState,
        isFetching: true,
        error: null,
        successMsg: null
      };
    case "RESET_PASSWORD_USER_SUCCESS":
      return {
        ...currentState,
        isFetching: false,
        error: null,
        successMsg: action.message
      };
    case "RESET_PASSWORD_USER_FAILED":
      return {
        ...currentState,
        isFetching: false,
        error: action.error,
        successMsg: null
      };
    case "SHOW_RESET_PASSWORD_USER_MODAL":
      return {
        ...currentState,
        isFetching: false,
        error: null,
        successMsg: null,
        showResetPasswordModal: true,
        userToResetPassword: action.userToResetPassword
      };
    case "HIDE_RESET_PASSWORD_USER_MODAL":
      return {
        ...currentState,
        isFetching: false,
        error: null,
        successMsg: null,
        showResetPasswordModal: false,
        userToResetPassword: null
      };

    case "UNBLOCK_USER_REQUEST":
      return {
        ...currentState,
        isFetching: true,
        error: null,
        successMsg: null
      };
    case "UNBLOCK_USER_SUCCESS":
      return {
        ...currentState,
        isFetching: false,
        error: null,
        successMsg: action.message
      };
    case "UNBLOCK_USER_FAILED":
      return {
        ...currentState,
        isFetching: false,
        error: action.error,
        successMsg: null
      };
    case "SHOW_UNBLOCK_USER_MODAL":
      return {
        ...currentState,
        isFetching: false,
        error: null,
        successMsg: null,
        showUnblockUserModal: true,
        userToUnblock: action.userToUnblock
      };
    case "HIDE_UNBLOCK_USER_MODAL":
      return {
        ...currentState,
        isFetching: false,
        error: null,
        successMsg: null,
        showUnblockUserModal: false,
        userToUnblock: null
      };

    case "INVITE_USER_REQUEST":
      return {
        ...currentState,
        isFetching: true,
        error: null,
        successMsg: null
      };
    case "INVITE_USER_SUCCESS":
      return {
        ...currentState,
        isFetching: false,
        error: null,
        successMsg: action.message
      };
    case "INVITE_USER_FAILED":
      return {
        ...currentState,
        isFetching: false,
        error: action.error,
        successMsg: null
      };
    case "SHOW_INVITE_USER_MODAL":
      return {
        ...currentState,
        isFetching: false,
        error: null,
        successMsg: null,
        showInviteUserModal: true
      };
    case "HIDE_INVITE_USER_MODAL":
      return {
        ...currentState,
        isFetching: false,
        error: null,
        successMsg: null,
        showInviteUserModal: false
      };
    default:
      return currentState;
  }
};
export default userReducer;
