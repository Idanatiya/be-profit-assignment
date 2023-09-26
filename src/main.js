import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './main.scss'

Vue.use(Buefy)

export const vm = new Vue({
  render: (h) => h(App)
}).$mount('#app')
