import React from 'react';

export class LoginBox extends React.Component {
  render() {
    const { showSignup } = this.props;

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
            <form role="form">
              <div className="form-group mb-3">
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="ni ni-email-83" />
                    </span>
                  </div>
                  <input className="form-control" placeholder="Email" type="email" />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="ni ni-lock-circle-open" />
                    </span>
                  </div>
                  <input className="form-control" placeholder="Password" type="password" />
                </div>
              </div>
              <div className="custom-control custom-control-alternative custom-checkbox text-left">
                <input className="custom-control-input" id="remember-me" type="checkbox" />
                <label className="custom-control-label" htmlFor="remember-me">
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-primary my-4">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-3">
          <div className="offset-6 col-6 pointer text-right">
            <small onClick={showSignup}>Create a new account</small>
          </div>
        </div>
      </div>
    );
  }
}
