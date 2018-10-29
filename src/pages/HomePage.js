import React from 'react';
import { connect } from 'react-redux';

import { NavBar } from '../components/';
import { LoginBox, SignupBox } from '../containers/';

class HomePageComponent extends React.Component {
  state = {
    isLoginPage: true,
  };

  handlePageChange = isLoginPage => this.setState({ isLoginPage });

  render() {
    const { loggedIn } = this.props;
    const { isLoginPage } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <div className="bg-gradient-primary py-7 py-lg-8">
          <div className="container">
            <div className="text-center">
              <div className="row justify-content-center">
                {isLoginPage ? (
                  <LoginBox showSignup={() => this.handlePageChange(false)} />
                ) : (
                  <SignupBox showLogin={() => this.handlePageChange(true)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  loggedIn: user.loggedIn,
});

export default connect(mapStateToProps)(HomePageComponent);
