import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = props => (
  <nav className="navbar navbar-top navbar-horizontal navbar-expand-lg navbar-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Kanban Board
      </Link>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a
            class="nav-link nav-link-icon"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/hereisnaman/">
            <i class="fab fa-github" />
            <span class="nav-link-inner--text">Github</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
);
