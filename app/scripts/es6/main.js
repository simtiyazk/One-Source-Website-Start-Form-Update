import $ from 'jquery';
import 'babel-polyfill';
import nav from './modules/nav';
import signUpForm from './modules/sign-up/form';

//Vendors
require('bootstrap/dist/js/bootstrap.min.js');
require('bootstrap-select');
//end vendors
$(() => {
  nav();
  signUpForm();
});
