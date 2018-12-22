/* eslint-disable */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import Layout from './containers/admin/Layout';
import PropTypes from 'prop-types';
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new createUploadLink({
      uri: "http://localhost:3000/api/"
    })
  ]),
  cache: new InMemoryCache()
});

const Admin = ({ store }) => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);

Admin.propTypes = {
  store: PropTypes.object.isRequired,
};

export default hot(Admin);
