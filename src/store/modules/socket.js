import Constant from '../../Constant';

const state = {
  msgDatas: [],
  joinedRooms: [],
  availableRooms: [],
};

// getters
const getters = {
  getLastMsgDateByRoomName: ($state) => (roomName) => {
    var msgs = $state.msgDatas.filter((el) => {
      return el.roomName === roomName
    });
    if (msgs.length === 0) return "";

    var msgObj = msgs[msgs.length - 1];
    return msgObj.time;
  },
  getLastMsgByRoomName: ($state) => (roomName) => {
    var msgs = $state.msgDatas.filter((el) => {
      return el.roomName === roomName
    });
    if (msgs.length === 0) return "";

    var msgObj = msgs[msgs.length - 1].msg;
    return msgObj[msgObj.length - 1].content;
  },
  getUnReadMsgCntByRoomName: ($state) => (roomName) => {
    var msgs = $state.msgDatas.filter((el) => {
      return el.roomName === roomName
    });
    var cnt = 0;
    for (var i = 0; i < msgs.length; i++) {
      for (var j = 0; j < msgs[i].msg.length; j++) {
        if (!msgs[i].msg[j].read) {
          cnt++;
        }
      }
    }
    return cnt;
  },
  getMsgByRoomName: ($state) => (roomName) => {
    return $state.msgDatas.filter((el) => {
      return el.roomName === roomName
    });
  },
  getJoinedRooms: ($state) => {
    return $state.joinedRooms;
  },
  getAvailableRooms: ($state) => {
    return $state.availableRooms;
  },
};

// actions
const actions = {
  [Constant.PUSH_MSG_DATA]: ({ commit }, $payload) => {
    commit([Constant.PUSH_MSG_DATA], $payload);
  },
  "setJoinedRooms": ({ commit }, $payload) => {
    commit('setJoinedRooms', $payload);
  },
  "setAvailableRooms": ({ commit }, $payload) => {
    commit('setAvailableRooms', $payload);
  },
  "updateUserCntInRoom": ({ commit }, $payload) => {
    commit('updateUserCntInRoom', $payload);
  },
  "readMsgs": ({ commit }, $payload) => {
    commit('updateUserCntInRoom', $payload);
  },
};

// mutations
const mutations = {
  [Constant.PUSH_MSG_DATA]: ($state, $payload) => {
    if ($state.msgDatas.length !== 0 &&
      $state.msgDatas[$state.msgDatas.length - 1].from.name === $payload.from.name &&
      $state.msgDatas[$state.msgDatas.length - 1].time === $payload.time) {
      $state.msgDatas[$state.msgDatas.length - 1].msg.push({ content: $payload.msg[0], read: false })
    } else {
      var msg = {
        from: $payload.from,
        msg: [{
          content: $payload.msg[0],
          read: false,
        }],
        time: $payload.time,
        roomName: $payload.roomName,
      };
      $state.msgDatas.push(msg);
    }
  },
  "setJoinedRooms": ($state, $payload) => {
    $state.joinedRooms = $payload;
  },
  "setAvailableRooms": ($state, $payload) => {
    $state.availableRooms = $payload;
  },
  "updateUserCntInRoom": ($state, $payload) => {
    for (var i = 0; i < $state.joinedRooms.length; i++) {
      if ($state.joinedRooms[i].title === $payload.roomName) {
        $state.joinedRooms[i].userCnt = $payload.userCnt;
        break;
      }
    }
  },
  "readMsgs": ($state, roomName) => {
    $state.msgDatas.forEach(msg => {
      if (msg.roomName === roomName) {
        msg.msg.forEach(element => {
          element.read = true;
        });
      }
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
