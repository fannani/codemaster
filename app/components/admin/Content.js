import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Log from "../../containers/admin/Log";
import Course from "../../containers/admin/Course";


class Content extends Component {
    render() {
        return (
            <main className="col-9 ">
                <Switch >
                    <Route exact path="/admin/log" component={Log} />
                    <Route exact path="/admin/course" component={Course} />
                </Switch>
            </main>
        );
    }
}

export default Content;
