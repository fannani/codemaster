import { Route, Switch } from 'react-router-dom';
import React, { lazy } from 'react';
import Login from '../containers/siswa/Login';
import Register from '../containers/siswa/Register';
import ChildRoute from '../containers/siswa/ChildRoute';
const Dashboard = lazy(() => import('../containers/siswa/Dashboard'));
const CourseList = lazy(() => import('../containers/siswa/CourseList'));
const Achievement = lazy(() => import('../containers/siswa/Achievement'));
const CourseDetail = lazy(() => import('../containers/siswa/CourseDetail'));
const Course = lazy(() => import('../containers/siswa/Course'));
const Friends = lazy(() => import('../containers/siswa/Friends'));
const Settings = lazy(() => import('../containers/siswa/Settings'));

const RouteComp = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ChildRoute>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/course" component={CourseList} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/achievement" component={Achievement} />
        <Route exact path="/friends" component={Friends} />
        <Route path="/course/:courseid" component={CourseDetail} />
        <Route path="/play/:stageid" component={Course} />
      </ChildRoute>
    </Switch>
  );
};
export default RouteComp;
