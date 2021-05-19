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
    config.headers.Authorization = localStorage.getItem("access_token");
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
    console.log("### Error In Interceptor ###")
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status == 401) {
        store.commit("onGlobalAlert", "권한이 없습니다.");
        router.push({ name: "Login" });
      }
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      console.log(error.request);
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }
    console.log(error.config);
    console.log("### Error In Interceptor ###")

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
