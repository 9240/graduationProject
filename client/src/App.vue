<template>
  <div id="app">
    <HelloWorld />
    <router-view class="mt-5 pb-5" />
    <router-view name="nav"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
export default {
  name: 'App',
  components:{
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
