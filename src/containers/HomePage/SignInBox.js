import React from 'react';
import classNames from 'classnames';

import auth from '../../auth';
import { validateEmail } from '../../utils/';

class SignInBox extends React.Component {
  state = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    rememberMe: false,
    signInError: '',
  };

  validate = (state = this.state) => {
    const { email, password } = state;

    const emailError = validateEmail(email).error;

    this.setState({
      emailError,
    });

    return !emailError;
  };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value,
      emailError: '',
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
      passwordError: '',
    });
  };

  handleRememberMeChange = e => {
    this.setState({
      rememberMe: e.target.checked,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password, rememberMe } = this.state;

    if (this.validate()) {
      try {
        await auth.setPersistence(auth.instance.Auth.Persistence[rememberMe ? 'LOCAL' : 'SESSION']);

        await auth.signInWithEmailAndPassword(email, password);
      } catch (err) {
        switch (err.code) {
          case 'auth/invalid-email':
            return this.setState({
              emailError: 'Email is invalid.',
            });
          case 'auth/user-disabled':
            return this.setState({
              signInError: 'Account is not active',
            });
          case 'auth/user-not-found':
            return this.setState({
              signInError: 'Wrong email/password.',
            });
          case 'auth/wrong-password':
            return this.setState({
              signInError: 'Wrong email/password.',
            });
          default:
            return this.setState({
              signInError: 'There was some error.',
            });
        }
      }
    }
  };

  render() {
    const { showSignUp } = this.props;
    const { email, emailError, password, passwordError, rememberMe, signInError } = this.state;

    return (
      <div className="col-lg-5 col-md-7">
        <div className="card bg-secondary shadow border-0">
          <div className="card-header bg-white pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <a href="#" className="btn btn-neutral btn-icon">
                <span className="btn-inner--icon">
                  <img src="/public/assets/img/github.svg" />
                </span>
                <span className="btn-inner--text">Github</span>
              </a>
              <a href="#" className="btn btn-neutral btn-icon">
                <span className="btn-inner--icon">
                  <img src="/public/assets/img/google.svg" />
                </span>
                <span className="btn-inner--text">Google</span>
              </a>
            </div>
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
                {!!emailError ? <p className="text-warning text-left small mb-0">{emailError}</p> : null}
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
                {!!passwordError ? <p className="text-warning text-left small mb-0">{passwordError}</p> : null}
                {!!signInError ? <p className="text-warning text-left small mt-3 mb-0">{signInError}</p> : null}
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
                <button type="submit" className="btn btn-primary my-4">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-3">
          <div className="offset-6 col-6 pointer text-right">
            <small onClick={showSignUp}>Create a new account</small>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInBox;
