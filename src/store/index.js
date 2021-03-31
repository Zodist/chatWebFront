import Vue from 'vue';
import Vuex from 'vuex';
import socket from './modules/socket';
import userInfo from './modules/userInfo';
import globalAlert from './modules/globalAlert';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    socket,
    userInfo,
    globalAlert
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
