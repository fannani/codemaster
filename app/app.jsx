import ReactDOM from 'react-dom';
import React from 'react';
import Container from './Container';
import store from './config/store';

require('./bootstrap');


if (document.getElementById('app')) {
  ReactDOM.render(<Container store={store.store} persistor={store.persistor}/>, document.getElementById('app'));
}




