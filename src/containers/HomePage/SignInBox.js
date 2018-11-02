import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import auth from '../../auth';
import * as actions from '../../actions/';
import { validateEmail } from '../../utils/';

class SignInBox extends React.PureComponent {
  state = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    rememberMe: false,
    signInError: '',
    socialSignInError: '',
    signingInWith: null,
  };

  validate = (state = this.state) => {
    const { email, password } = state;

    const emailError = validateEmail(email).error;

    this.setState({
      emailError,
      signInError: '',
      socialSignInError: '',
    });

    return !emailError;
  };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value,
      emailError: '',
      signInError: '',
      socialSignInError: '',
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
      passwordError: '',
      signInError: '',
      socialSignInError: '',
    });
  };

  handleRememberMeChange = e => {
    this.setState({
      rememberMe: e.target.checked,
      signInError: '',
      socialSignInError: '',
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    await this.setState({
      signingInWith: 'EMAIL',
    });

    const { signIn } = this.props;
    const { email, password, rememberMe } = this.state;

    if (this.validate()) {
      try {
        await signIn(email, password, rememberMe);

        await this.setState({
          signingInWith: null,
        });
      } catch (err) {
        switch (err.code) {
          case 'auth/invalid-email':
            return this.setState({
              emailError: 'Email is invalid.',
              signingInWith: null,
            });
          case 'auth/user-disabled':
            return this.setState({
              signInError: 'Account is not active',
              signingInWith: null,
            });
          case 'auth/user-not-found':
            return this.setState({
              signInError: 'Wrong email/password.',
              signingInWith: null,
            });
          case 'auth/wrong-password':
            return this.setState({
              signInError: 'Wrong email/password.',
              signingInWith: null,
            });
          default:
            return this.setState({
              signInError: 'There was some error.',
              signingInWith: null,
            });
        }
      }
    }
  };

  handleSignInWithGithub = async () => {
    const { signInWithGithub } = this.props;

    this.setState({
      signInError: '',
      socialSignInError: '',
      signingInWith: 'GITHUB',
    });

    try {
      await signInWithGithub();

      await this.setState({
        signingInWith: null,
      });
    } catch (err) {
      switch (err.code) {
        case 'auth/account-exists-with-different-credential':
          return this.setState({
            socialSignInError: 'An account already exists with same email address.',
            signingInWith: null,
          });
        default:
          return this.setState({
            socialSignInError: 'There was some error.',
            signingInWith: null,
          });
      }
    }
  };

  handleSignInWithGoogle = async () => {
    const { signInWithGoogle } = this.props;

    this.setState({
      signInError: '',
      socialSignInError: '',
      signingInWith: 'GOOGLE',
    });

    try {
      await signInWithGoogle();

      await this.setState({
        signingInWith: null,
      });
    } catch (err) {
      switch (err.code) {
        case 'auth/account-exists-with-different-credential':
          return this.setState({
            socialSignInError: 'An account already exists with same email address.',
            signingInWith: null,
          });
        default:
          return this.setState({
            socialSignInError: 'There was some error.',
            signingInWith: null,
          });
      }
    }
  };

  render() {
    const { showSignUp, signingIn } = this.props;
    const {
      email,
      emailError,
      password,
      passwordError,
      rememberMe,
      signInError,
      socialSignInError,
      signingInWith,
    } = this.state;

    return (
      <div className="col-lg-5 col-md-7">
        <div className="card bg-secondary shadow border-0">
          <div className="card-header bg-white pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <button className="btn btn-neutral btn-icon" disabled={signingIn} onClick={this.handleSignInWithGithub}>
                <span className="btn-inner--icon">
                  <img src="/public/assets/img/github.svg" />
                </span>
                <span className="btn-inner--text">{signingIn && signingInWith === 'GITHUB' ? 'loader' : 'Github'}</span>
              </button>
              <button className="btn btn-neutral btn-icon" disabled={signingIn} onClick={this.handleSignInWithGoogle}>
                <span className="btn-inner--icon">
                  <img src="/public/assets/img/google.svg" />
                </span>
                <span className="btn-inner--text">{signingIn && signingInWith === 'GOOGLE' ? 'loader' : 'Google'}</span>
              </button>
            </div>
            {!!socialSignInError && <p className="text-warning text-center small mt-3 mb-0">{socialSignInError}</p>}
          </div>
          <div className="card-body px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <form role="form" onSubmit={this.handleSubmit}>
              <div className={classNames('form-group', 'mb-3', !!emailError ? 'has-danger' : '')}>
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="ni ni-email-83" />
                    </span>
                  </div>
                  <input
                    className={classNames('form-control', !!emailError ? 'is-invalid' : '')}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={this.handleEmailChange}
                  />
                </div>
                {!!emailError && <p className="text-warning text-left small mb-0">{emailError}</p>}
              </div>
              <div className={classNames('form-group', !!passwordError ? 'has-danger' : '')}>
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="ni ni-lock-circle-open" />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
                {!!passwordError && <p className="text-warning text-left small mb-0">{passwordError}</p>}
                {!!signInError && <p className="text-warning text-left small mt-3 mb-0">{signInError}</p>}
              </div>
              <div className="custom-control custom-control-alternative custom-checkbox text-left">
                <input
                  className="custom-control-input"
                  id="remember-me"
                  type="checkbox"
                  value={rememberMe}
                  onChange={this.handleRememberMeChange}
                />
                <label className="custom-control-label" htmlFor="remember-me">
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary my-4" disabled={signingIn}>
                  {signingIn && signingInWith === 'EMAIL' ? 'loading' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-3">
          <div className="offset-6 col-6 nav-link pointer text-right">
            <small onClick={showSignUp}>Create a new account</small>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  signingIn: auth.signingIn,
});

const mapDispatchToProps = dispatch => ({
  signIn: actions.signIn(dispatch),
  signInWithGithub: actions.signInWithGithub(dispatch),
  signInWithGoogle: actions.signInWithGoogle(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInBox);
