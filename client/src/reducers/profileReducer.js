const INITIAL_STATE = {
  // @todo mock data
  //   profile: null,
  //   profile: {email: 'reg_user@abc.com', role: 'REGULAR_USER'},
  profile: {
    email: "user_man@abc.com",
    role: "USER_MANAGER"
    //   photo: "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"
  },
  //   profile: {email: 'admin@abc.com', role: 'ADMIN'},
  successMsg: null,
  error: null,
  isLoggingIn: false,
  loginError: null,
  isSigningUp: false,
  signUpError: null,
  isUpdatingPicture: false,
  isUpdatingPassword: false,
  imageToUpdate: null
};
const profileReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...currentState,
        isLoggingIn: true,
        loginError: null
      };
    case "LOGIN_SUCCESS":
      return {
        ...currentState,
        profile: action.profile,
        successMsg: action.message,
        error: null,
        isLoggingIn: false,
        loginError: null
      };
    case "LOGIN_FAILED":
      return {
        ...currentState,
        profile: {},
        successMsg: null,
        loginError: action.error,
        isLoggingIn: false
      };

    case "REGISTER_REQUEST":
      return {
        ...currentState,
        isSigningUp: true,
        signUpError: null
      };
    case "REGISTER_SUCCESS":
      return {
        ...currentState,
        successMsg: action.message,
        signUpError: null,
        isSigningUp: false
      };
    case "REGISTER_FAILED":
      return {
        ...currentState,
        successMsg: null,
        signUpError: action.error,
        isSigningUp: false
      };

    case "UPLOAD_PICTURE_IN_BROWSER":
      return {
        ...currentState,
        imageToUpdate: action.imageToUpdate
      };
    case "UPDATE_PICTURE_REQUEST":
      return {
        ...currentState,
        isUpdatingPicture: true
      };
    case "UPDATE_PICTURE_SUCCESS":
      return {
        ...currentState,
        successMsg: action.message,
        error: null,
        isUpdatingPicture: false,
        imageToUpdate: null,
        profile: { ...currentState.profile, photo: currentState.imageToUpdate }
      };
    case "UPDATE_PICTURE_FAILED":
      return {
        ...currentState,
        successMsg: null,
        error: action.error,
        isUpdatingPicture: false
      };

    case "UPDATE_PASSWORD_REQUEST":
      return {
        ...currentState,
        isUpdatingPassword: true
      };
    case "UPDATE_PASSWORD_SUCCESS":
      return {
        ...currentState,
        successMsg: action.message,
        error: null,
        isUpdatingPassword: false
      };
    case "UPDATE_PASSWORD_FAILED":
      return {
        ...currentState,
        successMsg: null,
        error: action.error,
        isUpdatingPassword: false
      };
    default:
      return currentState;
  }
};
export default profileReducer;
