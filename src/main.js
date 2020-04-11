import 'lib-flexible'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ClipView from './components/clip-view/index.vue'
import ListView from './components/list-view/index.vue'
import EditView from './components/edit-view/index.vue'
import DetailView from './components/detail-view/index.vue'
import TestView from './components/test-view/index.vue'
import store from "./store/index";
import toastRegistry from './components/toast-view/index.js'

// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry);
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/list' },
  { path: '/clip', component: ClipView },
  { path: '/list', component: ListView },
  { path: '/edit', component: EditView },
  { path: '/detail', component: DetailView },
  { path: '/test', component: TestView }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
