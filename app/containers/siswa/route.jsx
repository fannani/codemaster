import React, { Suspense, lazy } from 'react';
import connect from 'react-redux/es/connect/connect';
import Redirect from 'react-router-dom/es/Redirect';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import PropTypes from 'prop-types';
import LoadingScreen from '../../components/LoadingScreen';

const Dashboard = lazy(() => import('./Dashboard'));
const CourseList = lazy(() => import('./CourseList'));
const Achievement = lazy(() => import('./Achievement'));
const CourseDetail = lazy(() => import('./CourseDetail'));
const Course = lazy(() => import('./Course'));
const Friends = lazy(() => import('./Friends'));

const route = ({ isLogin, location }) => {
  if (isLogin) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route exact path="/" render={() => <Dashboard />} />
          <Route exact path="/course" render={() => <CourseList />} />
          <Route exact path="/achievement" render={() => <Achievement />} />
          <Route exact path="/friends" render={() => <Friends />} />
          <Route path="/course/:courseid" render={() => <CourseDetail />} />
          <Route path="/play/:stageid" render={() => <Course />} />
        </Switch>
      </Suspense>
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
};

route.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  location: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  isLogin: state.users.loggedIn,
});

export default connect(
  mapStateToProps,
  null,
)(route);
