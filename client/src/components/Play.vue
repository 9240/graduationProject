<template>
    <div>
        <audio :src="url" v-show="songInfo.songmid" ref="music"></audio>
        <div v-show="this.$store.state.IsMini">
            <img alt="" :src="songInfo.picurl" class="rounded-circle" v-if="songInfo.picid" style="width:40px;height:40px" ref="pic">
            <img src="http://www.kugou.com/yy/static/images/play/default.jpg" alt="" style="width:40px;height:40px" class="rounded-circle" v-if="!songInfo.picid" ref="picnull">
            <!-- <div style="position:absolute;bottom:60px;width:100vw;">
                
            </div> -->
        </div>
        <div v-show="!this.$store.state.IsMini">
            <div id="play" style="height:70vh;">
                <div class="row fixed-top p-3">
                    <div class="col-2">
                        <Icon type="ios-arrow-down" class="pl-2 h4" @click="goback"/>
                    </div>
                    <div class="col-8">
                        <h5 class=""></h5>
                    </div>
                    <div class="col-2">
                        
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
                        <p v-if="((item.split(']')[0].split('.')[0].split(':')[0]*60+item.split(']')[0].split('.')[0].split(':')[1]*1-1) - currentTime)<=1&&((item.split(']')[0].split('.')[0].split(':')[0]*60+item.split(']')[0].split('.')[0].split(':')[1]*1-1) - currentTime)>=-1" :class="{isRed:(item.split(']')[0].split('.')[0].split(':')[0]*60+item.split(']')[0].split('.')[0].split(':')[1]*1-1)==currentTime?true:false}" style="color:red;z-index:999;" class="text-center">{{item.split(']')[1]}}</p>
                    </li>
                </ul>
                <img src="http://www.kugou.com/yy/static/images/play/default.jpg" alt="" style="width:240px;height:240px" class="rounded-circle mt-2" v-if="!songInfo.picid">
                <!-- <div style="position:absolute;bottom:60px;width:100vw;">
                    <audio :src="url" v-show="songInfo.songmid" ref="music"></audio>
                </div> -->
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
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name:'play',
    data(){
        return{
            api:"https://bird.ioliu.cn/v1?url=",
            url:'',
            onoff:false,
            timer:'',
            songlrc:'',
            currentTime:0,
            songInfo:null
        }
    },
    created(){
        this.initData()
    },
    methods:{
        initData(){
            this.songInfo = this.getSongInfo()
            if(this.songInfo.songmid){
                this.url = '/bzq/music/tencent/url?key=579621905&id='+this.songInfo.songmid;
                axios("/bzq/music/tencent/lrc?key=579621905&id="+this.songInfo.songmid).then(data=>{
                    this.songlrc = data.data;
                })
            }
        },
        isPlay(){
            if(!this.onoff){
                this.$refs.music.play();
                this.timer = setInterval(()=>{
                    if(this.$refs.music.currentTime >= this.$refs.music.duration){
                        this.onoff = false
                    }else{
                        this.songInfo.picurl?this.$refs.pic.style.transform = `rotateZ(${this.$refs.music.currentTime*8}deg)`:this.$refs.picnull.style.transform = `rotateZ(${this.$refs.music.currentTime*8}deg)`
                        this.currentTime = parseInt(this.$refs.music.currentTime)-2
                    }
                },100)
            }else{
                this.$refs.music.pause();
            }
            this.onoff = !this.onoff
        },
        goback(){
            this.$router.go(-1)
        },
        getSongInfo(){
            return this.$store.getters.getSongInfo
        }
    },
    destroyed(){
        clearInterval(this.timer);
    },
    activated(){
        this.initData()
    },
    deactivated(){
        console.log("休眠")
    }
}
</script>


<style scoped>
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
</style>
