import Vue from "vue";     // import Vue from 'vue'  ==  import Vue From 'vue/dist/vue.runtime.common.js'文件
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import VueCompositionApi from "@vue/composition-api";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit"
// 自定义全局组件
import './icons/index'

Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;


// runtime(运行模式)s
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
