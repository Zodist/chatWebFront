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

// axios set indicator
// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    // ...
    store.commit('setGlobalIndicator', true);
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    store.commit('setGlobalIndicator', false);
    return Promise.reject(error);
  });

// 응답 인터셉터 추가
axios.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    // ...
    setTimeout(() => {
      
      store.commit('setGlobalIndicator', false);
    }, 500);
    return response;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    store.commit('setGlobalIndicator', false);
    return Promise.reject(error);
  });

Vue.prototype.$http = axios

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
