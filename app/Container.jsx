import React, { lazy, Suspense, useState, useReducer } from 'react';
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

const reducer = (state, action) => {
  const { gameplay } = state;
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: action.isLogin,
        user: action.user,
      };
    case 'UPDATE_TIMER':
      let sec = gameplay.currentTimer;
      let min = 0;
      let secStr;
      let minStr;
      if (sec > 59) {
        min = Math.floor(sec / 60);
        sec %= 60;
      }
      if (sec < 10) {
        secStr = `0${sec}`;
      } else {
        secStr = sec;
      }
      if (min < 10) {
        minStr = `0${min}`;
      } else {
        minStr = min;
      }

      return {
        ...state,
        gameplay: {
          ...gameplay,
          currentTimer: gameplay.currentTimer + 1,
          timerText: `${minStr}:${secStr}`,
        },
      };
    case 'RESET_TIMER':
      return {
        ...state,
        gameplay: { ...gameplay, currentTimer: 0, timerText: '00:00' },
      };
    case 'SET_PLAYER_STATUS':
      return {
        ...state,
        gameplay: { ...gameplay, life: action.life, score: action.score },
      };
    case 'SET_PLAY_MODE':
      return { ...state, gameplay: { ...gameplay, play: action.play } };
    default:
      return state;
  }
};

let Container = ({ store, persistor }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
