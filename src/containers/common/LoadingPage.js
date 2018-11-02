import React from 'react';

import { Spinner } from '../../components/';

const LoadingPage = props => (
  <div className="bg-gradient-danger minh-100 loading-page">
    <div className="container">
      <div className="text-center">
        <div className="row justify-content-center">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
);

export default LoadingPage;
