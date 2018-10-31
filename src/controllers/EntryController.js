import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EntryController extends React.Component {
  redirectIfSignedIn = () => {
    const { authenticated, history, redirectUrl } = this.props;

    if (authenticated) {
      history.push(redirectUrl);
    }
  };

  componentDidMount() {
    this.redirectIfSignedIn();
  }

  componentDidUpdate() {
    this.redirectIfSignedIn();
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = ({ auth }) => ({
  authenticated: auth.authenticated,
});

export default withRouter(connect(mapStateToProps)(EntryController));
