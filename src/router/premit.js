// name:< 路由守卫 >
import router from "./index";
import store from "../store/login";
import { getToken,removeToken,removeUserName, } from "../utils/app"

// 定义白名单
const whiteRouter = ['/login']; // indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1

router.beforeEach( (to, from ,next) => {
    if ( getToken () ){
        if (to.path === '/login'){
            removeToken();
            removeUserName();
            // vue存储 token、username 清除
            store.commit("login/SET_TOKEN" , '');
            store.commit("SET_USERNAME",'');
            next()
        }else {
            next();
        }
        console.log("存在")
    }else {
        if ( whiteRouter.indexOf(to.path) !== -1) {
            next();
        }else {
            next('/login') // 路由指向
        }
    }
});

/*    if ( whiteRouter.indexOf(to.path) !== -1) {
            next();
        }else {
            next('/login') // 路由指向
        }
*  1. 直接进入index的时候，参数to被改变成了 "/index" , 触发路由指向，就会跑 beforEach
*  2. 再一次 next 指向了 login,再次发生路由指向，再跑beforEach,参数的to被改变成了'/login'
*  3. 白名单判断存在，则直接执行next(),因为没有参数，所以不会再次beforEach
* */

  // console.log(to);  // 进入的页面 （ 下一个页面 ）
  // console.log(from); // 离开之前的页面（ 上一个页面 ）
  // console.log(next);
