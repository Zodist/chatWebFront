import Vue from 'vue';
import io from 'socket.io-client';

var socket;
// const socketURL = 'http://ec2-3-84-249-206.compute-1.amazonaws.com:3001'; // PROD
const socketURL = 'http://localhost:3001'; // PROD

const SocketPlugin = {
  install(vue) {
    vue.mixin({
    });

    vue.prototype.$sendMessage = ($payload) => {
      socket.emit('chat', {
        msg: $payload.msg,
        name: $payload.name,
      });
    };

    vue.prototype.$connect = () => {
      socket = io(socketURL);
      vue.prototype.$socket = socket;
      return Promise.resolve();
    }

    // 인스턴스 메소드 추가
    vue.prototype.$socket = socket;
  },
};

Vue.use(SocketPlugin);
