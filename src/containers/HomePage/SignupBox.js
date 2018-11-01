import React from 'react';
import classNames from 'classnames';

import auth from '../../auth';
import { validateName, validateEmail, validatePassword } from '../../utils/';

class SignUpBox extends React.PureComponent {
  state = {
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    signUpError: '',
  };

  validate = (state = this.state) => {
    const { name, email, password } = state;

    const nameError = validateName(name).error;
    const emailError = validateEmail(email).error;
    const passwordError = validatePassword(password).error;

    this.setState({
      nameError,
      emailError,
      passwordError,
    });

    return !nameError && !emailError && !passwordError;
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
      nameError: '',
    });
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

  handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = this.state;

    if (this.validate()) {
      try {
        await auth.setPersistence(auth.instance.Auth.Persistence.LOCAL);

        await auth.createUserWithEmailAndPassword(email, password);
      } catch (err) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            return this.setState({
              emailError: 'Email already in use.',
            });
          case 'auth/invalid-email':
            return this.setState({
              emailError: 'Email is invalid.',
            });
          case 'auth/weak-password':
            return this.setState({
              passwordError: 'Password is too weak.',
            });
          default:
            return this.setState({
              signUpError: 'There was some error.',
            });
        }
      }
    }
  };

  render() {
    const { showSignIn } = this.props;
    const { name, email, password, nameError, emailError, passwordError, signUpError } = this.state;

    return (
      <div className="col-lg-5 col-md-7">
        <div className="card bg-secondary shadow border-0">
          <div className="card-header bg-white pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign up with</small>
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
              <small>Or sign up with credentials</small>
            </div>
            <form role="form" onSubmit={this.handleSubmit}>
              <div className={classNames('form-group', 'mb-3', !!nameError ? 'has-danger' : '')}>
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="ni ni-hat-3" />
                    </span>
                  </div>
                  <input
                    className={classNames('form-control', !!nameError ? 'is-invalid' : '')}
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={this.handleNameChange}
                  />
                </div>
                {!!nameError ? <p className="text-warning text-left small mb-0">{nameError}</p> : null}
              </div>
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
              </div>
              {!!signUpError ? <p className="text-warning text-left small mb-0">{signUpError}</p> : null}
              <div className="text-center">
                <button type="submit" className="btn btn-primary my-4">
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6 pointer text-left">
            <small onClick={showSignIn}>Already have an account?</small>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpBox;
