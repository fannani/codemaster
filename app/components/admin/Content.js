import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Log from "../../containers/admin/Log";


class Content extends Component {
    render() {
        return (
            <main className="col-9 ">
                <Switch>
                    <Route exact path="/log" component={Log} />
                </Switch>
            </main>
        );
    }
}

export default Content;
