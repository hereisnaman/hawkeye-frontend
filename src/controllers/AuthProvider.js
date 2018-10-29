import React from 'react';
import { connect } from 'react-redux';

import { NotFoundPage } from '../pages/';

class AuthProviderComponent extends React.Component {
  render() {
    const { loggedIn, children } = this.props;

    if (loggedIn) {
      return children;
    }

    return <NotFoundPage />;
  }
}

const mapStateToProps = ({ user }) => ({
  loggedIn: user.loggedIn,
});

export const AuthProvider = connect(mapStateToProps)(AuthProviderComponent);
