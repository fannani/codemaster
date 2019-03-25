import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingScreen from './components/LoadingScreen';
import { API_URL } from './config/config';
import { ContextProvider } from './utils/context';
import AppPersist from './components/AppPersist';

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

let Container = ({ store, persistor }) => {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={client}>
            <BrowserRouter getUserConfirmation={getUserConfirmation}>
              <Suspense fallback={<LoadingScreen />}>
                <ContextProvider
                  value={{
                    user,
                    setUser,
                    isLogin,
                    setIsLogin,
                    loadingLocal,
                    setLoadingLocal,
                  }}
                >
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
        </PersistGate>
      </Provider>
    </>
  );
};

Container.propTypes = {
  store: PropTypes.object.isRequired,
  persistor: PropTypes.any.isRequired,
};

if (process.env.MODE === 'development') {
  Container = hot(Container);
}

export default Container;
