import { connect } from "react-redux";
import * as profileActions from "../actions/profileActions";
import Login from "../components/Login";

// map state from store to props
const mapStateToProps = state => {
  return {
    //you can now say this.props.mappedAppSate
    mappedProfileState: state.profileState
  };
};
// map actions to props
const mapDispatchToProps = dispatch => {
  return {
    //you can now say this.props.mappedAppActions
    mappedSocialLogin: args => dispatch(profileActions.socialLogin(args)),
    mappedRegister: args => dispatch(profileActions.register(args)),
    mappedLogin: args => dispatch(profileActions.login(args))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
