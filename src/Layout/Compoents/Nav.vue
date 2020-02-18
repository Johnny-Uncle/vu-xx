<template>
    <div id="nav-wrap">
        <h1 class="logo"><span>骚</span><svg-icon iconClass="dog" class="Dog"></svg-icon><span>鸡</span></h1>
        <!--<h1 class="logo"><img src="../../assets/logo.png" alt=""></h1>-->
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse"
                 background-color="transparent" text-color="#fff"  active-text-color="#fff" router
        >
            <template v-for="item in routers">
                <el-submenu :key="item.id" :index="item.index + ''" v-if="!item.hidden">
                        <!--------------- 一级菜单  ------------------->
                    <template slot="title">
                       <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
                        <span slot="title">{{ item.meta.name }}</span>
                     </template>
                        <!--------------- 子级菜单  ------------------->
                        <el-menu-item  v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
                 </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { ref,reactive,onMounted,computed}  from  '@vue/composition-api'
    export default {
        name: "NavMenu",
        setup(props,{ root }){
            // < 获取菜单 >
            const routers = reactive(root.$router.options.routes);

            // --------------------------------- data数据 ------------------------------------------------

            /*
            * computed 监听
            * const c = ref(false);
            * */
            const isCollapse = computed(() => {
                return root.$store.state.main.isCollapse
            })



            // 打印 store


            // -------------------------------- methods函数 ----------------------------------------------

            return {
                // data数据
                isCollapse,routers
                // reactive对象
                // method函数
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../../../src/styles/config";
#nav-wrap {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: #344a5f;
    @include webkit(transition,all .3s ease 0s);
}
svg {
    margin-right: 10px;
}

.Dog{
    @include webkit(transition,all .3s ease 0s);
    font-size: 80px!important;
}
.logo{
    text-align: center;
    height: 130px;
    padding-top: 20px;
    margin-left: -10px;
    span{
        color: #8a8a8a;
        font-weight: bolder;
    }
}
.open{
    #nav-wrap{ width: $navMenuMax;}
    .Dog{font-size: 100px!important;margin-right: 0;}
    .logo span{font-size: 13px;font-family: cursive;font-weight: unset;}
}
.close{
    #nav-wrap{ width: $navMenuMin;}
    .Dog{font-size: 30px!important;margin-right: 0;}
    .logo {
        height: 60px;
        span {
            font-size: 5px;
            font-family: cursive;
            font-weight: unset;
        }
    }
}


</style>
