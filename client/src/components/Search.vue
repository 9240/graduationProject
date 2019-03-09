<template>
	<div class="search">
		<div class="row fixed-top pt-2 pb-2 bg-red">
			<div class="col-2" v-on:click="goBack()">
				<Icon type="ios-arrow-back" class="iconfont pl-2"/>
			</div>
			<!-- 中间的搜索框 -->
			<div class="col-8">
				<Input placeholder="Enter text" style="width: auto" v-model="search" v-on:input="searchSong()">
					<Icon type="ios-search" slot="suffix"/>
				</Input>
			</div>
			<!-- 右侧的 + -->
			<div class="col-2">
				<Icon type="md-add" class="iconfont pr-2"/>
			</div>
		</div>
		<div class="mt-5 fixed-top bg-white">
			<Row v-for="(item,index) in song" :key="index" class="border border-top-0 border-left-0 border-right-0 p-1">
				<Col span="12"><span class="float-left ml-1">{{item.songname.length>5?item.songname.substr(0,5)+"...":item.songname}}</span></Col>
				<Col span="12"><span class="float-right mr-1">{{item.artistname.length>5?item.artistname.substr(0,5)+"...":item.artistname}}</span></Col>
			</Row>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "Search",
	data() {
		return {
			api: "https://bird.ioliu.cn/v1?url=",
			search:"",
			song:[]
		};
	},
	methods: {
		goBack() {
			this.$router.push({name:'Home',params:{isShowNav:true}});
		},
		searchSong(){
			axios.get(this.api +"http://musicapi.qianqian.com/v1/restserver/ting?from=android&version=6.9.1.0&channel=ppzs&operator=0&method=baidu.ting.search.catalogSug&format=json&query="+this.search)
			.then(res => {
				console.log(res);
				this.song = res.data.song
			});
		}
	},
	computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.iconfont {
	font-size: 20px;
	line-height: 32px;
}
.bg-red {
	background-color: #f00;
}
</style>
