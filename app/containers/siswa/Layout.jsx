import React, { useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-bootstrap4-modal';
import PropTypes from 'prop-types';
import Header from '../../components/siswa/Header';
import RouteComp from '../../config/route';

import { logout as logoutAction } from '../../actions/users';

const Layout = ({ logout, life, score, time, play, user, isLogin }) => {
  const [showModal, setShowModal] = useState(false);

  const onAddEnergy = () => {
    setShowModal(true);
  };
  const onClickBackdrop = () => {
    setShowModal(false);
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

      <RouteComp />
      <Modal visible={showModal} onClickBackdrop={onClickBackdrop}>
        <div className="modal-header">
          <h5 className="modal-title">Menambah Energy</h5>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-6">
              <button
                type="button"
                style={{ width: '100%' }}
                className="btn btn-primary"
              >
                Lihat Video
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                style={{ width: '100%' }}
                className="btn btn-primary"
              >
                Kerjakan Latihan
              </button>
            </div>
          </div>
        </div>
      </Modal>
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
