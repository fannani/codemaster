import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Level from "../../containers/siswa/Level";
import Stage from "../../containers/siswa/Stage";

class Content extends Component {
    render() {
        return (
            <main className="col-9 ">
                <Switch>
                    <Route exact path="/level" component={Level} />
                    <Route path="/stages/:stageid" component={Stage} />
                </Switch>
            </main>
        );
    }
}

export default Content;
