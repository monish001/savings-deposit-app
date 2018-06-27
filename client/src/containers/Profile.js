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
    mappedFetchProfile: args => dispatch(profileActions.fetchProfile(args)),
    mappedUploadPicture: args => dispatch(profileActions.uploadPicture(args)),
    mappedUpdatePassword: args => dispatch(profileActions.updatePassword(args)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);
