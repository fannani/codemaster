import React, { Component, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-bootstrap4-modal';
import Header from '../../components/siswa/Header';
import route from './route';
import Login from './Login';
import Register from './Register';
import { logout } from '../../actions/users';

const Layout = ({ logout, life, score, time, play, user }) => {
  const [showModal, setShowModal] = useState(false);

  // componentDidMount() {
  //    const socket = socketIOClient(process.env.SOCKET_URL);
  //    socket.emit('TESAPI', "TESTESTES");
  // }

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
        isLogin={isLogin ? true : false}
        onAddEnergy={onAddEnergy}
        energy={
          user && user.hasOwnProperty('userdetail') ? user.userdetail.energy : 0
        }
      />

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={route} />
      </Switch>
      <Modal visible={showModal} onClickBackdrop={onClickBackdrop}>
        <div className="modal-header">
          <h5 className="modal-title">Menambah Energy</h5>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-6">
              <button style={{ width: '100%' }} className="btn btn-primary">
                Lihat Video
              </button>
            </div>
            <div className="col-6">
              <button style={{ width: '100%' }} className="btn btn-primary">
                Kerjakan Latihan
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
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
  logout: () => dispatch(logout()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
