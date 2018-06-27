import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from "react-redux";
// import * as profileActions from '../actions/profileActions';

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const { mappedProfileState } = this.props;

    if (!mappedProfileState.isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      // dispatch(setRedirectUrl(mappedProfileState.currentURL));
      browserHistory.replace("/login");
    }
  }

  render() {
    const { mappedProfileState } = this.props;
    if (mappedProfileState.isLoggedIn) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  EnsureLoggedInContainer
);
