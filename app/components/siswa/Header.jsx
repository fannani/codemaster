/* eslint-disable */
import React from 'react';
import PlayerStatus from './PlayerStatus';
import energyImage from '../../assets/images/energy.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const EnergyDiv = styled.div`
  color: white !important;
  margin-left: 30px;
`;
const EnergyImg = styled.img`
  width: 12px;
`;

const Header = ({ play, life, score, time, energy, onAddEnergy, isLogin,user,logout }) => {
  const playerStatus = play ? (
    <PlayerStatus life={life} score={score} time={time} />
  ) : (
    ''
  );
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark"
      style={{ height: '50px' }}
    >
      <a className="navbar-brand" href="#">
        belajarkode;
      </a>
      {isLogin ? (
        <EnergyDiv className="navbar-text">
          <EnergyImg width="20px" src={energyImage} /> : {energy}
          <button
            style={{
              marginLeft: '10px',
              height: '33px',
              backgroundColor: '#7386D5',
              border: '0',
            }}
            className="btn btn-primary"
            onClick={onAddEnergy}
          >
            Tambah
          </button>
        </EnergyDiv>
      ) : (
        ''
      )}
      {playerStatus}

      {isLogin ? (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/course">
                Course
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/achievement">
                Achievements
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Friends
              </Link>
            </li>
          </ul>
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
                {user.name} <span className="caret" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <button onClick={logout}
                  className="dropdown-item"
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        ''
      )}
    </nav>
  );
};

export default Header;
