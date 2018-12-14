
import React from "react";
import { BrowserRouter , Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import Layout from "./containers/admin/Layout"
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root'



const Admin = ({store}) => (
    <Provider store={store}>
        <BrowserRouter  >
            <Layout />
        </BrowserRouter>
    </Provider>
);

Admin.propTypes = {
    store: PropTypes.object.isRequired
}

export default hot(Admin);

