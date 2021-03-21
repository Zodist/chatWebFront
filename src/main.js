import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import axios from 'axios'

// custom plugin
import './plugins/socketPlugin';
import Directives from './plugins/directives';
import './assets/_common.scss';

Vue.config.productionTip = false;
Vue.use(Directives);

Vue.prototype.$http = axios

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
