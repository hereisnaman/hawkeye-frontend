import React from 'react';

class ListContainer extends React.Component {
  render() {
    const { title, tasks } = this.props;

    return (
      <div className="card list-container bg-default">
        <div className="card-body">
          <div className="row list-title-row mx-0 mb-3">
            <h2 className="title text-white ellipsis">{title}</h2>
            <i className="add-task-icon text-primary pointer fas fa-plus" title="Add task" />
          </div>
          <div className="row mx-0 mb-4">
            <span class="badge badge-success pointer">{tasks.length} tasks</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ListContainer;
