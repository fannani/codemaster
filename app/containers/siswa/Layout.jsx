import React, { useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import EnergyModal from '../../components/siswa/EnergyModal';
import Header from '../../components/siswa/Header';
import { RouteSiswa } from '../../config/route';
import usePlayer from '../../hooks/player';
import { logout as logoutAction } from '../../actions/users';

const Layout = ({ logout, life, score, play }) => {
  const [showModal, setShowModal] = useState(false);
  const player = usePlayer();
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
        time={player.gameplay.timerText}
        logout={onLogout}
        user={player.user}
        isLogin={player.isLogin}
        onAddEnergy={onAddEnergy}
        energy={
          player.user &&
          Object.prototype.hasOwnProperty.call(player.user, 'userdetail')
            ? player.user.userdetail.energy
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

  play: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  life: state.gameplay.life,
  score: state.gameplay.score,
  play: state.gameplay.play,
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
