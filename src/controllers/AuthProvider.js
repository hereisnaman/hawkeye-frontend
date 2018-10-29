import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

class AuthProviderComponent extends React.Component {
  render() {
    const { loggedIn, children } = this.props;

    if (loggedIn) {
      return children;
    }

    return (
      <Suspense falllback={null}>
        <NotFoundPage />
      </Suspense>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  loggedIn: user.loggedIn,
});

export default connect(mapStateToProps)(AuthProviderComponent);
