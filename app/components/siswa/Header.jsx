/* eslint-disable */
import React from 'react';
import PlayerStatus from './PlayerStatus';
import energyImage from '../../assets/images/energy.png';
import styled from 'styled-components';

const EnergyDiv = styled.div`
  color: white !important;
  margin-left: 30px;
`;
const EnergyImg = styled.img`
  width: 12px;
`;

const Header = ({ play, life, score, time, energy }) => {
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
      <EnergyDiv className="navbar-text">
        <EnergyImg width="20px" src={energyImage} /> : {energy}
        <button style={{marginLeft: "10px",height:"33px",backgroundColor:"#7386D5", border:"0"}} className="btn btn-primary">Tambah</button>
      </EnergyDiv>
      {playerStatus}
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
              <a className="dropdown-item" href="http://localhost:3000/logout">
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
