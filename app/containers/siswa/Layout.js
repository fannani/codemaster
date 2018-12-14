import Header from "../../components/siswa/Header"
import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import Course from "./Course";


const Layout = () => (
    <div>
        <Header />
        <Switch>
            <Route path="/stage/:stageid" component={Course} />
            <Route path="/" component={Home} />
        </Switch>
    </div>
);
export default Layout;
