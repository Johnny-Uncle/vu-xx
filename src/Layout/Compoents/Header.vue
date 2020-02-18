<template>
    <div id="header-wrap">
        <!-------------- header左边 ---------------------->
        <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu"></svg-icon></div>
        <!-------------- header右边 ---------------------->
        <div class="pull-right">
            <div class="user-info pull-left">
                <img src="../../assets/messages/dog.jpg" alt="">
              {{user_name}}
            </div>
            <div class="header-icon pull-left" @click="exit">
                <!-- 退出按钮 -->
                <svg-icon iconClass="exit" className="exit"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref,reactive,computed}  from  '@vue/composition-api'
    export default {
        name: "LayoutHeader",
        setup(props,{root}){
            // 退出按钮
            const exit = () => {
                root.$store.dispatch('login/exit').then(() => {
                    // 页面跳转 ‘login’
                    root.$router.push({
                        name: 'Login'
                    })
                }).catch(() => {

                })
            };
            // 监听 username
            const user_name = computed(() => root.$store.state.login.user_Name);
            const  navMenuState = () => {
                root.$store.commit('main/SET_COLLAPSE')
            };
            return{
                navMenuState,user_name,
                // 方法
                exit
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../../../src/styles/config";
 #header-wrap {
     position: fixed;
     top: 0;
     right: 0;
     height: 75px;
     line-height: 75px;
     background-color: #ffffff;
     /*-webkit-box-shadow: 0 10px 16px 0 rgba(0,0,0,.1);*/
     @include webkit(box-shadow,0 3px 16px 0 rgba(0,0,0,.1));
     @include webkit(transition,all .1s ease 0s);
 }
.header-icon{
    padding: 0 32px;
    svg{
        font-size: 25px;
        margin-bottom: -8px;
        fill: currentColor;
        color: #344a5f;
        cursor: pointer;
    }
}
.user-info{
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    + .header-icon{
        padding: 0 25px;
    }
    img {
        display: inline-block;
        width: 45px;
        height: 45px;
        margin-right: 18px;
        border-radius: 50px;
        margin-bottom: -17px;
    }
}
.open{
    #header-wrap{ left: $navMenuMax;}
}
.close {
    #header-wrap {left: $navMenuMin;}
}
</style>
