import Vue from 'vue'
import alertView from './index.vue'

let AlertConstructor = Vue.extend(alertView);

let showAlert = (o) => {
    let dom = new AlertConstructor({
        el: document.createElement("div")
    })
    document.body.appendChild(dom.$el);
    dom.tip = o.tip;
    dom.onSure = o.onSure;
    dom.onCancel = o.onCancel;
}

// 注册为全局组件的函数
function registryAlert() {
	// 将组件注册到 vue 的 原型链里去,
	// 这样就可以在所有 vue 的实例里面使用 this.$toast()
	Vue.prototype.$alert = showAlert
}

export default registryAlert;
