import ReactDOM from 'react-dom';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Container from './Container';
import './assets/styles/app.scss';

window.Popper = require('popper.js').default;
window.$ = require('jquery');
window.axios = require('axios');

window.jQuery = window.$;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

library.add(faBars);

if (document.getElementById('app')) {
  ReactDOM.render(<Container />, document.getElementById('app'));
}
