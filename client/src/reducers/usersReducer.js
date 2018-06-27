const INITIAL_STATE = {
// @todo mock data
// users: [],
  users: [{
    _id: '<guid - 1>',
    email: 'test@qw.com', 
    role: 'USER_MANAGER',
    photo: null,
    googleId: 12345678,
    facebookId: null,
    isEmailLoggedIn: false,
    isEmailVerified: false,
    retryCount: 0
  }, {
    _id: '<guid - 2>',
    email: 'test1@qw.com', 
    role: 'ADMIN',
    photo: "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
    googleId: null,
    facebookId: null,
    isEmailLoggedIn: true,
    isEmailVerified: true,
    retryCount: 3
  }],
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
    case "FETCH_USER_REQUEST":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null
      };
    case "FETCH_USER_SUCCESS":
      return {
        ...currentState,
        users: currentState.users,
        user: action.user,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null
      };
    case "FETCH_USER_FAILED":
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
    case "ADD_NEW_USER_REQUEST":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null,
        newUser: action.user
      };
    case "ADD_NEW_USER_REQUEST_FAILED":
      return {
        ...currentState,
        users: currentState.users,
        user: null,
        isFetching: true,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null,
        newUser: null
      };
    case "ADD_NEW_USER_REQUEST_SUCCESS":
      const nextState = {
        ...currentState,
        users: [...currentState.users, action.user],
        user: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: false,
        userToDelete: null,
        showEditModal: false,
        userToEdit: null,
        newUser: action.user
      };
      return nextState;
    case "SHOW_EDIT_USER__MODAL":
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
    case "HIDE_EDIT_USER__MODAL":
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
        return { ...user, ...action.user };
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
    case "SHOW_DELETE_USER__MODAL":
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
    case "HIDE_DELETE_USER__MODAL":
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
    default:
      return currentState;
  }
};
export default userReducer;
