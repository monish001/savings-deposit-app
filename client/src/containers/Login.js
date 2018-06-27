import { connect } from 'react-redux';
// import * as appActions from '../actions/appActions';
import Login from '../components/Login';

// map state from store to props
const mapStateToProps = (state) => {
  return {
    //you can now say this.props.mappedAppSate
    // mappedAppState: state.appState
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
