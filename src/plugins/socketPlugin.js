import Vue from 'vue';
import io from 'socket.io-client';
import Store from '../store/index';

var socket;
const socketURL = 'http://ec2-3-84-249-206.compute-1.amazonaws.com:3001'; // PROD
// const socketURL = 'http://localhost:3001'; // PROD

const SocketPlugin = {
  install(vue) {
    vue.mixin({
    });

    vue.prototype.$sendMessage = ($payload) => {
      socket.emit('chat', {
        msg: $payload.msg,
        name: $payload.name,
        roomName: $payload.roomName,
      });
    };

    vue.prototype.$connectWS = () => {
      socket = io(socketURL);

      socket.on("chat", (data) => {
        Store.commit("pushMsgData", data);
      });

      socket.on("joinedRooms", (data) => {
        var items = [];
        data.forEach((element) => {
          items.push({
            avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            title: element.roomName,
            userCnt: element.userCnt,
            subtitle: "", //'<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          });
          items.push({
            divider: true,
            inset: true,
          });
        });

        Store.commit("setJoinedRooms", items);
      });

      socket.on("availableRooms", (data) => {
        var items = [];
        data.forEach((element) => {
          items.push({
            avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            title: element.roomName,
            userCnt: element.userCnt,
            subtitle: "", //'<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          });
          items.push({
            divider: true,
            inset: true,
          });
        });

        Store.commit("setAvailableRooms", items);
      });

      socket.on("updateUserCntInRoom", (data) => {
        Store.commit("updateUserCntInRoom", data);
      });

      vue.prototype.$socket = socket;
      return Promise.resolve();

    }

    // 인스턴스 메소드 추가
    vue.prototype.$socket = socket;
  },
};

Vue.use(SocketPlugin);
