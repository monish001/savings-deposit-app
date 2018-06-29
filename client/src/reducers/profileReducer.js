const INITIAL_STATE = {
  profile: null,

  // profile: {
  //   email: 'reg_user@abc.com', 
  //   role: 'REGULAR_USER', 
  //   photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAACWBAMAAABkyf1EAAAAG1BMVEXMzMyWlpbFxcWqqqqcnJyxsbG3t7e+vr6jo6OVuynYAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADG0lEQVR4nO2YzW/aQBDFF2PjHBkwCUfTSOEKUaRecRpFPeKqX0eo1KZHnFx6xFWV/tud2V3DsiJEPdi+vN/BC/aL9mV2PDuLUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP/jMkuueYhIWPCn4CZ5+4I2Jj3kIk1OS+tC+1wq1d35LXhcvSTWw7zye0JaF2uZe6TUWeU3lvH8uDg0fkvr95S0LrLk8SqjVIXjH8xGPP2dlkl6VJwbv9kzSx9OS2uiR1uZd6k6VZzWiQR7eUQb/CLjt8qBl6W10aWNrOtWTS7snZI/BDqRfTIyfgP5m9PS2tAZKXMWA3uH+uJkcERL1m/M6fOKtDY6uixxfNd9cyOmGV9zkx0TWflIUkb4c5dpvz06Im2I3oOdOF+YG5FOzmJovyzE9KZSm/oQJUekTXLGE8+3X5NnZRNaTcb6QZBxpZvvDRm/3XFUvl950gaZljxlecfZeSvexUTHhnBNaUD7BDV+zxJ+87iMHUobg3er3+blNyZSx0RIM7dgGb+h3lpuPWmTfq/l5f8wnXMeGxPh7pUaFI4fc7tDozdPNPSkTfrluMqq9/hShdA+LIel8/5XflOdKZ60MTiuC/VJcrEc+UGbkLsf2PrwRel9raX4yqrbGBZjPym5bdvshY433hNbyl8mtyWL5/Ze+oDccuXGkhYt1Qel41r58Ypqj9z+y/Wb9duovx/v5bovX/6mFZLbfx36bWN/W4/kOhn3Pusx0b2a0xTkibNdWL/fV0r3SJ60EUx0iqF5d+TbQdMV0EXpxM/41Q+l52ijP9M+y3OztlJrD5raLs2cdsf61RGVnqOF/rcr6RnRIJZlj+RycGiYUNqt2smd30L+x5wvLZwvYho+XpU8Z5Z8i+cytz6UVR05J0PgnCirHe0+fZIz6oG0IfTZfGyO5rrWuodeHfV8X2BDe74Qtu2cj/U5fiaF1ozmhL+q/M0kJ3YrbuuZKIaetDF+ZuY3mks7uj/arGWxo31Fs36DG3q38aQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FX+AcL6c1W3I+QxAAAAAElFTkSuQmCC",
  // },

  // profile: {
  //   email: "user_man@abc.com",
  //   role: "USER_MANAGER",
  //   photo: "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"
  // },

  // profile: {
  //   email: 'admin@abc.com', 
  //   role: 'ADMIN',
  //   photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAFeBAMAAACV4/u8AAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABLUlEQVR4nO3SMU/CUBTF8cPra2FsoTqjg3GkG2Mx0bkmJDKWhBBGiAlzAyb6sb0PjPvroMv/N7Wnyel97ZUAAAAAAAAAAAAAAAAAAAAAAACA/zFQVhStduffZHeqQ5R9zWK77uSO2ya5Xdc/QXaeT0NUbcvIqqrQ0N4/bF2rrPSTcJl2ITrqIbLrudJwaSetk046ub3kauuyqNQ8sksLDQ5jLazAhqwaS/xba5EvterRtVm1C/ncjjcOiStqiza5PYrukpLuOlc2uURPdtLko9dcUppfv9fo025eLiOmea/vVSnb23+c2ma92v8bNL4L0VH38V2j9/XM9quRnzgbztl+haja3sR3pQfb+bD3rgv75R9Pl6jH3gMAAAAAAAAAAAAAAAAAAAAAAOBvfAO2pyxQDyWdkwAAAABJRU5ErkJggg==",
  // },

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
