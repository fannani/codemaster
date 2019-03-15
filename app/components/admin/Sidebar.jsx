import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <nav className="col-3" id="sidebar">
    <ul className="list-unstyled components">
      <li>
        <Link to="/admin/log">Log</Link>
        <Link to="/admin/course">Course</Link>
        <Link to="/admin/testcase">TestCase</Link>
      </li>
    </ul>
  </nav>
);

export default Sidebar;
