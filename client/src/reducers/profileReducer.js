const INITIAL_STATE = {
  profile: {},
  successMsg: null,
  error: null,
  isLoggingIn: false,
  loginError: null,
  isSigningUp: false,
  signUpError: null,
  isUpdatingPicture: false,
  isUpdatingPassword: false,
  newPicture: null,
};
const profileReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...currentState,
        isLoggingIn: true,
        loginError: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...currentState,
        profile: action.profile,
        successMsg: action.message,
        error: null,
        isLoggingIn: false,
        loginError: null,
      };
    case "LOGIN_FAILED":
      return {
        ...currentState,
        profile: {},
        successMsg: null,
        loginError: action.error,
        isLoggingIn: false,
      };


    case "REGISTER_REQUEST":
      return {
        ...currentState,
        isSigningUp: true,
        signUpError: null,
      };
    case "REGISTER_SUCCESS":
      return {
        ...currentState,
        successMsg: action.message,
        signUpError: null,
        isSigningUp: false,
      };
    case "REGISTER_FAILED":
      return {
        ...currentState,
        successMsg: null,
        signUpError: action.error,
        isSigningUp: false,
      };


    case "UPDATE_PICTURE_REQUEST":
      return {
        ...currentState,
        isUpdatingPicture: true,
        newPicture: action.args,
      };
    case "UPDATE_PICTURE_SUCCESS":
      return {
        ...currentState,
        successMsg: action.message,
        error: null,
        isUpdatingPicture: false,
        newPicture: null,
        profile: {...currentState.profile, picture: currentState.newPicture}
      };
    case "UPDATE_PICTURE_FAILED":
      return {
        ...currentState,
        successMsg: null,
        error: action.error,
        isUpdatingPicture: false,
      };


    case "UPDATE_PASSWORD_REQUEST":
      return {
        ...currentState,
        isUpdatingPassword: true,
      };
    case "UPDATE_PASSWORD_SUCCESS":
      return {
        ...currentState,
        successMsg: action.message,
        error: null,
        isUpdatingPassword: false,
      };
    case "UPDATE_PASSWORD_FAILED":
      return {
        ...currentState,
        successMsg: null,
        error: action.error,
        isUpdatingPassword: false,
      };
    default:
      return currentState;
  }
};
export default profileReducer;
