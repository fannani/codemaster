/* eslint-disable  */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CourseList from '../../containers/siswa/CourseList';
import CourseDetail from '../../containers/siswa/CourseDetail';
import Dashboard from '../../containers/siswa/Dashboard';

class Content extends Component {
  render() {
    return (
      <main className="col-9 main-container">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/course" component={CourseList} />
          <Route path="/course/:courseid" component={CourseDetail} />
        </Switch>
      </main>
    );
  }
}

export default Content;
