import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

class PrivateContext extends React.Component {
  render() {
    const { signedIn, children } = this.props;

    if (signedIn) {
      return children;
    }

    return (
      <Suspense falllback={null}>
        <NotFoundPage />
      </Suspense>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  signedIn: auth.user,
});

export default connect(mapStateToProps)(PrivateContext);
