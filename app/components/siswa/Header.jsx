import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PlayerStatus from './PlayerStatus';
import energyImage from '../../assets/images/energy.png';
import Logo from '../Logo.jsx';

const EnergyDiv = styled.div`
  color: white !important;
  margin-right: 30px;
`;
const EnergyImg = styled.img`
  width: 12px;
`;

const Navigasi = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
`;

const Header = ({
  play,
  life,
  score,
  time,
  energy,
  onAddEnergy,
  isLogin,
  user,
  logout,
}) => {
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
        <Logo mode="dark" style={{ marginTop: '0px' }} />
      </a>

      {playerStatus}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {isLogin ? (
          <>
            {!play ? (
              <Navigasi>
                <ul
                  className="navbar-nav"
                  style={{
                    width: '340px',
                    'margin-left': 'auto',
                    'margin-right': 'auto',
                  }}
                >
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
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
                    <Link className="nav-link" to="/friends">
                      Friends
                    </Link>
                  </li>
                </ul>
              </Navigasi>
            ) : (
              ''
            )}
            {isLogin ? (
              <EnergyDiv className="navbar-text ml-auto">
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
            <ul className="navbar-nav">
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
                  <button onClick={logout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </>
        ) : (
          ''
        )}
      </div>
    </nav>
  );
};

export default Header;
