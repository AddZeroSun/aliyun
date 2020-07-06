import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components'
import '@/assets/styles/base.scss'
import '@/assets/styles/common.scss'
import '@/assets/styles/for.scss'

import 'amfe-flexible/index.js'
import '@/icons'
import './plugins'

Vue.config.productionTip = false
Vue.use(components)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
