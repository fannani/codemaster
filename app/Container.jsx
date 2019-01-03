/* eslint-disable */
import React, { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import LoadingScreen from './components/LoadingScreen';
import { Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import { PersistGate } from 'redux-persist/integration/react';
const SiswaLayout = lazy(() => import('./containers/siswa/Layout'));
const AdminLayout = lazy(() => import('./containers/admin/Layout'));

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
      uri: 'http://localhost:3000/api/',
    }),
  ]),
  cache: new InMemoryCache(),
});

const Container = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Switch>
              <Route path="/admin" component={AdminLayout} />
              <Route path="/" component={SiswaLayout} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </ApolloProvider>
    </PersistGate>
  </Provider>
);

Container.propTypes = {
  store: PropTypes.object.isRequired,
};

export default hot(Container);