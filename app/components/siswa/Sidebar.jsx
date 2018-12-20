import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <nav className="col-3" id="sidebar">
    <ul className="list-unstyled components">
      <li>
        <Link to="/course">Course</Link>
      </li>
    </ul>
  </nav>
);
export default Sidebar;