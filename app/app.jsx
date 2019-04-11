import ReactDOM from 'react-dom';
import React from 'react';
import firebase from 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Container from './Container';
import './assets/styles/app.scss';
import 'bootstrap';

const config = {
  apiKey: 'AIzaSyAp6n4l5KsgTi4UCWJCFtRyQU-R_PLOUkU',
  authDomain: 'kodekurawal-ab777.firebaseapp.com',
  databaseURL: 'https://kodekurawal-ab777.firebaseio.com',
  projectId: 'kodekurawal-ab777',
  storageBucket: 'kodekurawal-ab777.appspot.com',
  messagingSenderId: '714027380697',
};
firebase.initializeApp(config);

window.Popper = require('popper.js').default;
window.$ = require('jquery');
window.axios = require('axios');

window.jQuery = window.$;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

library.add(faBars);

if (document.getElementById('app')) {
  ReactDOM.render(<Container />, document.getElementById('app'));
}
