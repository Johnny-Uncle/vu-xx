<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab" :key="item.id" :class="{'current' : item.current}" @click="toggleMenu(item)" >
          {{item.txt}}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-from">
          <!-- for="username"与id="username"相关连 -->
          <label for="user-name">邮箱</label>
          <el-input id="user-name" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label for="pass-word">密码</label>
          <el-input id="pass-word" type="text" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-from" v-show="model === 'register'">
          <label for="pass-words">重复密码</label>
          <el-input id="pass-words" type="text" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"><el-input v-model="ruleForm.code" maxlength="6" minlength="6"></el-input></el-col>
            <el-col :span="9"><el-button type="success" class="block" :disabled="codeButtonStatus.status" @click="getSms()">{{codeButtonStatus.text}}</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger"
                     @click="submitForm('loginForm')"
                     class="block login-btn"
                     :disabled="loginButtonStatus">
            {{model === 'login' ? '登录' : '注册'}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
 import sha1 from 'js-sha1';
import { GetSms,Register,LoginApi } from '../../api/login'
import { reactive,ref,onMounted} from '@vue/composition-api'
import { stripscript,validateEmail,validatePass,validateVCode } from '../../utils/validate'
export default {
  name: "login",
    // setup放置data数据、生命周期、自定义的函数
      /**
       setup(props,context)
       console.log(context)
       root: (...)       == this
       parent: (...)     == this.$parent
       refs: (...)       == this.$refs
       attrs: (...)      == this.$attrs
       listeners: (...)  == this.$listeners
       isServer: (...)   == this.$isServer
       ssrContext: (...) == this.$ssrContext
       emit: (...)       == this.$emit
       * */
        setup(props,{refs,root}){
        // 验证用户名
        let validateUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else if(validateEmail(value)){
                callback(new Error("用户名格式错误"));
            } else{
                callback();
            }
        };
        // 验证密码
        let validatePassword = (rule, value, callback) => {
            // 过滤后的数据
            ruleForm.password = stripscript(value);
            value = ruleForm.password;
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (validatePass(value)) {
                callback(new Error("密码为6至20位数字+字母"));
            } else {
                callback();
            }
        };
        // 验证重复密码
        let validatePasswords = (rule, value, callback) => {
            if(model.value === 'login'){ callback(); }  // v-show判断模块值（ model ）
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value != ruleForm.password) {
                callback(new Error("重复密码不正确"));
            } else {
                callback();
            }
        };
        // 验证验证码
        let validateCode = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error("请输入验证码"));
            }else if(validateVCode(value)){
                return callback(new Error("验证码格式有误"))
            }else{
                return callback();
            }
        };
        /******************************************************
         * 声明数据
         * */
      const timer = ref(null);
      const model = ref('login');   // <模块值>
      const loginButtonStatus = ref(true);  // <修改登录按钮禁用状态>
      const codeButtonStatus = reactive({
          status: false,
          text: "获取验证码"
        });
      /*
      *            用对象方式优化上面定义变量去修改值的方法（简单）
      * ————const codeButtonStatus = ref(false);      <修改获取验证码按钮禁用状态> ———————————
      * ————const codeButtonText = ref('获取验证码');   <获取验证码Text>          ————————————
      * */
      // 表单绑定数据
      const ruleForm = reactive({
        password: "JN123456",
        username: "1541557070@qq.com",
        passwords: "",
        code: ""
       });
        // 表单验证
        const rules = reactive({
            username: [{validator: validateUsername, trigger: "blur"}],
            password: [{validator: validatePassword, trigger: "blur"}],
            passwords: [{validator: validatePasswords, trigger: "blur"}],
            code: [{validator: validateCode, trigger: "blur"}]
        });
       const menuTab = reactive([
            { txt: '登录', current: true, type:'login'},
            { txt: '注册', current: false,type:'register'}
        ]);
       /***
        * 声明函数
        * */
       // #切换登录、注册按钮
       const toggleMenu = ( data => {
            menuTab.forEach(elem => {
                elem.current = false;
            });
            // ^显示高亮
            data.current = true;
            // ^修改模块值
            model.value = data.type;
            // ^调用重置表单方法
            resetFormData();
            // ^调用清除倒计时方法
            clearCountDown()
        });
       /*
       *  #重置表单
       * */
       const resetFormData =(() => {
         refs.loginForm.resetFields();
       });
       /*
       * 提交表单
       * */
         const submitForm = ( formName => {
           /*
           * 模拟注册成功
           * toggleMenu(menuTab[0]);
           * clearCountDown()
           * return false;
           * */
           refs[formName].validate(valid => {
             if (valid) {
               // ^ 表单验证通过  ( 三元运算表达式判断)
               model.value === 'login' ? login() : register()
             } else {
               console.log("error submit!!");
               return false;
             }
           })
        });
       /*
       * # 登录
       * */
       const login = ( () => {
         // LoginApi —————————————————— 登录接口 ——————————————————————————————jk
         let repuestData = {
           username: ruleForm.username,
           password: ruleForm.password,
           code: ruleForm.code
         };
         /* ^^^^^^^^^^^^^^^^^  login接口练习store.actions  ^^^^^^^^^^^^^^^^^^^^^ */
         root.$store.dispatch('login/login',repuestData).then(response => {
           root.$router.push({
             name: 'Console'
           })
         }).catch( error => {})
        /* LoginApi(repuestData).then( response => {
           console.log(response);
           root.$router.push({
             name: 'Console'
           })
         }).catch( error => {
           console.log(222);
           console.log(error)
         })*/
       });

       /*
       * # 注册
       * */
       const register = ( () => {
         // Register —————————————————— 注册接口 ——————————————————————————————jk
         let requestDada = {
           username: ruleForm.username,
           password: ruleForm.password,
           code: ruleForm.code,
           module: 'register'
         };
         Register(requestDada).then(response => {
           console.log('注册333')
           let data = response.data;
           root.$message({
             message:data.message,
             type:'success'
           });
           toggleMenu(menuTab[0]);       // < 调用toggleMenu() >
           clearCountDown()              // < clearCountDown() >
         }).catch(error => {
           console.log('注册444')
         })
       });

       /*
       * # 验证码定时器（倒计时）
       * */
      const countDown = ((number) => {
        // <判断定时器是否存在，存在则清除>
        if (timer.value){
          clearInterval(timer.value);
        }
        let time = number;
        timer.value = setInterval(() => {
          time--;
          if(time === 0){
            clearInterval(timer.value);
            // { 调用updataButtonStatus方法修改按钮状态、按钮文字 }
            updataButtonStatus({
              status: false,
              text: '再次获取'
            });
          }else {
            codeButtonStatus.text = `倒计时${time}秒`;   // es5写法："倒计时 + time + 秒"
          }

        },1000)
      });
      /*
      * # 清除倒计时
      * */
      const clearCountDown = ( () => {
        // { 调用updataButtonStatus方法修改按钮状态、按钮文字 }
        updataButtonStatus({
          status: false,
          text: '获取验证码'
        });
        // ^ 清除倒计时  （初始化）
        clearInterval(timer.value);
      });
      /*
      * # 更新按钮状态
      * */
      const updataButtonStatus = ((params) => {
        codeButtonStatus.status = params.status;
        codeButtonStatus.text = params.text;
      });
      // #获取验证码  -----jk
      const getSms = (() => {
        // { 请求前 ：验证邮箱不能为空 }
        if(ruleForm.username === ''){
          root.$message.error('邮箱不能为空');
          return false
        }
        // { 请求前 ：验证邮箱格式错误 }
        if(validateEmail(ruleForm.username)){
          root.$message.error('邮箱格式有误，请重新输入');
          return false
        }
        // { 调用updataButtonStatus方法修改按钮状态、按钮文字 }
        updataButtonStatus({
          status: true,
          text: '发送中'
        });
        // jk-GetSms请求接口
        let requestData = {
          username: ruleForm.username,
          module: model.value
        };
        // GetSms————————————获取验证码——————————————————jk
          GetSms(requestData).then(response => {
            let data = response.data;
            root.$message({
              message:data.message,
              type:'success'
            });
            //  < * 启动登录按钮或注册按钮 >
            loginButtonStatus.value = false;
            //  < # 调用定时器，倒计时办法  >
            countDown(60);  // 倒计时60's
          }).catch(error => {
            console.log(error)
          })
      });

         /********************************************************************************************************
          * 生命周期
          * */
         // 挂载完成后
         onMounted(() => {
         });
        // 返回值
        return{
            // date(ref)
            model,loginButtonStatus,codeButtonStatus,timer,
            // reactive
            menuTab,rules,ruleForm,clearCountDown,
            // methods
            toggleMenu,submitForm,getSms,countDown
        }
    },
};
</script>

<style scoped lang="scss">
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
  padding-top: 100px;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    color: #ffffff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 3px;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
<!--
密码加密：
1、在前端预先加密一次
登录的密码：123456（普通字符串）
经过加密后：sha1('123456') == '541216ad5s4f5ds1f5asd4f65asd4' （加密后的字符串）


2、后台加密
接收到字符串：'541216ad5s4f5ds1f5asd4f65asd4'
后台再次加密：md5('541216ad5s4f5ds1f5asd4f65asd4') == '8f9qwersd3g165y4d1sf3s1f6aew4'（最终的加密后的密码）
最终新的字符串写入数据库：8f9qwersd3g165y4d1sf3s1f6aew4


3、登录
用户名与加密后的密码进行匹配，成功则登录，失败则提示
-->
