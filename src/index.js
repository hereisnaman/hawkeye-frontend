import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { getStore } from './store';

const store = getStore();

class App extends React.Component {
  render() {
    return 'Hello World';
  }
}

render(<App />, document.getElementById('app'));
