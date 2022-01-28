import Vue from 'vue';
import { store } from './_store';
import { router } from './_helpers';
import alertBox from './component/Alert';
import App from './app/App';
import './lib/validation';
import './assets/scss/style.scss';

Vue.component('alert-box', alertBox, { name: 'alert-box' });

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
