import React, { Suspense, lazy } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { getStore } from './store';
import './styles/main.scss';

const AuthProvider = lazy(() => import('./controllers/AuthProvider'));
const HomePage = lazy(() => import('./pages/HomePage'));

const store = getStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="main-content">
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <React.Fragment>
                    <Suspense fallback={null}>
                      <HomePage />
                    </Suspense>
                  </React.Fragment>
                )}
              />
              <Route
                path="*"
                render={() => (
                  <Suspense fallback={null}>
                    <AuthProvider>
                      <Switch>
                        This needs authenticated
                        <Route path="*" exact component={NotFoundPage} />
                      </Switch>
                    </AuthProvider>
                  </Suspense>
                )}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('app'));
