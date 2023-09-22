
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import './assets/main.scss'

// // Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// import * as labsComponents from 'vuetify/labs/components'

// const vuetify = createVuetify({
//   labsComponents,
//   components,
//   directives,
// })

// createApp(App).use(router).use(vuetify).mount('#app')
import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

new Vue({
  render: (h) => h(App),
}).$mount('#app');