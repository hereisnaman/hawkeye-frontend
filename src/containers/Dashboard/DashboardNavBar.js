import React from 'react';
import { withRouter } from 'react-router-dom';

import auth from '../../auth';
import { NavBar } from '../../components/';

class DashboardNavBar extends React.PureComponent {
  handleSignOut = async () => {
    const { history } = this.props;
    await auth.signOut();

    return history.push('/');
  };

  render() {
    return (
      <NavBar
        title="Dashboard"
        link="/dashboard/"
        items={[
          <span key="signout-button" className="nav-link nav-link-icon pointer" onClick={this.handleSignOut}>
            <i className="ni ni-user-run" />
            <span className="nav-link-inner--text">Sign out</span>
          </span>,
        ]}
      />
    );
  }
}

export default withRouter(DashboardNavBar);
