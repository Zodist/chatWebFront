import Constant from '../../Constant';

const state = {
  msgDatas: [],
  // userCnt: 0,
  rooms: [],
};

// getters
const getters = {
  "getUserCnt": ($state) => {
    return $state.userCnt;
  },
  getMsgByRoomName: ($state) => (roomName) => {
    return $state.msgDatas.filter((el) => {
      return el.roomName === roomName
    });
  },
  getRooms: ($state) => {
    return $state.rooms;
  },
};

// actions
const actions = {
  [Constant.PUSH_MSG_DATA]: ({commit}, $payload) => {
    commit([Constant.PUSH_MSG_DATA], $payload);
  },
  // "setUserCnt": ({commit}, id) => {
  //   commit('setUserCnt', id);
  // },
  "setRooms": ({commit}, $payload) => {
    commit('setRooms', $payload);
  },
};

// mutations
const mutations = {
  [Constant.PUSH_MSG_DATA]: ($state, $payload) => {
    if ($state.msgDatas.length !== 0 &&
      $state.msgDatas[$state.msgDatas.length - 1].from.name === $payload.from.name &&
      $state.msgDatas[$state.msgDatas.length - 1].time === $payload.time) {
        $state.msgDatas[$state.msgDatas.length - 1].msg.push($payload.msg[0])
    } else {
      $state.msgDatas.push($payload);
    }
  },
  // "setUserCnt": ($state, $payload) => {
  //   $state.userCnt = $payload;
  // },
  "setRooms": ($state, $payload) => {
    $state.rooms = $payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
