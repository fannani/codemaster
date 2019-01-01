import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { BASE_URL } from '../../config/config';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import CourseList from './CourseList';
import Achievement from './Achievement';
import CourseDetail from './CourseDetail';
import Course from './Course';
import Redirect from "react-router-dom/es/Redirect";
import Notfound from "../../components/siswa/Notfound";

class route extends Component {


  render() {
    if (this.props.isLogin) {
      return (
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/course" component={CourseList}/>
          <Route exact path="/achievement" component={Achievement}/>
          <Route path="/course/:courseid" component={CourseDetail}/>
          <Route path="/play/:stageid" component={Course}/>

        </Switch>
      );
    } else {
      return <Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }
      }} />
    }
  }
}

const mapStateToProps = state => ({
  isLogin: state.users.loggedIn,
});

export default connect(
  mapStateToProps,
  null,
)(route);
