import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from '../../components/siswa/Header';
import Home from './Home';
import Login from './Login';
import Course from './Course';
import connect from "react-redux/es/connect/connect";

class Layout extends Component {
  render() {
    const { life, score, time, play } = this.props;
    return  (
      <div>
        <Header play={play} life={life} score={score} time={time} />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/play/:stageid" component={Course} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  life: state.gameplay.life,
  score: state.gameplay.score,
  time: state.gameplay.timerText,
  play: state.gameplay.play,
});

export default withRouter(connect(
  mapStateToProps,
  null,
)(Layout));

