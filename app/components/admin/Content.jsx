import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';

const Log = lazy(() => import('../../containers/admin/Log'));
const Course = lazy(() => import('../../containers/admin/Course'));
const StageList = lazy(() => import('../../containers/admin/StageList'));
const Stage = lazy(() => import('../../containers/admin/Stage'));
const Mission = lazy(() => import('../../containers/admin/Mission'));
const TestCase = lazy(() => import('../../containers/admin/TestCase'));

const Content = () => (
  <main className="col-9 ">
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route exact path="/admin/log" component={Log} />
        <Route exact path="/admin/course" component={Course} />
        <Route exact path="/admin/testcase" component={TestCase} />
        <Route exact path="/admin/course/:courseid" component={StageList} />
        <Route exact path="/admin/stage/:stageid" component={Stage} />
        <Route exact path="/admin/mission/:missionid" component={Mission} />
      </Switch>
    </Suspense>
  </main>
);

export default Content;
