<template>
    <div id="app">
        <!-- <keep-alive> -->
            <router-view name="nav"/>
        <!-- </keep-alive> -->
        <keep-alive include="recommend,rank">
            <router-view class="pb-5"/>
        </keep-alive>
    </div>
</template>

<script>
import play from './components/Play.vue'
export default {
    name: "App",
    components:{
        play
    },
};
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 56px;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 50vh;
        position: relative;
    }
</style>