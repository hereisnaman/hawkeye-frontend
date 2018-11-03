import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/';
import { LoadingPage, ErrorPage, DashboardNavBar, DashboardHeader, KanbanBoard } from '../containers/';

class DashboardPage extends React.Component {
  async componentDidMount() {
    const { loadingDashboard, fetchLists, fetchLabels } = this.props;

    await loadingDashboard();
    await Promise.all([fetchLists(), fetchLabels()]);
    await loadingDashboard(false);
  }

  render() {
    const { loading, fetchListsSuccess, fetchLabelsSuccess, lists, labels } = this.props;

    if (!loading && (!fetchListsSuccess || !fetchLabelsSuccess)) {
      return <ErrorPage />;
    }

    return (
      <React.Fragment>
        <DashboardNavBar />
        <DashboardHeader />
        <KanbanBoard loading={loading} lists={lists} labels={labels} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ board, dashboard }) => ({
  loading: dashboard.loading,
  fetchListsSuccess: board.fetchListsSuccess,
  fetchLabelsSuccess: board.fetchLabelsSuccess,
  lists: board.lists,
  labels: board.labels,
});

const mapDispatchToProps = dispatch => ({
  loadingDashboard: actions.loadingDashboard(dispatch),
  fetchLists: actions.fetchLists(dispatch),
  fetchLabels: actions.fetchLabels(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
