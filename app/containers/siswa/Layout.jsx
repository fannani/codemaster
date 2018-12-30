import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from '../../components/siswa/Header';
import Home from './Home';
import Login from './Login';
import Course from './Course';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-bootstrap4-modal';

class Layout extends Component {
  constructor(props){
    super(props);
    this.state ={
      showModal : false
    }
    this.onAddEnergy = this.onAddEnergy.bind(this);
    this.onClickBackdrop = this.onClickBackdrop.bind(this);
  }
  onAddEnergy(){
    this.setState({
      showModal: true
    })
  }
  onClickBackdrop(){
    this.setState({
      showModal: false
    })
  }
  render() {
    const { life, score, time, play, user } = this.props;
    return (
      <div className="app-container">
        <Header
          play={play}
          life={life}
          score={score}
          time={time}
          onAddEnergy={this.onAddEnergy}
          energy={
            (user && user.hasOwnProperty('userdetail')) ? user.userdetail.energy : 0
          }
        />

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/play/:stageid" component={Course} />
          <Route path="/" component={Home} />
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
              <button style={{width:"100%"}} className="btn btn-primary">Lihat Video</button></div>
              <div className="col-6">
            <button  style={{width:"100%"}} className="btn btn-primary">Kerjakan Latihan</button></div>
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
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(Layout),
);
