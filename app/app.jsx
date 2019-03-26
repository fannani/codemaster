import ReactDOM from 'react-dom';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Container from './Container';
import './bootstrap';

library.add(faBars);

if (document.getElementById('app')) {
  ReactDOM.render(<Container />, document.getElementById('app'));
}
