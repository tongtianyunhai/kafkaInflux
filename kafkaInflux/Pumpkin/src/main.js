import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui';
import 'default-passive-events'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css'
import locale from 'element-ui/lib/locale/lang/en'
import router from './router'
Vue.use(ElementUI,{ locale });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
