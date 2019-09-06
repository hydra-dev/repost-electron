import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import { EventBus } from './event-bus'

import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

Vue.use(Vuelidate)

import axios from 'axios';

/**
 * We create two axios instances. One that catches every error 
 * The other that does not. We need this second one, such that we can implement our own offline behavior. In some cases we have that
 * in other cases, we just want to show a generic error message. 
 */
const uncaughtExceptionInstance = axios.create({
  timeout: 5000,
})

// Fetch the base url prior to every request
uncaughtExceptionInstance.interceptors.request.use(request => {
  const baseUrl = store.getters.getBaseUrl;
  request.url = baseUrl + request.url;
  return request; 
})

Vue.prototype.$uncaughtHttp = uncaughtExceptionInstance;

const defaultInstance = axios.create({
  timeout: 5000,
})

// Fetch the base url prior to every request
defaultInstance.interceptors.request.use(request => {
  const baseUrl = store.getters.getBaseUrl;
  request.url = baseUrl + request.url;
  return request; 
})

// Set an interceptor for errors
defaultInstance.interceptors.response.use(response => {
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

Vue.prototype.$http = defaultInstance

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
