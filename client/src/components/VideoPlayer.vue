<template>
	<div class="videoPlayer">
		<!-- 轮播图 -->
		<Carousel autoplay v-model="focusFirst" loop>
			<CarouselItem v-for="(item,index) in focus" :key="index">
				<img :src="item.pic_url" alt="" style="width:100%">
			</CarouselItem>
		</Carousel>

		<!-- 导航 -->
		<Row class="pt-3">
			<Col :span="8" v-for="(item,index) in nav" :key="index">
				<img :src="item.pic_url" alt="" style="width:30%;">
			</Col>
		</Row>
		<Row class="pb-2">
			<Col :span="8" v-for="(item,index) in nav" :key="index" class="font-12">{{item.con_title}}</Col>
		</Row>

		<!-- 新mv视频 -->
		<Row style="font-size:14px;" class="mt-1 p-2 pt-3">
			<Col :span="16" :offset="4">新mv视频</Col>
			<Col :span="4">更多</Col>
		</Row>
		<Row>
			<Col :span="12" v-for="(item,index) in newVideo" :key="index">
				<Row>
					<Col :span="24"><img :src="item.pic_url" alt="" style="width:85%;height:76px;"></Col>
				</Row>
				<Row>
					<Col :span="24" class="font-12"><p class="float-left ml-3">{{item.con_title.substr(0,9)}}</p></Col>
					<Col :span="24" class="font-12"><p class="float-left ml-3">{{item.author}}</p></Col>
				</Row>
			</Col>
		</Row>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "videoPlayer",
	data() {
		return {
		api: "https://bird.ioliu.cn/v1?url=",
		focus: [],
		focusFirst: 0,
		nav: [],
		newVideo:[]
		};
	},
	created() {
		axios
		.get(
			this.api +"http://musicapi.qianqian.com/v1/restserver/ting?from=android&version=6.9.1.0&channel=ppzs&operator=0&method=baidu.ting.plaza.recommIndex&project=daily&column_id=1&feed_data=2"
		)
		.then(res => {
			//console.log(res);
			this.focus = res.data.modules[0].result;
			this.nav = res.data.modules[1].result;
			this.newVideo = res.data.modules[2].result;
		});
	},
	methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videoPlayer{
	background:#eee;
}
.ivu-row{
	background:#fff;
}
.font-12 {
  font-size: 12px;
}
p{
	margin-bottom:0px;
}
</style>
