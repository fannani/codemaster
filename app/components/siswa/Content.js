import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import CourseList from "../../containers/siswa/CourseList";
import Stage from "../../containers/siswa/Stage";

class Content extends Component {
    render() {
        return (
            <main className="col-9 ">
                <Switch>
                    <Route exact path="/course" component={CourseList} />
                    <Route path="/stages/:stageid" component={Stage} />
                </Switch>
            </main>
        );
    }
}

export default Content;
