
import { connect } from "react-redux";
import * as userActions from "../actions/usersActions";
import UserCreate from "../components/UserCreate";

// map state from store to props
const mapStateToProps = state => {
  return {
    //you can now say this.props.mappedAppSate
    mappedUsersState: state.usersState,
    mappedProfileState: state.profileState
  };
};
// map actions to props
const mapDispatchToProps = dispatch => {
  return {
        //you can now say this.props.mappedAppActions
        mappedCreateUser: newUser => dispatch(userActions.addNewUser(newUser)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
