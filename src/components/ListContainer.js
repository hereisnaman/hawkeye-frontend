import React from 'react';

import { TaskContainer, EmptyTask } from './';

class ListContainer extends React.Component {
  renderTasks = () => {
    const { tasks } = this.props;

    if (!tasks.length) {
      return (
        <div className="row task-row mx-0 mb-3">
          <div className="col-12 px-0">
            <EmptyTask />
          </div>
        </div>
      );
    }

    return tasks.map(({ uid, title, todos, deadline }) => (
      <div key={`task-${uid}`} className="row task-row mx-0 mb-3">
        <div className="col-12 px-0">
          <TaskContainer uid={uid} title={title} todos={todos} deadline={deadline} />
        </div>
      </div>
    ));
  };

  isDeadlineNear = deadline => {
    if (deadline === null) {
      return false;
    }

    const now = new Date();
    const target = new Date(deadline);

    return target - now <= 1 * 24 * 60 * 60 * 1000; // 1 day
  };

  renderListStats = () => {
    const { tasks } = this.props;

    if (!tasks.length) {
      return null;
    }

    let reachingDeadline = 0;
    tasks.forEach(task => {
      if (this.isDeadlineNear(task.deadline)) {
        reachingDeadline += 1;
      }
    });

    return (
      <React.Fragment>
        {!!reachingDeadline && (
          <span className="pointer text-light icon-stat mr-2">
            {reachingDeadline}
            <i className="fab fa-gripfire ml-1 text-danger" />
          </span>
        )}
        {!!(tasks.length - reachingDeadline) && (
          <span className="pointer text-light icon-stat mr-2">
            {tasks.length - reachingDeadline}
            <i className="far fa-snowflake ml-1 text-secondary small" />
          </span>
        )}
      </React.Fragment>
    );
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
          <div className="row list-stat-row mx-0 mb-4">
            <span className="badge badge-pill badge-primary pointer mr-2">
              {tasks.length} {tasks.length > 1 ? 'tasks' : 'task'}
            </span>
            {this.renderListStats()}
          </div>
          <div className="task-container-row-wrap">
            <div className="task-container-row mx-0">{this.renderTasks()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListContainer;
