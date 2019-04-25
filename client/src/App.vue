<template>
    <div id="app">
        <keep-alive>
            <router-view name="nav"/>
        </keep-alive>
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
</style>