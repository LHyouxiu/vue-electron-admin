import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $conf from "./common/config/config.js"
Vue.prototype.$conf = $conf
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
