import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import LoadingScreen from './components/LoadingScreen';
import { API_URL } from './config/config';

const AdminApp = lazy(() => import('./pages/admin/App'));
const SiswaApp = lazy(() => import('./pages/siswa/App'));
const WebLayout = lazy(() => import('./pages/web/Layout'));

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
      uri: API_URL,
    }),
  ]),
  cache: new InMemoryCache(),
});

const getUserConfirmation = (dialogKey, callback) => {
  const dialogTrigger = window[Symbol.for(dialogKey)];
  if (dialogTrigger) return dialogTrigger(callback);
  callback(true);
};

let Container = () => (
  <ApolloProvider client={client}>
    <BrowserRouter getUserConfirmation={getUserConfirmation}>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route path="/(|tentang|pelajari)" exact component={WebLayout} />
          <Route path="/admin" component={AdminApp} />
          <Route path="/" component={SiswaApp} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </ApolloProvider>
);

if (process.env.MODE === 'development') {
  Container = hot(Container);
}

export default Container;
