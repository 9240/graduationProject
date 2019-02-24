<template>
	<div class="hello">
		<div class="row fixed-top pt-2 pb-2 bg-red">
			<div class="col-2" v-on:click="showmsg">
				<Icon type="md-menu" class="iconfont pl-2"/>
			</div>
			<!-- 左侧弹层 -->
			<Drawer :closable="false" width="50" v-model="onoff" placement="left">
				<Row class="mt-5">
					<Col span="8">
						<Avatar style="background-color: #87d068" icon="ios-person"/>
					</Col>
					<!-- <Col span="16" class="mt-2">{{$store.state.userInfo.username?$store.state.userInfo.username:"你还没有登陆"}}</Col> -->
					<Col span="16" class="mt-2">{{$store.getters.getLoginUserName}}</Col>
				</Row>
				<Divider/>
				<CellGroup>
					<Cell title="选项一"/>
					<hr>
					<Cell title="选项二"/>
					<hr>
					<Cell title="选项三"/>
					<hr>
					<Cell title="选项四"/>
					<hr>
				</CellGroup>
			</Drawer>
			<div class="col-8">
				<Input placeholder="Enter text" style="width: auto" v-model="search" v-on:input="searchSong()">
					<Icon type="ios-search" slot="suffix"/>
				</Input>
			</div>
			<div class="col-2">
				<Icon type="md-add" class="iconfont pr-2"/>
			</div>
		</div>
		<div class="mt-5">
			<Row v-for="(item,index) in song" :key="index">
				<Col span="12"><span class="float-left ml-1">{{item.songname}}</span></Col>
				<Col span="12"><span class="float-right mr-1">{{item.artistname}}</span></Col>
			</Row>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "HelloWorld",
	data() {
		return {
			api: "https://bird.ioliu.cn/v1?url=",
			onoff: false,
			search:"",
			song:[]
		};
	},
	methods: {
		showmsg() {
			this.onoff = !this.onoff;
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
