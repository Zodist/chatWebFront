const state = {
  flag: false,
};

// getters
const getters = {
  "getGlobalLoadingFlag": ($state) => {
    return $state.flag;
  },
};

// actions
const actions = {
  "setGlobalIndicator": ({ commit }, $payload) => {
    commit('setGlobalIndicator', $payload);
  },
};

// mutations
const mutations = {
  "setGlobalIndicator": ($state, $payload) => {
    $state.flag = $payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

