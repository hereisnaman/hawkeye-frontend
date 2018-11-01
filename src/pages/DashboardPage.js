import React from 'react';
import { connect } from 'react-redux';

import { DashboardNavBar, DashboardHeader } from '../containers/';

class DashboardPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DashboardNavBar />
        <DashboardHeader />
      </React.Fragment>
    );
  }
}

export default DashboardPage;
