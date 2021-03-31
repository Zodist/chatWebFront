const state = {
  flag: false,
  text: "",
};

// getters
const getters = {
  "getFlag": ($state) => {
    return $state.flag;
  },
  "getText": ($state) => {
    return $state.text;
  },
};

// actions
const actions = {
  "onGlobalAlert": ({commit}, $payload) => {
    commit('showGlobalAlert', $payload);
  },
  "offGlobalAlert": ({commit}) => {
    commit('showGlobalAlert');
  },
};

// mutations
const mutations = {
  "onGlobalAlert": ($state, $payload) => {
    $state.text = $payload;
    $state.flag = true;
  },
  "offGlobalAlert": ($state) => {
    $state.flag = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
