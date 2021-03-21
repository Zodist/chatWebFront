import Constant from '../../Constant';

const state = {
  msgDatas: [],
  userCnt: 0,
};

// getters
const getters = {
  "getUserCnt": ($state) => {
    return $state.userCnt;
  }
};

// actions
const actions = {
  "setUserCnt": ({commit}, id) => {
    commit('setUserCnt', id);
  },
};

// mutations
const mutations = {
  [Constant.PUSH_MSG_DATA]: ($state, $payload) => {
    $state.msgDatas.push($payload);
  },
  "setUserCnt": ($state, $payload) => {
    $state.userCnt = $payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
