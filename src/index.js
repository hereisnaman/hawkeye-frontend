import React, { Suspense, lazy } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { getStore } from './store';
import { AuthProvider, EntryController } from './controllers/';
import './styles/main.scss';

const PrivateContext = lazy(() => import('./controllers/PrivateContext'));
const HomePage = lazy(() => import('./pages/HomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
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
                  exact
                  path="/dashboard/"
                  render={() => (
                    <Suspense fallback={null}>
                      <PrivateContext>
                        <Suspense falllback={null}>
                          <DashboardPage />
                        </Suspense>
                      </PrivateContext>
                    </Suspense>
                  )}
                />
                <Route
                  path="*"
                  render={() => (
                    <Suspense falllback={null}>
                      <NotFoundPage />
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
