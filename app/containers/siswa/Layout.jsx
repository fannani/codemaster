import React, { useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import EnergyModal from '../../components/siswa/EnergyModal';
import Header from '../../components/siswa/Header';
import { RouteSiswa } from '../../config/route';

import { logout as logoutAction } from '../../actions/users';

const Layout = ({ logout, life, score, time, play, user, isLogin }) => {
  const [showModal, setShowModal] = useState(false);

  const onAddEnergy = () => {
    setShowModal(true);
  };
  const onLogout = () => {
    logout();
  };

  return (
    <div className="app-container">
      <Header
        play={play}
        life={life}
        score={score}
        time={time}
        logout={onLogout}
        user={user}
        isLogin={isLogin}
        onAddEnergy={onAddEnergy}
        energy={
          user && Object.prototype.hasOwnProperty.call(user, 'userdetail')
            ? user.userdetail.energy
            : 0
        }
      />

      <RouteSiswa />
      <EnergyModal
        showModal={showModal}
        onClickBackdrop={() => setShowModal(false)}
      />
    </div>
  );
};

Layout.propTypes = {
  logout: PropTypes.func.isRequired,
  life: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  play: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  life: state.gameplay.life,
  score: state.gameplay.score,
  time: state.gameplay.timerText,
  play: state.gameplay.play,
  user: state.users.user,
  isLogin: state.users.loggedIn,
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
