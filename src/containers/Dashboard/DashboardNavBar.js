import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import auth from '../../auth';
import { NavBar } from '../../components/';

class DashboardNavBar extends React.Component {
  state = {
    showUserDropdown: false,
  };

  handleSignOut = async () => {
    const { history } = this.props;
    await auth.signOut();

    return history.push('/');
  };

  toggleUserDropdown = () => {
    this.setState({
      showUserDropdown: !this.state.showUserDropdown,
    });
  };

  render() {
    const { name, avatar } = this.props;
    const { showUserDropdown } = this.state;

    return (
      <NavBar
        title="Dashboard"
        link="/dashboard/"
        items={[
          <span key="signout-button" className="nav-link nav-link-icon pointer">
            <div className="media align-items-center mb-0 pb-0" onClick={this.toggleUserDropdown}>
              <span className="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" src={avatar || '/public/assets/img/smiley.png'} />
              </span>
              <div className="media-body ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm  font-weight-bold">{name}</span>
              </div>
            </div>
            <div
              className={classNames('dropdown-menu', 'dropdown-menu-arrow', 'dropdown-menu-right', {
                show: showUserDropdown,
              })}>
              <div className=" dropdown-header noti-title">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </div>
              <div className="dropdown-divider" />
              <span className="dropdown-item" onClick={this.handleSignOut}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </span>
            </div>
          </span>,
        ]}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  name: auth.user.name,
  avatar: auth.user.avatar,
});

export default withRouter(connect(mapStateToProps)(DashboardNavBar));
