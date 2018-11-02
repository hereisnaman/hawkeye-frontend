import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import auth from '../auth';
import * as actions from '../actions/';
import { LoadingPage } from '../containers/';

class AuthProvider extends React.Component {
  handleAuthStateUpdate = meta => {
    const { signingIn, updateAuthState } = this.props;

    if (!signingIn) {
      return updateAuthState(meta);
    }
  };

  componentDidMount() {
    auth.onAuthStateChanged(this.handleAuthStateUpdate);
  }

  render() {
    const { loading, children } = this.props;

    if (!loading) {
      return children;
    }

    return <LoadingPage />;
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  signingIn: auth.signingIn,
});

const mapDispatchToProps = dispatch => ({
  updateAuthState: actions.updateAuthState(dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthProvider),
);
