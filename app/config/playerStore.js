import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/siswaReducer';
import storage from 'redux-persist/lib/storage'
import { persistStore,persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  blacklist : ['gameplay']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
const persistor = persistStore(store);
export default {
  store,persistor
};
