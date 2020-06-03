import * as types from '../mutation-types'
const home = {
  state: {
    test: 0
  },
  mutations: {
    [types.SET_TEST] (state, t) {
      state.test = t
    }
  },
  actions: {
  }
}

export default home
