import React from "react";
import { BrowserRouter , Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Layout from "./containers/siswa/Layout"
import PropTypes from 'prop-types';
import siswaStore from './config/siswaStore';

const Siswa = ({store}) => (
    <Provider store={store}>
        <BrowserRouter basename="/belajarkode/public/siswa" >
            <Layout />
        </BrowserRouter>
    </Provider>
);

Siswa.propTypes = {
    store: PropTypes.object.isRequired
}

const store = siswaStore();

if (document.getElementById('app')) {
    ReactDOM.render(<Siswa store={store} />, document.getElementById('app'));
}
