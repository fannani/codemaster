import React, { useState, useEffect } from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import EnergyModal from '../../components/siswa/EnergyModal';
import Header from '../../components/siswa/Header';
import { RouteSiswa } from '../../config/route';
import usePlayer from '../../hooks/player';
import { logout as logoutAction } from '../../actions/users';

const Layout = ({ logout }) => {
  const [showModal, setShowModal] = useState(false);
  const player = usePlayer();

  useEffect(() => {
    player.setPlayMode(false);
  }, []);

  const onAddEnergy = () => {
    setShowModal(true);
  };
  const onLogout = () => {
    logout();
  };
  return (
    <div className="app-container">
      <Header
        play={player.gameplay.play}
        life={player.gameplay.life}
        score={player.gameplay.score}
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
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
});
export default connect(
  null,
  mapDispatchToProps,
)(Layout);
