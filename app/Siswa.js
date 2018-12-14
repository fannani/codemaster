import React from "react";
import { BrowserRouter , Route, Link } from "react-router-dom";

import { Provider } from 'react-redux';
import Layout from "./containers/siswa/Layout"
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader/root'

const Siswa = ({store}) => (
    <Provider store={store}>
        <BrowserRouter  >
            <Layout />
        </BrowserRouter>
    </Provider>
);

Siswa.propTypes = {
    store: PropTypes.object.isRequired
}

export default hot(Siswa);
