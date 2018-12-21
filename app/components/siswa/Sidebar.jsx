import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <nav className="col-3" id="sidebar">
    <ul className="list-unstyled components">
      <li>
        <Link to="/">Dashboard</Link>
        <Link to="/">Learn</Link>
        <Link to="/course">Course</Link>
        <Link to="/">Achievements</Link>
        <Link to="/">Badges</Link>
        <Link to="/">Friends</Link>
        <Link to="/">Settings</Link>
      </li>
    </ul>
  </nav>
);
export default Sidebar;
