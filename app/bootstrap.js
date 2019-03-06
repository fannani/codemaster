import './assets/styles/app.scss';
import 'bootstrap';

window.Popper = require('popper.js').default;
window.$ = require('jquery');
window.axios = require('axios');

window.jQuery = window.$;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
