import Header from "../../components/admin/Header"
import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";



const Layout = () => (
    <div>
        <Header />
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
    </div>
);
export default Layout;
