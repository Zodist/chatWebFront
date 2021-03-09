const state = {
  userId: "",
};

// getters
const getters = {
  "getUserId": ($state) => {
    return $state.userId;
  }
};

// actions
const actions = {
};

// mutations
const mutations = {
  "setUserId": ($state, $payload) => {
    $state.userId = $payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
