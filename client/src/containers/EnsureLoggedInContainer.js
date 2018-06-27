import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from "react-redux";

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const { mappedProfileState } = this.props;
    let url;

    if (!mappedProfileState.profile || !mappedProfileState.profile.email) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      // dispatch(setRedirectUrl(mappedProfileState.currentURL));
      url = "/login";
        browserHistory.replace(url);
    // } else {
    //     const profileState = this.props.mappedProfileState;
    //     const role = profileState.profile && profileState.profile.role;

    //     switch (role) {
    //         case 'ADMIN':
    //         case 'USER_MANAGER':
    //             url = "/users";
    //             break;
    //         case 'REGULAR_USER':
    //             url = "/saving-deposits";
    //             break;
    //         default:
    //             url = "/profile"
    //     }
    }
    // browserHistory.replace(url);
  }

  render() {
    return this.props.children;
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
