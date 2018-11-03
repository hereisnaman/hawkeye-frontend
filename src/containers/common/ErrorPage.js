import React from 'react';

const ErrorPage = props => (
  <div className="bg-gradient-danger minh-100 error-page">
    <div className="container">
      <div className="text-center">
        <div className="row flex-col text-white justify-content-center">
          <h1>Oh Snap!</h1>
          <p>Some error occured</p>
        </div>
      </div>
    </div>
  </div>
);

export default ErrorPage;
