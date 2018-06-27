import { connect } from 'react-redux';
import * as profileActions from '../actions/profileActions';
import Profile from '../components/Profile';

// map state from store to props
const mapStateToProps = (state) => {
  return {
    //you can now say this.props.mappedAppSate
    mappedProfileState: state.profileState
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    mappedUpdatePicture: args => dispatch(profileActions.updatePicture(args)),
    mappedUpdatePassword: args => dispatch(profileActions.updatePassword(args)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);
