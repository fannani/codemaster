/* eslint-disable */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import Layout from './containers/siswa/Layout';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/',
});

const Siswa = ({ store }) => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);

Siswa.propTypes = {
  store: PropTypes.object.isRequired,
};

export default hot(Siswa);
