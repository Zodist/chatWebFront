import Vue from 'vue';
import Vuex from 'vuex';
import socket from './modules/socket';
import userInfo from './modules/userInfo';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    socket,
    userInfo
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
