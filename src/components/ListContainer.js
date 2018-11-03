import React from 'react';

import { TaskContainer } from './';

class ListContainer extends React.Component {
  renderTasks = () => {
    const { tasks } = this.props;

    return tasks.map(({ uid, title, todos }) => (
      <div key={`task-${uid}`} className="row task-row mx-0 mb-3">
        <div className="col-12 px-0">
          <TaskContainer uid={uid} title={title} todos={todos} />
        </div>
      </div>
    ));
  };
  render() {
    const { title, tasks } = this.props;

    return (
      <div className="card shadow list-container bg-default">
        <div className="card-body pb-0">
          <div className="row list-title-row mx-0 mb-1">
            <h2 className="title text-white ellipsis">{title}</h2>
            <i className="add-task-icon text-primary pointer fas fa-plus" title="Add task" />
          </div>
          <div className="row mx-0 mb-4">
            <span className="badge badge-pill badge-success pointer mr-2">{tasks.length} tasks</span>
            <span className="badge badge-pill badge-warning pointer">
              {`${tasks.reduce((acm, { todos }) => acm + todos.length, 0)}`} todos
            </span>
          </div>
          <div className="task-container-row-wrap">
            <div className="task-container-row mx-0">
              {this.renderTasks()}
              {this.renderTasks()}
              {this.renderTasks()}
              {this.renderTasks()}
              {this.renderTasks()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListContainer;
