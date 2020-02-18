import Vue from "vue";
import Vuex from "vuex";
import main from "./main"
import login from "./login"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    login
  }
});

/*
*  HTML5 存储
*  sessionStorage ( 临时性 )
*  sessionStorage.setItem('isCollapse',JSON.stringify(state. isCollapse))
*  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
*
*  localStorage ( 长期性 ）
*  LocalStorage.setItem('isCollapse',JSON.stringify(state. isCollapse))
*  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
*
*  cookie_js
*  Cookie.set('isCollapse',JSON.stringify(state. isCollapse));
*  isCollapse: JSON.parse(Cookie.get('isCollapse'))|| false,
* */
