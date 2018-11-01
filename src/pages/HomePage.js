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
        <div className="bg-gradient-danger minh-100 pt-5 pb-5 pt-lg-8 pb-lg-4">
          <div className="container">
            <div className="text-center">
              <div className="row justify-content-center">
                <div className="col-lg-7 col-md-5">
                  <h1 className="display-3 text-white text-left mb-5">
                    A New Standard for Organising Work <span>~ Kanban Board</span>
                  </h1>
                  <div className="px-lg-5 px-md-3">
                    <img src="/public/assets/img/ill-2.svg" alt="kanban-board" />
                  </div>
                </div>
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
