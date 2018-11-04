import React from 'react';

class TaskContainer extends React.Component {
  isDeadlineNear = deadline => {
    if (deadline === null) {
      return false;
    }

    const now = new Date();
    const target = new Date(deadline);

    return target - now <= 1 * 24 * 60 * 60 * 1000; // 1 day
  };

  renderTaskStats = () => {
    const { deadline } = this.props;

    if (this.isDeadlineNear(deadline)) {
      return (
        <span className="icon-stat">
          <i className="fab fa-gripfire pointer text-danger mr-2" />
        </span>
      );
    } else {
      return <i className="far fa-snowflake pointer text-primary mr-2" />;
    }
  };

  render() {
    const { title, todos, deadline } = this.props;

    return (
      <div className="card task-card shadow pointer mb-0">
        <div className="card-body py-1">
          <div className="task-status-row">{this.renderTaskStats()}</div>
          <div className="row task-title-row mx-0">
            <h4 className="title mb-0">{title}</h4>
          </div>
          {!!todos.length && (
            <div className="todos-section mt-1">
              <div className="row todos-row mx-0">
                <span className="badge badge-pill badge-success pointer small mr-1">{todos.length} total</span>
                <span className="badge badge-pill badge-warning pointer small">
                  {todos.filter(({ done }) => !done).length} not done
                </span>
              </div>
            </div>
          )}
          {deadline !== null && (
            <div className="row deadline-row  text-muted mx-0 mt-3">
              <i className="ni ni-calendar-grid-58 mr-2 small" />
              <span>{deadline.substring(0, 10)}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TaskContainer;
