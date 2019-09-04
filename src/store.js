import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from "vuex-electron"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null,
    settings: {
      api_url: 'https://repost-demo.appspot.com'
    }
  },
  getters: {
    getBaseUrl(state){
      return state.settings.api_url
    }
  },
  mutations: {
    login(state, token) {
      console.log(token);
    },

    updateSettings(state, settings){
      state.settings = settings;
    }
  },
  actions: {
    updateSettings(context, settings) {
      context.commit('updateSettings', settings);
    }
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ]
})
