const INITIAL_STATE = {
  // @todo mock data
  // profile: null,

  // profile: {email: 'reg_user@abc.com', role: 'REGULAR_USER'},

  // profile: {
  //   email: "user_man@abc.com",
  //   role: "USER_MANAGER"
  //   //   photo: "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"
  // },

  profile: {email: 'admin@abc.com', role: 'ADMIN'},

  isLoggingIn: false,
  loginError: null,
  loginSuccessMsg: null,

  isSigningUp: false,
  signUpError: null,
  signUpSuccessMsg: null,

  imageToUpdate: null,
  isUpdatingPicture: false,
  pictureSuccess: null,
  pictureError: null,

  isUpdatingPassword: false,
  passwordChangeSuccess: null,
  passwordChangeError: null,
};
const profileReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...currentState,
        profile: {},
        isLoggingIn: true,
        loginError: null,
        loginSuccessMsg: null
      };
    case "LOGIN_SUCCESS":
      return {
        ...currentState,
        profile: action.profile,
        loginSuccessMsg: action.message || 'Success!',
        isLoggingIn: false,
        loginError: null
      };
    case "LOGIN_FAILED":
      return {
        ...currentState,
        profile: {},
        loginSuccessMsg: null,
        loginError: action.error,
        isLoggingIn: false
      };

    case "REGISTER_REQUEST":
      return {
        ...currentState,
        signUpError: null,
        signUpSuccessMsg: null,
        isSigningUp: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...currentState,
        signUpSuccessMsg: action.message || 'Success!',
        signUpError: null,
        isSigningUp: false
      };
    case "REGISTER_FAILED":
      return {
        ...currentState,
        signUpSuccessMsg: null,
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
        isUpdatingPicture: true,
        pictureSuccess: null,
        pictureError: null,
      };
    case "UPDATE_PICTURE_SUCCESS":
      return {
        ...currentState,
        isUpdatingPicture: false,
        pictureSuccess: action.message,
        pictureError: null,
        imageToUpdate: null,
        profile: { ...currentState.profile, photo: currentState.imageToUpdate }
      };
    case "UPDATE_PICTURE_FAILED":
      return {
        ...currentState,
        isUpdatingPicture: false,
        pictureSuccess: null,
        pictureError: action.error,
      };

    case "UPDATE_PASSWORD_REQUEST":
      return {
        ...currentState,
        passwordChangeSuccess: null,
        passwordChangeError: null,
        isUpdatingPassword: true
      };
    case "UPDATE_PASSWORD_SUCCESS":
      return {
        ...currentState,
        passwordChangeSuccess: action.message,
        passwordChangeError: null,
        isUpdatingPassword: false
      };
    case "UPDATE_PASSWORD_FAILED":
      return {
        ...currentState,
        passwordChangeSuccess: null,
        passwordChangeError: action.error,
        isUpdatingPassword: false
      };
    default:
      return currentState;
  }
};
export default profileReducer;
