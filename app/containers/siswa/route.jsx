import React, { Component, Suspense, lazy } from 'react';
import connect from 'react-redux/es/connect/connect';
import Redirect from 'react-router-dom/es/Redirect';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import LoadingScreen from '../../components/LoadingScreen';
const Dashboard = lazy(() => import('./Dashboard'));
const CourseList = lazy(() => import('./CourseList'));
const Achievement = lazy(() => import('./Achievement'));
const CourseDetail = lazy(() => import('./CourseDetail'));
const Course = lazy(() => import('./Course'));

class route extends Component {
  render() {
    if (this.props.isLogin) {
      return (
        <Suspense fallback={<LoadingScreen/>}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/course" component={CourseList} />
            <Route exact path="/achievement" component={Achievement} />
            <Route path="/course/:courseid" component={CourseDetail} />
            <Route path="/play/:stageid" component={Course} />
          </Switch>
        </Suspense>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location },
          }}
        />
      );
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
