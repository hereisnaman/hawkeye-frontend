import React from 'react';

import { NavBar } from '../../components/';

const HomeNavBar = props => (
  <NavBar
    title="Kanban Board"
    link="/"
    items={[
      <a
        key={'github-link'}
        className="nav-link nav-link-icon"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/hereisnaman/kanban-board/">
        <i className="fab fa-github" />
        <span className="nav-link-inner--text">Github</span>
      </a>,
    ]}
  />
);

export default HomeNavBar;
