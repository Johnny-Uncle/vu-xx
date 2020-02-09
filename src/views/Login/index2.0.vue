<template>
    <!--
         *** vue2.0写法 ***
    -->
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li
                        v-for="item in menuTab" :key="item.id" :class="{'current' : item.current}" @click="toggleMenu(item)" >
                    {{item.txt}}
                </li>
            </ul>
            <!-- 表单 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
                <el-form-item prop="username" class="item-from">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="item-from">
                    <label>密码</label>
                    <el-input type="text" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>
                <el-form-item prop="passwords" class="item-from" v-show="model === 'register'">
                    <label>重复密码</label>
                    <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>
                <el-form-item prop="code" class="item-from">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15"><el-input v-model.number="ruleForm.code" maxlength="6" minlength="6"></el-input></el-col>
                        <el-col :span="9"><el-button type="success" class="block">获取验证码</el-button></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="block login-btn">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { stripscript,validateEmail,validatePass,validateVCode } from '../../utils/validate'
    export default {
        name: "login",
        // props、watch:子组件接收父组件参数
        props: {},
        watch: {},
        data() {
            // 验证用户名
            const validateUsername = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入用户名"));
                } else if(validateEmail(value)){
                    callback(new Error("用户名格式错误"));
                } else{
                    callback();
                }
            };
            // 验证密码
            const validatePassword = (rule, value, callback) => {
                // 过滤后的数据
                this.ruleForm.password = stripscript(value);
                value = this.ruleForm.password;
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else if (validatePass(value)) {
                    callback(new Error("密码为6至20位数字+字母"));
                } else {
                    callback();
                }
            };
            // 验证重复密码
            const validatePasswords = (rule, value, callback) => {
                if(this.model === 'login'){ callback(); }  // v-show判断模块值（ model ）
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value != this.ruleForm.password) {
                    callback(new Error("重复密码不正确"));
                } else {
                    callback();
                }
            };
            // 验证验证码
            const validateCode = (rule, value, callback) => {
                if (value === "") {
                    return callback(new Error("请输入验证码"));
                }else if(validateVCode(value)){
                    return callback(new Error("验证码格式有误"))
                }else{
                    return callback();
                }
            };
            return {
                // 模块值
                model: "login",
                menuTab: [
                    { txt: '登录', current: true, type:'login'},
                    { txt: '注册', current: false,type:'register'}
                ],
                // 表单的数据
                ruleForm: {
                    username: "",
                    password: "",
                    passwords:"",
                    code: ""
                },
                // 表单的验证
                rules: {
                    username: [{ validator: validateUsername, trigger: "blur" }],
                    password: [{ validator: validatePassword, trigger: "blur" }],
                    passwords: [{ validator: validatePasswords, trigger: "blur" }],
                    code: [{ validator: validateCode, trigger: "blur" }]
                }
            };
        },
        created() {},
        mounted() {},
        // vue 数据驱动视图渲染
        // js 操作DOM元素
        methods: {
            /*************************
             * 切换登录、注册按钮
             * */
            toggleMenu(data) {
                this.menuTab.forEach(elem => {
                    elem.current = false;
                });
                // ^显示高亮
                data.current = true;
                // ^修改模块值
                this.model = data.type
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        alert("submit!");
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
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

