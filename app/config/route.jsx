import { Route, Switch } from 'react-router-dom';
import React, { lazy } from 'react';
import LoginSiswa from '../containers/siswa/Login';
import LoginAdmin from '../containers/admin/Login';
import Register from '../containers/siswa/Register';
import SiswaProtect from '../containers/siswa/Protect';
import AdminProtect from '../containers/admin/Protect';

const Dashboard = lazy(() => import('../containers/siswa/Dashboard'));
const CourseList = lazy(() => import('../containers/siswa/CourseList'));
const Achievement = lazy(() => import('../containers/siswa/Achievement'));
const CourseDetail = lazy(() => import('../containers/siswa/CourseDetail'));
const CourseSiswa = lazy(() => import('../containers/siswa/Course'));
const Friends = lazy(() => import('../containers/siswa/Friends'));
const Settings = lazy(() => import('../containers/siswa/Settings'));
const Log = lazy(() => import('../containers/admin/Log'));
const CourseAdmin = lazy(() => import('../containers/admin/Course'));
const StageList = lazy(() => import('../containers/admin/StageList'));
const Stage = lazy(() => import('../containers/admin/Stage'));
const Mission = lazy(() => import('../containers/admin/Mission'));
const TestCase = lazy(() => import('../containers/admin/TestCase'));

export const RouteSiswa = () => (
  <Switch>
    <Route path="/login" component={LoginSiswa} />
    <Route path="/register" component={Register} />
    <SiswaProtect>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/course" component={CourseList} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/achievement" component={Achievement} />
      <Route exact path="/friends" component={Friends} />
      <Route path="/course/:courseid" component={CourseDetail} />
      <Route path="/play/:stageid" component={CourseSiswa} />
    </SiswaProtect>
  </Switch>
);
export const RouteAdmin = () => (
  <Switch>
    <Route path="/admin/login" component={LoginAdmin} />
    <AdminProtect>
      <Route exact path="/admin/log" component={Log} />
      <Route exact path="/admin/course" component={CourseAdmin} />
      <Route exact path="/admin/testcase" component={TestCase} />
      <Route exact path="/admin/course/:courseid" component={StageList} />
      <Route exact path="/admin/stage/:stageid" component={Stage} />
      <Route exact path="/admin/mission/:missionid" component={Mission} />
    </AdminProtect>
  </Switch>
);
