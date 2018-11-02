import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';

import { LoadingPage } from '../containers/';

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

class PrivateContext extends React.Component {
  render() {
    const { authenticated, children } = this.props;

    if (authenticated) {
      return children;
    }

    return (
      <Suspense falllback={<LoadingPage />}>
        <NotFoundPage />
      </Suspense>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  authenticated: auth.authenticated,
});

export default connect(mapStateToProps)(PrivateContext);
