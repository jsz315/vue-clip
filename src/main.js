import 'lib-flexible'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ClipView from './components/clip-view/index.vue'
import ListView from './components/list-view/index.vue'
import EditView from './components/edit-view/index.vue'
import DetailView from './components/detail-view/index.vue'
import TestView from './components/test-view/index.vue'
import UploadView from './components/upload-view/index.vue'
import FrameView from './components/frame-view/index.vue'
import store from "./store/index";
import toastRegistry from './components/toast-view/index.js'

// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry);
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/list' },
  { path: '/clip', name: 'clip', component: ClipView },
  { path: '/list', component: ListView },
  { path: '/edit', component: EditView },
  { path: '/detail', component: DetailView },
  { path: '/upload', component: UploadView },
  { path: '/test', component: TestView },
  { path: '/frame', component: FrameView }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

(function () {
    var active = false;
    if(location.search.indexOf("eruda=true") != -1){
        active = true;
    }
    else{
        if(localStorage.getItem("active-eruda") == "true"){
            active = true;
        }
    }
    if (!active) return;
    var script = document.createElement("script");
    script.src = "https://libs.cdnjs.net/eruda/2.3.3/eruda.min.js";
    document.body.appendChild(script);
    script = document.createElement("script");
    script.innerHTML = 'setTimeout(function(){eruda.init();console.log("eruda.init");}, 3000);';
    document.body.appendChild(script);
})();