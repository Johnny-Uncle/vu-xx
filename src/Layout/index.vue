<template>
    <div :class="[menuState ? 'close' : 'open']">
        <LayoutHeader></LayoutHeader>
        <LayoutMain></LayoutMain>
        <LayoutNav></LayoutNav>
    </div>
</template>

<script>
import LayoutHeader from './Compoents/Header'
import LayoutMain from './Compoents/Main'
import LayoutNav from './Compoents/Nav'
import { ref,reactive,onMounted,computed}  from  '@vue/composition-api'
    export default {
        name: "layout",
        components: { LayoutHeader,LayoutMain,LayoutNav },  // Layout组件
        setup(props,{root}){
            // -------------------------- 基础数据 --------------------------------
            const menuState = computed( () => root.$store.state.main.isCollapse)
            return{
                menuState
            }
        }
    }
</script>

<style lang="scss" scoped>


</style>
