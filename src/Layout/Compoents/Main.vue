<template>
    <div id="main-warp">
        <div class="main-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style lang="scss" scoped>
@import "../../../src/styles/config";
#main-warp {
    position: fixed;
    top: 75px;
    right: 0;
    bottom: 0;
    border-top: 30px solid #f7f7f7;
    border-left: 30px solid #f7f7f7;
    border-right: 30px solid #f7f7f7;
    @include webkit(transition,all .1s ease 0s);

    /*webkit-box-sizing: border;*/
}
.main-content{
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    padding:30px;
    box-sizing: border-box;
}
.open{
    #main-warp{
        left: $navMenuMax;
    }
}
.close{
    #main-warp{
        left: $navMenuMin;
    }
}
</style>
