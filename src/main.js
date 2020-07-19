import 'lib-flexible'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import ClipPage from '@/pages/clip-page/index.vue'
import ListPage from '@/pages/list-page/index.vue'
import EditPage from '@/pages/edit-page/index.vue'
import DetailPage from '@/pages/detail-page/index.vue'
import UploadPage from '@/pages/upload-page/index.vue'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import EasyRefresh from 'vue-easyrefresh'
Vue.use(EasyRefresh)

import store from "./store/index";
import toastRegistry from './components/toast-view/index.js'

// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry);
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/list' },
  { path: '/list', component: ListPage, name: 'list' },
  { path: '/detail', component: DetailPage, name: 'detail' },
  { path: '/edit', component: EditPage, name: 'edit' },
  { path: '/clip', component: ClipPage, name: 'clip' },
  { path: '/upload', component: UploadPage, name: 'upload' },
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