import React from 'react';

const EmptyTask = props => (
  <div className="card empty-card pointer mb-0">
    <div className="card-body">
      <div className="text-center">
        <h4 className="message text-light">There are no tasks</h4>
      </div>
    </div>
  </div>
);

export default EmptyTask;
