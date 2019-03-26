import React, { useReducer } from 'react';
import Layout from './Layout';
import AppPersist from '../../components/AppPersist';
import { initialState, reducer } from '../../reducers/siswaReducer';
import { ContextProvider } from '../../utils/context';

const localData = localStorage.getItem('app:persist');

const App = () => (
  <ContextProvider
    value={useReducer(
      reducer,
      localData == null ? initialState : JSON.parse(localData),
    )}
  >
    <AppPersist>
      <Layout />
    </AppPersist>
  </ContextProvider>
);

export default App;
