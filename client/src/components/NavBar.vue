<template>
    <div id="navbar" class="container">
        <div class="row fixed-top bg-primary p-3">
            <div class="col-2" v-on:click="leftIcon">
                <Icon :type="$store.state.leftIcon" class="pl-2 h6" ref="icon"/>
            </div>
            <!-- 左侧返回 -->
			<Drawer :closable="false" width="60" v-model="leftonoff" placement="left">
				<Row class="mt-5">
					<Col span="8">
						<Avatar style="background-color: #87d068" icon="ios-person"/>
					</Col>
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
                <h5 class="">9240音乐</h5>
            </div>
            <div class="col-2">
                <Icon type="md-add" class="pr-2 h6"/>
            </div>
        </div>
        <ul class="nav nav-tabs justify-content-around fixed-bottom bg-light p-2">
            <li class="nav-item"  v-show="this.$store.state.IsMini">
                <router-link to="/" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="ios-star" class="iconfont" /></div>
                    </div>
                    <div class="row">
                        <div class="col-12">新歌</div>
                    </div>
                </router-link>
            </li>
            <li class="nav-item"  v-show="this.$store.state.IsMini">
                <router-link to="/rank" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="ios-thumbs-up" class="iconfont"/></div>
                    </div>
                    <div class="row">
                        <div class="col-12">排行</div>
                    </div>
                </router-link>
            </li>
            <li class="nav-item" :class="{active:!this.$store.state.IsMini}">
                <!-- https://api.itooi.cn/music/tencent/url?key=579621905&id=001fXNWa3t8EQQ&br=192 -->
                <audio :src="'http://v1.itooi.cn/tencent/url?quality=128&id='+this.songInfo.songmid" v-show="songInfo.songmid" ref="music"></audio>
                <!-- <audio src="https://api.itooi.cn/music/tencent/url?id=0015Fszs0HWl2g&key=579621905" v-show="songInfo.songmid" ref="music" controls></audio> -->
                <div v-show="this.$store.state.IsMini"  @click="changeIsMini(false)">
                    <i-circle :percent="percent" stroke-color="#fff700e6" trail-color="#444" :size="45">
                        <img alt="" :src="songInfo.picurl" class="rounded-circle" v-if="songInfo.picid" style="width:40px;height:40px" ref="picmini">
                        <img src="http://www.kugou.com/yy/static/images/play/default.jpg" alt="" style="width:40px;height:40px" class="rounded-circle" v-if="!songInfo.picid" ref="picmininull">
                    </i-circle>
                </div>
                <div v-show="!this.$store.state.IsMini">
                    <div id="play" style="height:70vh;">
                        <div class="row fixed-top p-3">
                            <div class="col-2">
                                <Icon type="ios-arrow-down" class="pl-2 h4" @click="changeIsMini(true)"/>
                            </div>
                        </div>
                        <div style="position:absolute;top:0;left:0;width:100vw;height:70vh;z-index:-1;">
                            <img src="http://www.kugou.com/yy/static/images/play/default.jpg" alt="" style="width:100vw;height:100vh;filter:blur(20px)" v-if="!songInfo.picurl" ref="picnull">
                            <img :src="songInfo.picurl" alt="" style="width:100vw;height:100vh;filter:blur(20px)" v-else>
                        </div>
                        <h4 class="songname mt-90">{{songInfo.songname}}</h4>
                        <p class="songname">{{songInfo.singername}}</p>
                        <img alt="" :src="songInfo.picurl" class="rounded-circle mt-2" v-if="songInfo.picid" style="width:240px;height:240px" ref="pic">
                        <ul class="list-group" ref="lrc">
                            <li v-for="(item,index) in songlrc.split('[')" :key="index" class="list-group-item" style="border:0;position:absolute;top:400px;left:0px;background-color:rgba(0,0,0,0);width:100vw;">
                            <!-- <li v-for="(item,index) in songlrc.split('[')" :key="index" class="list-group-item" > -->
                                <p v-if="((item.split(']')[0].split('.')[0].split(':')[0]*60+item.split(']')[0].split('.')[0].split(':')[1]*1-1) - currentTime)<=1&&((item.split(']')[0].split('.')[0].split(':')[0]*60+item.split(']')[0].split('.')[0].split(':')[1]*1-1) - currentTime)>=-1" :class="{isRed:(item.split(']')[0].split('.')[0].split(':')[0]*60+item.split(']')[0].split('.')[0].split(':')[1]*1-1)==currentTime?true:false}" style="color:red;z-index:999;" class="text-center">{{item.split(']')[1]}}</p>
                                <!-- <p>{{item.split(']')[0]}}</p> -->
                            </li>
                        </ul>
                        <img src="http://www.kugou.com/yy/static/images/play/default.jpg" alt="" style="width:240px;height:240px" class="rounded-circle mt-2" v-if="!songInfo.picid">
                        <h2 v-show="!songInfo.songmid">抱歉,你找的歌曲不存在</h2>
                        <div class="icon">
                            <Row>
                                <Col :span="12">
                                    <Icon :type="onoff?'ios-pause':'ios-play'" class="fonticon" v-on:click="isPlay" ref="songState"/>
                                </Col>
                                <Col :span="12">
                                    <Icon type="md-arrow-down" class="fonticon"/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item"  v-show="this.$store.state.IsMini">
                <router-link to="/search" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="md-search" class="iconfont"/></div>
                    </div>
                    <div class="row">
                        <div class="col-12">搜索</div>
                    </div>
                </router-link>
            </li>
            <li class="nav-item"  v-show="this.$store.state.IsMini">
                <router-link to="/Mine" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="ios-contact" class="iconfont" /></div>
                    </div>
                    <div class="row">
                        <div class="col-12">我的</div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'navbar',
    data(){
        return{
            leftonoff: false,
            isShowNav:true,
            onoff:false,
            timer:'',
            songlrc:'',
            currentTime:0,
            songInfo:null,
            percent:0
        }
    },
    created() {
        this.initData();
    },
    methods:{
        leftIcon(){
            if(this.$refs.icon.type == "md-menu"){
                this.leftonoff = !this.leftonoff;
            }else if(this.$refs.icon.type == "ios-arrow-back"){
                this.$router.go(-1)
            }
        },
        changeIsMini(payload){
            this.$store.commit("changeIsMini",payload)
        },
        initData(){
            this.songInfo = this.getSongInfo()
        }, 
        isPlay(){
            axios("http://v1.itooi.cn/tencent/lrc?&id="+this.songInfo.songmid).then(data=>{
                this.songlrc = data.data;
            })
            if(!this.onoff){
                this.$refs.music.play()
                this.timer = setInterval(()=>{
                    if(this.$refs.music.currentTime >= this.$refs.music.duration){
                        this.onoff = false
                    }else{
                        this.songInfo.picurl?this.$refs.pic.style.transform = `rotateZ(${this.$refs.music.currentTime*8}deg)`:this.$refs.picnull.style.transform = `rotateZ(${this.$refs.music.currentTime*8}deg)`
                        this.songInfo.picurl?this.$refs.picmini.style.transform = `rotateZ(${this.$refs.music.currentTime*8}deg)`:this.$refs.picmininull.style.transform = `rotateZ(${this.$refs.music.currentTime*8}deg)`
                        this.percent = this.$refs.music.currentTime/this.$refs.music.duration*100
                        this.currentTime = parseFloat(this.$refs.music.currentTime)-2
                    }
                },100)
            }else{
                this.$refs.music.pause();
            }
            this.onoff = !this.onoff
        },
        getSongInfo(){
            return this.$store.getters.getSongInfo
        }
    }
}
</script>
<style scoped>
    .router-link-active{
        color:#f00;
    }
    .iconfont{
        font-size: 20px;
    }
    #navbar{
        text-align: center;
    }
    .mt-90{
        margin-top:90px;
    }
    .songname{
        color:#fff;
    }
    .icon{
        position: relative;
        bottom:-80px;
    }
    .fonticon{
        font-size:40px;
    }
    .isRed{
        color:red;
        /* font-size:18px; */
    }
    #play{
        text-align: center;
    }
    .active{
        height: 100vh;
    }
</style>
