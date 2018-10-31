import React from 'react';
import { connect } from 'react-redux';

import { DashboardNavBar } from '../containers/';

class DashboardPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DashboardNavBar />
      </React.Fragment>
    );
  }
}

export default DashboardPage;
