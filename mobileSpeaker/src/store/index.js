import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex)

const storeConfig = {
  state: state,

  getters: getters,

  mutations: mutations,

  actions: actions,

  modules: modules
}

export default new Vuex.Store(storeConfig)
