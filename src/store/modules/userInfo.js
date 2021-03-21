const state = {
  userInfo: {
    id: "",
    password: "",
    name: "",
  },
};

// getters
const getters = {
  "getUserId": ($state) => {
    return $state.userInfo.id;
  },
  "getUserName": ($state) => {
    return $state.userInfo.name;
  },
};

// actions
const actions = {
  "setUserId": ({commit}, userInfo) => {
    commit('setUserId', userInfo);
  },
};

// mutations
const mutations = {
  "setUserId": ($state, $payload) => {
    $state.userInfo = $payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
