import React from 'react';
import { connect } from 'react-redux';

import { HomeNavBar, SignInBox, SignUpBox } from '../containers/';

class HomePage extends React.Component {
  state = {
    isSignInPage: true,
  };

  handlePageChange = isSignInPage => this.setState({ isSignInPage });

  render() {
    const { isSignInPage } = this.state;

    return (
      <React.Fragment>
        <HomeNavBar />
        <div className="bg-gradient-primary py-7 py-lg-8">
          <div className="container">
            <div className="text-center">
              <div className="row justify-content-center">
                {isSignInPage ? (
                  <SignInBox showSignUp={() => this.handlePageChange(false)} />
                ) : (
                  <SignUpBox showSignIn={() => this.handlePageChange(true)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
