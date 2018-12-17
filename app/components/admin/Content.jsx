/* eslint-disable  */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Log from '../../containers/admin/Log';
import Course from '../../containers/admin/Course';
import StageList from '../../containers/admin/StageList';
import Stage from '../../containers/admin/Stage';
import AddMission from '../../containers/admin/AddMission';

class Content extends Component {
  render() {
    return (
      <main className="col-9 ">
        <Switch>
          <Route exact path="/admin/log" component={Log} />
          <Route exact path="/admin/course" component={Course} />
          <Route exact path="/admin/course/:courseid" component={StageList} />
          <Route exact path="/admin/stage/:stageid" component={Stage} />
          <Route
            exact
            path="/admin/stage/:stageid/addmission"
            component={AddMission}
          />
        </Switch>
      </main>
    );
  }
}

export default Content;
