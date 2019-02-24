<template>
    <div class="home">
        <!-- 轮播图 -->
        <Carousel autoplay v-model="focusFirst" loop>
            <CarouselItem v-for="(item,index) in focus" :key="index">
                <img :src="item.randpic" alt="" style="width:100%">
            </CarouselItem>
        </Carousel>
        <!-- 导航 -->
        <Row class="pt-3">
            <Col :span="4" v-for="(item,index) in mix_116" :key="index" class="ml-2">
                <img :src="item.pic" alt="" style="width:60%;">
            </Col>
        </Row>
        <Row class="pb-2">
            <Col
                :span="4"
                v-for="(item,index) in mix_116"
                :key="index"
                class="ml-2 font-12"
            >{{item.title}}</Col>
        </Row>
        <!-- 精选歌单 -->
        <Row style="font-size:14px;" class="mt-1 p-2 pt-3">
            <Col :span="16" :offset="4">精选歌单</Col>
            <Col :span="4">更多</Col>
        </Row>
        <Row>
            <Col :span="8" v-for="(item,index) in diy" :key="index">
                <Row>
                    <Col :span="24">
                        <img :src="item.pic" alt="" style="width:85%;">
                    </Col>
                </Row>
                <Row>
                    <Col :span="24" class="font-12">{{item.title}}</Col>
                </Row>
            </Col>
        </Row>
        <!-- 新歌首发 -->
        <Row style="font-size:14px;" class="mt-1 p-2 pt-3">
            <Col :span="16" :offset="4">新歌首发</Col>
            <Col :span="4">更多</Col>
        </Row>
        <Row>
            <Col :span="8" v-for="(item,index) in mix_1" :key="index">
                <Row>
                    <Col :span="24">
                        <img :src="item.pic" alt="" style="width:90%;">
                    </Col>
                </Row>
                <Row>
                    <Col :span="24" class="font-12">{{item.title}}</Col>
                </Row>
            </Col>
        </Row>
        <!-- 今日推荐歌曲 -->
        <Row style="font-size:14px;" class="mt-1 p-2 pt-3">
            <Col :span="16" :offset="4">今日推荐歌曲</Col>
            <Col :span="4">更多</Col>
        </Row>
        <Row v-for="(item,index) in mix_118" :key="index" class="pt-1 font-12">
            <Col :span="6">
                <img :src="item.pic_premium" alt="" style="width:100%;">
            </Col>
            <Col :span="14" class="pt-3 pl-2">
                <Row>
                    <Col :span="24">
                        <p class="float-left font-bold">{{item.title}}</p>
                    </Col>
                </Row>
                <Row>
                    <Col :span="24">
                        <p class="float-left">{{item.author}}</p>
                    </Col>
                </Row>
            </Col>
            <Col :span="4">
                <h2 style="line-height:80px;">...</h2>
            </Col>
        </Row>
        <!-- 主播电台 -->
        <Row style="font-size:14px;" class="mt-1 p-2 pt-3">
            <Col :span="16" :offset="4">主播电台</Col>
            <Col :span="4">更多</Col>
        </Row>
        <Row>
            <Col :span="8" v-for="(item,index) in mix_83" :key="index">
                <Row>
                    <Col :span="24">
                        <img :src="item.pic" alt="" style="width:90%;">
                    </Col>
                </Row>
                <Row>
                    <Col :span="24" class="font-12 font-bold">{{item.title}}</Col>
                </Row>
                <Row>
                    <Col :span="24" class="font-12">{{item.desc}}</Col>
                </Row>
            </Col>
        </Row>
        <!-- 付费专辑 -->
        <Row style="font-size:14px;" class="mt-1 p-2 pt-3">
            <Col :span="16" :offset="4">付费专辑</Col>
            <Col :span="4">更多</Col>
        </Row>
        <Row>
            <Col :span="8" v-for="(item,index) in mix_22" :key="index">
                <Row>
                    <Col :span="24">
                        <img :src="item.pic" alt="" style="width:90%;">
                    </Col>
                </Row>
                <Row>
                    <Col :span="24" class="font-12 font-bold">{{item.title}}</Col>
                </Row>
                <Row>
                    <Col :span="24" class="font-12">{{item.desc}}</Col>
                </Row>
            </Col>
        </Row>
        <!-- 精选文章 -->
        <Row style="font-size:14px;" class="mt-1 p-2 pt-3">
            <Col :span="16" :offset="4">精选文章</Col>
            <Col :span="4">更多</Col>
        </Row>
        <div v-for="(item,index) in mix_119">
            <Row>
                <Col :span="24">
                    <div class="m-1">
                        <img :src="item.pic" style="width:100%;" class="img-thumbnail">
                    </div>
                </Col>
            </Row>
            <Row>
                <Col :span="24">
                    <p class="float-left pl-2">{{item.title}}</p>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      api: "https://bird.ioliu.cn/v1?url=",
      username: "",
      password: "",
      repassword: "",
      focus: [],
      focusFirst: 0,
      mix_116: [],
      diy: [],
      mix_1: [],
      mix_118: [],
      mix_83: [],
      mix_22: [],
      mix_119: []
    };
  },
  created() {
    axios
      .get(
        this.api +
          "http://musicapi.qianqian.com/v1/restserver/ting?from=android&version=6.9.1.0&channel=xiaomi&operator=0&method=baidu.ting.plaza.index&cuid=20FEE5C3E4D640433364068880D4F7C0&focu_num=8"
      )
      .then(res => {
        //console.log(res);
        this.focus = res.data.result.focus.result;
        this.mix_116 = res.data.result.mix_116.result;
        this.diy = res.data.result.diy.result;
        this.mix_1 = res.data.result.mix_1.result;
        this.mix_118 = res.data.result.mix_118.result.slice(0, 3);
        this.mix_83 = res.data.result.mix_83.result;
        this.mix_22 = res.data.result.mix_22.result;
        this.mix_119 = res.data.result.mix_119.result;
      });
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  background: #eee;
}
.ivu-row {
  background: #fff;
}
.font-12 {
  font-size: 12px;
}
.font-bold {
  font-weight: bold;
}
</style>
