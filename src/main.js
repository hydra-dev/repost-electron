import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import { EventBus } from './event-bus'

Vue.use(Vuelidate)

import axios from 'axios';
const instance = axios.create({
  timeout: 1000,
})

// Fetch the base url prior to every request
instance.interceptors.request.use(request => {
  const baseUrl = store.getters.getBaseUrl;
  request.url = baseUrl + request.url;
  return request; 
})

// Set an interceptor for errors
instance.interceptors.response.use(response => {
  return response;
}, error => {
  let errorMessage = 'Unknown error'
  if (error.response) {
    errorMessage = `${error.response.status} - ${error.message}`
  } else {
    errorMessage = `${error.message}`
  }

  EventBus.$emit('snackbar', {
    text: errorMessage
  })
  return error;
})

Vue.prototype.$http = instance

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
