
import React from "react";
import adminStore from './config/adminStore';
import ReactDOM from "react-dom";
import Admin from "./admin";


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */



const store = adminStore();

if (document.getElementById('app')) {
    ReactDOM.render(<Admin store={store} />, document.getElementById('app'));
}
