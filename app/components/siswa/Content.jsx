/* eslint-disable  */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CourseList from '../../containers/siswa/CourseList';
import CourseDetail from './CourseDetail';

class Content extends Component {
  render() {
    return (
      <main className="col-9 main-container">
        <Switch>
          <Route exact path="/course" component={CourseList} />
          <Route path="/course/:courseid" component={CourseDetail} />
        </Switch>
      </main>
    );
  }
}

export default Content;
