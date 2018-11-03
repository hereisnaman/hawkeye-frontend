import React from 'react';

import { Spinner, ListContainer } from '../../components/';

class KanbanBoard extends React.Component {
  renderLists = () => {
    const { lists } = this.props;

    return lists.map(({ uid, title, tasks }) => (
      <div key={`list-${uid}`} className="list-container-wrap col-sm-12 col-md-4 col-lg-3 mb-4">
        <ListContainer uid={uid} title={title} tasks={tasks} />
      </div>
    ));
  };

  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <div className="kanban-board loading">
          <div className="container">
            <div className="text-center">
              <div className="row justify-content-center mt-9">
                <Spinner />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="kanban-board mt--7">
        <div className="row lists-row mr-0">{this.renderLists()}</div>
      </div>
    );
  }
}

export default KanbanBoard;
