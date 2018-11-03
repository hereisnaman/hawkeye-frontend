import React from 'react';

class TaskContainer extends React.Component {
  render() {
    const { title, todos } = this.props;

    return (
      <div className="card shadow pointer mb-0">
        <div className="card-body">
          <div className="row task-title-row mx-0 mb-1">
            <h4 className="title mb-0">{title}</h4>
          </div>
          <div className="row mx-0 mb-2">
            <span className="badge badge-pill badge-warning pointer small">{todos.length} todos</span>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskContainer;
