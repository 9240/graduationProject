<template>
	<div class="mine">
		<template v-if="!userInfo.name&&!userInfo.password">
			<h5 class="pt-5">你还没有登陆 <router-link to='/LoginRegister'>去登陆</router-link></span></h5>
		</template>
		<template v-else>
			<h5>欢迎使用</h5>
		</template>
	</div>
</template>

<script>
export default {
	name: 'mine',
	data () {
		return {
		
		}
	},
	computed:{
		userInfo(){
		return this.$store.state.userInfo
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mine{
        text-align: center;
    }
</style>
