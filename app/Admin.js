
import React from "react";
import { BrowserRouter , Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Layout from "./containers/admin/Layout"
import PropTypes from 'prop-types';
import adminStore from './config/adminStore';


const Admin = ({store}) => (
    <Provider store={store}>
        <BrowserRouter basename="/belajarkode/public/admin" >
            <Layout />
        </BrowserRouter>
    </Provider>
);

Admin.propTypes = {
    store: PropTypes.object.isRequired
}

const store = adminStore();

if (document.getElementById('app')) {
    ReactDOM.render(<Admin store={store} />, document.getElementById('app'));
}
