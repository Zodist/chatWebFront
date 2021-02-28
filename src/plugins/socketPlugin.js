import Vue from 'vue';
import io from 'socket.io-client';

//const socket = io('http://localhost:3001');
const socket = io('http://ec2-3-84-249-206.compute-1.amazonaws.com:3001/char-room/hithere:3001');

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

    // 인스턴스 메소드 추가
    vue.prototype.$socket = socket;
  },
};

Vue.use(SocketPlugin);
