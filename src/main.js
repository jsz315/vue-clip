import 'lib-flexible'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// import ClipPage from '@/pages/clip-page/index.vue'
// import ListPage from '@/pages/list-page/index.vue'
// import EditPage from '@/pages/edit-page/index.vue'
// import DetailPage from '@/pages/detail-page/index.vue'
// import UploadPage from '@/pages/upload-page/index.vue'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// import EasyRefresh from 'vue-easyrefresh'
// Vue.use(EasyRefresh)

import store from "./store/index";
import toastRegistry from './components/toast-view/index.js'
import alertRegistry from  './components/alert-view/index.js'

// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry);
Vue.use(alertRegistry);

Vue.use(VueRouter)


const routes = [
  { path: '/', redirect: '/list' },
  { path: '/list', component: (resolve)=>require(['@/pages/list-page/index.vue'], resolve), name: 'list' },
  { path: '/detail', component: (resolve)=>require(['@/pages/detail-page/index.vue'], resolve), name: 'detail' },
  { path: '/edit', component: (resolve)=>require(['@/pages/edit-page/index.vue'], resolve), name: 'edit' },
  { path: '/clip', component: (resolve)=>require(['@/pages/clip-page/index.vue'], resolve), name: 'clip' },
  { path: '/upload', component: (resolve)=>require(['@/pages/upload-page/index.vue'], resolve), name: 'upload' },
  { path: '/move', component: (resolve)=>require(['@/pages/move-page/index.vue'], resolve), name: 'move' },
  { path: '/scale', component: (resolve)=>require(['@/pages/scale-page/index.vue'], resolve), name: 'scale' },
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