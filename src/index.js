import React, { Suspense, lazy } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { getStore } from './store';
import { AuthProvider, EntryController } from './controllers/';
import './styles/main.scss';

const PrivateContext = lazy(() => import('./controllers/PrivateContext'));
const HomePage = lazy(() => import('./pages/HomePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const store = getStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="main-content">
            <AuthProvider>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <EntryController redirectUrl={'/dashboard/'}>
                      <Suspense fallback={null}>
                        <HomePage />
                      </Suspense>
                    </EntryController>
                  )}
                />
                <Route
                  path="*"
                  render={() => (
                    <Suspense fallback={null}>
                      <PrivateContext>
                        This needs authentication
                        <Switch>
                          <Route
                            path="*"
                            render={() => (
                              <Suspense falllback={null}>
                                <NotFoundPage />
                              </Suspense>
                            )}
                          />
                        </Switch>
                      </PrivateContext>
                    </Suspense>
                  )}
                />
              </Switch>
            </AuthProvider>
          </div>
        </Router>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('app'));
