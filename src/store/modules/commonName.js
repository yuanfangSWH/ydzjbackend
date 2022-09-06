
const state = {
  showCitySelectBox: false
}

const mutations = {
  SHOWCITYSELECTBOX: (state, value) => {
    state.showCitySelectBox = value
  }
}

const actions = {
  showCitySelect({ commit }, value) {
    commit('SHOWCITYSELECTBOX', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

