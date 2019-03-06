import ReactDOM from 'react-dom';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Container from './Container';
import store from './config/store';
import './bootstrap';

library.add(faBars);

if (document.getElementById('app')) {
  ReactDOM.render(
    <Container store={store.store} persistor={store.persistor} />,
    document.getElementById('app'),
  );
}
