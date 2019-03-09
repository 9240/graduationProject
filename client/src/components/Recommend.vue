<template>
	<div class="recommend" style="width:100%;">
		<div class="m-2 pt-2 font-12" v-for="(item,index) in songSheet">
			<template v-if="item.feed_type == 1">
				<!-- <Row :style="{backgroundImage:'url('+item.content.pic_special+')',filter:'blur(10px)'}"> -->
				<Row>
					<Col span="8">
						<img :src="item.content.pic_small" alt="" style="width:100%;filter:'blur(0px)'">
					</Col>
					<Col span="16">
						<Row>
							<Col span="24">歌单</Col>
						</Row>
						<Row>
							<Col span="24"><span>{{item.content.title}}</span></Col>
						</Row>
					</Col>
				</Row>
			</template>
			<template v-if="item.feed_type == 2">
				<Row>
					<Col span="24">9240音乐为你推荐<<{{item.content.title}}>>，快来试听一下把!</Col>
					<Col span="24" :style="{backgroundImage:'url('+item.content.pic_special+')',filter:'blur(2px)'}">
						<Row>
							<Col span="24">{{item.content.title}}</Col>
						</Row>
						<Row>
							<Col span="24">{{item.content.artist_name}}</Col>
						</Row>
					</Col>
				</Row>
			</template>
			<template v-if="item.feed_type == 9">
				<Row>
					<Col span="24"><p class="float-left">{{item.content.title}}</p></Col>
					<Col span="24">
						<img :src="item.content.pic_small" alt="" style="width:100%;">
					</Col>
				</Row>
			</template>
			<template v-if="item.feed_type == 21">
				<Row>
					<Col span="24">{{item.content.title}}</Col>
					<Col span="24">
						<video :src="item.content.url" controls="controls"></video>
					</Col>
				</Row>
			</template>
			<template v-if="item.feed_type == 22">
				<Row>
					<Col span="24">{{item.content.title}}</Col>
					<Col span="24">
						<video :src="item.content.url" controls="controls"></video>
					</Col>
				</Row>
			</template>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "recommend",
	data() {
		return {
		api: "https://bird.ioliu.cn/v1?url=",
		songSheet: []
		};
	},
	created() {
		axios.get(this.api +"http://musicapi.qianqian.com/v1/restserver/ting?from=android&version=6.9.1.0&channel=ppzs&operator=0&method=baidu.ting.feedstream.getFeedStreamList&param=5n5SPLjXY12hsvelZqGdDgswlvnkLTt6hNE9wna71Y%2BShcw8an0rVQ9kuuSKHRutRYumMGtrFbbkFLg%2F9LlmJg%3D%3D&timestamp=1551004238&sign=4e9379338817afd6f8fc375ee69994e9")
		.then(res => {
			//console.log(res.data);
			this.songSheet = res.data.result;
		});
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.font-12{
	font-size: 12px;
}
p{
	margin-bottom:0px;
}
</style>
