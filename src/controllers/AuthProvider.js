import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import auth from '../auth';
import * as actions from '../actions/';

class AuthProvider extends React.Component {
  componentDidMount() {
    const { updateAuthState } = this.props;

    auth.onAuthStateChanged(updateAuthState);
  }

  render() {
    const { loading, children } = this.props;

    if (!loading) {
      return children;
    }

    return null;
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
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
