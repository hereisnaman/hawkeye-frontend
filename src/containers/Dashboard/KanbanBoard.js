import React from 'react';

import { Spinner, ListContainer } from '../../components/';

class KanbanBoard extends React.Component {
  renderLists = () => {
    const { lists } = this.props;

    return lists.map(({ uid, title, tasks }) => <ListContainer key={`list-${uid}`} title={title} tasks={tasks} />);
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
        <div className="container-fluid">
          <div className="row">{this.renderLists()}</div>
        </div>
      </div>
    );
  }
}

export default KanbanBoard;
