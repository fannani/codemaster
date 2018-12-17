/* eslint-disable */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import Layout from './containers/admin/Layout';

const Admin = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>
);

Admin.propTypes = {
  store: PropTypes.object.isRequired,
};

export default hot(Admin);
