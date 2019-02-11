import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/siswa/Header';
import route from './route';
import Login from './Login';
import Register from './Register';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-bootstrap4-modal';
import { logout } from '../../actions/users';
import socketIOClient from "socket.io-client";
import { BASE_URL } from "../../config/config";


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.onAddEnergy = this.onAddEnergy.bind(this);
    this.onClickBackdrop = this.onClickBackdrop.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    const socket = socketIOClient(BASE_URL);
    socket.emit('TESAPI', "TESTESTES");
  }

  onAddEnergy() {
    this.setState({
      showModal: true,
    });
  }
  onClickBackdrop() {
    this.setState({
      showModal: false,
    });
  }
  logout() {
    this.props.logout();
  }
  render() {
    const { life, score, time, play, user, isLogin } = this.props;

    return (
      <div className="app-container">
        <Header
          play={play}
          life={life}
          score={score}
          time={time}
          logout={this.logout}
          user={this.props.user}
          isLogin={this.props.isLogin ? true : false}
          onAddEnergy={this.onAddEnergy}
          energy={
            user && user.hasOwnProperty('userdetail')
              ? user.userdetail.energy
              : 0
          }
        />

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={route} />

        </Switch>
        <Modal
          visible={this.state.showModal}
          onClickBackdrop={this.onClickBackdrop}
        >
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
  }
}

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
)(Layout)
