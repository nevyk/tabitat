import Vue from 'vue';
import App from './App';
import vuetify from '../plugins/vuetify';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  render: h => h(App),
});
