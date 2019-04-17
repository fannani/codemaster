import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import LoadingScreen from './components/UI/LoadingScreen';
import { API_URL } from './config/config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminApp = lazy(() => import('./components/admin/App'));
const SiswaApp = lazy(() => import('./components/siswa/App'));
const WebLanding = lazy(() => import('./pages/web/Landing'));

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
          <Route path="/(|tentang|pelajari)" exact component={WebLanding} />
          <Route path="/admin" component={AdminApp} />
          <Route path="/" component={SiswaApp} />
        </Switch>
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  </ApolloProvider>
);

if (process.env.MODE === 'development') {
  Container = hot(Container);
}

export default Container;
