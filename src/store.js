import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from "vuex-electron"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null,
    settings: {
      api_url: 'https://repost-demo.appspot.com'
    },
    lastSyncAt: null,
  },
  getters: {
    getBaseUrl(state){
      return state.settings.api_url
    },

    getLastSyncAt(state){
      return state.lastSyncAt;
    }
  },
  mutations: {
    login(state, token) {
      console.log(token);
    },

    updateSettings(state, settings){
      state.settings = settings;
    },

    updateLastSyncAt(state) {
      const now = new Date();
      state.lastSyncAt = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`
    }
  },
  actions: {
    updateSettings(context, settings) {
      context.commit('updateSettings', settings);
    },

    updateLastSyncAt(context) {
      context.commit('updateLastSyncAt');
    }
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ]
})
