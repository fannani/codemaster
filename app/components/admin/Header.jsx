/* eslint-disable */
import React from 'react';
import { BASE_URL } from '../../config/config';
import Logo from '../Logo';

const Header = ({ logout }) => (
  <nav
    className="navbar navbar-expand-md navbar-dark bg-dark"
    style={{ height: '50px' }}
  >
    <a className="navbar-brand" href="#">
      <Logo mode="dark" style={{ marginTop: '0px' }} />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto" />

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            id="navbarDropdown"
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {'tes'} <span className="caret" />
          </a>

          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <button onClick={logout} className="dropdown-item">
              Logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
