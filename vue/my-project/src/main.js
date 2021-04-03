import Vue from 'vue'
import App from './App.vue'
import './directive/debounce'
import xss from 'xss'

Vue.config.productionTip = false
Vue.prototype.$xss = xss

new Vue({
  render: h => h(App),
}).$mount('#app')
