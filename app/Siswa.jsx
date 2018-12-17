import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

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
