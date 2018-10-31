import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = React.memo(({ title, link, items }) => (
  <nav className="navbar navbar-top navbar-horizontal navbar-expand-lg navbar-dark">
    <div className="container">
      <Link className="navbar-brand" to={link}>
        {title}
      </Link>
      <ul className="navbar-nav ml-auto">
        {(items || []).map((item, index) => (
          <li key={`nav-item-${index}`} className="nav-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </nav>
));

export default NavBar;
