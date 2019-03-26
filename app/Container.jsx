import React, { lazy, Suspense, useReducer } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import LoadingScreen from './components/LoadingScreen';
import AppPersist from './components/AppPersist';
import reducer from './reducers/reducer';
import { API_URL } from './config/config';
import { ContextProvider } from './utils/context';

const SiswaLayout = lazy(() => import('./containers/siswa/Layout'));
const AdminLayout = lazy(() => import('./containers/admin/Layout'));
const WebLayout = lazy(() => import('./containers/web/Layout'));

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

const initialState =
  localStorage.getItem('app:persist') == null
    ? {
        isLogin: false,
        user: { userdetail: { energy: 0 } },
        gameplay: {
          currentTimer: 0,
          life: 0,
          score: 0,
          timerText: '00:00',
          play: false,
        },
      }
    : JSON.parse(localStorage.getItem('app:persist'));

let Container = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter getUserConfirmation={getUserConfirmation}>
        <Suspense fallback={<LoadingScreen />}>
          <ContextProvider value={useReducer(reducer, initialState)}>
            <AppPersist>
              <Switch>
                <Route
                  path="/(|tentang|pelajari)"
                  exact
                  component={WebLayout}
                />
                <Route path="/admin" component={AdminLayout} />
                <Route path="/" component={SiswaLayout} />
              </Switch>
            </AppPersist>
          </ContextProvider>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  );
};

if (process.env.MODE === 'development') {
  Container = hot(Container);
}

export default Container;
