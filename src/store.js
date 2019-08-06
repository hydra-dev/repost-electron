import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    auth: null,
    settings: {
      api_url: null
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
  },
  plugins: [vuexLocal.plugin]
})
