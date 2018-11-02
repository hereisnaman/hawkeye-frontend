import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ title, link, items }) => (
  <nav className="navbar navbar-top navbar-horizontal navbar-expand-lg navbar-dark">
    <div className="container">
      <Link className="navbar-brand text-white" to={link}>
        {title}
      </Link>
      <ul className="navbar-nav ml-auto">
        {(items || []).map((item, index) => (
          <li key={`nav-item-${index}`} className="nav-item dropdown">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default NavBar;
