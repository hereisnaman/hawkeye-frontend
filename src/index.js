import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { getStore } from './store';
import { AuthProvider } from './controllers/';
import { HomePage, NotFoundPage } from './pages/';
import './styles/main.scss';

const store = getStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="main-content">
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route
                path="*"
                render={() => {
                  <AuthProvider>
                    <Switch>
                      This needs authenticated
                      <Route path="*" exact component={NotFoundPage} />
                    </Switch>
                  </AuthProvider>;
                }}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('app'));
