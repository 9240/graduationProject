<template>
  <div class="recommend">
    <div class="m-2 pt-2" v-for="(item,index) in songSheet">

      <template v-if="item.feed_type == 1">
        <Row :style="{backgroundImage:'url('+item.content.pic_special+')',filter:'blur(2px)'}">
          <Col span="8"><img :src="item.content.pic_small" alt="" style="width:100%;"></Col>
          <Col span="16">
            <Row>
              <Col span="24">歌单</Col>
            </Row>
            <Row>
              <Col span="24">{{item.content.title}}</Col>
            </Row>
          </Col>
        </Row>
      </template>

      <template v-if="item.feed_type == 2">
        <Row>
          <Col span="24">9240音乐为你推荐{{item.content.title}}，快来试听一下把!</Col>
        </Row>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'recommend',
  data () {
    return {
      api:"https://bird.ioliu.cn/v1?url=",
      songSheet:[]
    }
  },
  created(){
    axios.get(this.api+"http://musicapi.qianqian.com/v1/restserver/ting?from=android&version=6.9.1.0&channel=xiaomi&operator=0&method=baidu.ting.feedstream.getFeedStreamList&param=k2BVUqHyE6VlYlwUATnopvo72bGtC23ikfDUQGq%2BcF3H938%2BjCZn1wBHtsLcm73AFuWZP4G%2FQUnT7iOq%2FzkcNQ%3D%3D&timestamp=1546520850&sign=fc807511451162f83d9b52937bacc1f5")
    .then(res=>{
      console.log(res.data)
      this.songSheet = res.data.result;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
