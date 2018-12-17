/* eslint-disable */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import Layout from './containers/siswa/Layout';

const Siswa = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>
);

Siswa.propTypes = {
  store: PropTypes.object.isRequired,
};

export default hot(Siswa);
