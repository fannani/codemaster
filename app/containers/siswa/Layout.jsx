import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from '../../components/siswa/Header';
import Home from './Home';
import Login from './Login';
import Course from './Course';
import connect from 'react-redux/es/connect/connect';

class Layout extends Component {
  render() {
    const { life, score, time, play, user } = this.props;
    return (
      <div className="app-container">
        <Header
          play={play}
          life={life}
          score={score}
          time={time}
          energy={
            (user && user.hasOwnProperty('userdetail')) ? user.userdetail.energy : 0
          }
        />

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/play/:stageid" component={Course} />
          <Route path="/" component={Home} />
        </Switch>

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
