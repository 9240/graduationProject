<template>
    <div id="play" style="height:70vh;">
        <div style="position:absolute;top:0;left:0;width:100vw;height:70vh;z-index:-1;">
            <img src="http://www.kugou.com/yy/static/images/play/default.jpg" alt="" style="width:100vw;height:100vh;filter:blur(20px)" v-if="!picurl">
            <img :src="picurl" alt="" style="width:100vw;height:100vh;filter:blur(20px)" v-else>
        </div>
        <h4 class="songname mt-90">{{songname}}</h4>
        <p class="songname">{{songmsg.name}}</p>
        <img alt="" :src="picurl" class="rounded-circle mt-2" v-if="picid" style="width:240px;height:240px" ref="pic" v-on:click="isShowlrc" v-show="!Showlrc">
        <ul class="list-group" ref="lrc" v-on:click="isShowlrc" v-show="!Showlrc">
            <li v-for="(item,index) in songlrc.split('[')" :key="index" class="list-group-item" style="border:0;position:absolute;top:400px;left:0px;background-color:rgba(0,0,0,0);width:100vw;">
                <p v-if="((item.split(']')[0].split('.')[0].split(':')[0]*60+item.split(']')[0].split('.')[0].split(':')[1]*1-1) - currentTime)<=1&&((item.split(']')[0].split('.')[0].split(':')[0]*60+item.split(']')[0].split('.')[0].split(':')[1]*1-1) - currentTime)>=-1" :class="{isRed:(item.split(']')[0].split('.')[0].split(':')[0]*60+item.split(']')[0].split('.')[0].split(':')[1]*1-1)==currentTime?true:false}" style="color:red;z-index:999;" class="text-center">{{item.split(']')[1]}}</p>
            </li>
        </ul>
        <img src="http://www.kugou.com/yy/static/images/play/default.jpg" alt="" style="width:240px;height:240px" class="rounded-circle mt-2" v-show="!picid">
        <div style="position:absolute;bottom:60px;width:100vw;">
            <audio :src="url" v-show="songmid" ref="music" controls style=""></audio>
        </div>
        <h2 v-show="!songmid">抱歉,你找的歌曲不存在</h2>
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
</template>


<script>
import axios from 'axios'
export default {
    name:'play',
    data(){
        return{
            api:"https://bird.ioliu.cn/v1?url=",
            songmid:this.$route.params.songmid,
            songname:this.$route.params.songname,
            index:this.$route.params.index,
            url:'',
            songmsg:[],
            picid:'',
            picurl:'',
            onoff:false,
            timer:'',
            songlrc:'',
            Showlrc:false,
            currentTime:0
        }
    },
    created(){
        if(this.songmid){
            this.url = '/bzq/music/tencent/url?key=579621905&id='+this.songmid;
            // this.url = 'https://api.bzqll.com/music/tencent/url?key=579621905&id=0021rBlZ1gQiLy';
            // console.log(this.songmid)
        }
        axios("/proxy/soso/fcgi-bin/client_search_cp?catZhida=1&w="+this.songname).then(data=>{
            this.songmsg = JSON.parse(data.data.slice(9,data.data.length-1)).data.song.list[this.index].singer[0]
            this.picid = JSON.parse(data.data.slice(9,data.data.length-1)).data.song.list[this.index].albummid
            this.picurl = 'https://y.gtimg.cn/music/photo_new/T002R150x150M000'+this.picid+'.jpg'
        })
        axios("/bzq/music/tencent/lrc?key=579621905&id="+this.songmid).then(data=>{
        // axios("/bzq/music/tencent/lrc?key=579621905&id=0021rBlZ1gQiLy").then(data=>{
            //console.log(data.data)
            this.songlrc = data.data;
        })
    },
    methods:{
        isPlay(){
            if(!this.onoff){
                this.$refs.music.play();
                this.timer = setInterval(()=>{
                    if(this.$refs.music.currentTime >= this.$refs.music.duration){
                        this.onoff = false
                    }else{
                        this.$refs.pic.style.transform = `rotateZ(${this.$refs.music.currentTime*8}deg)`
                        this.currentTime = parseInt(this.$refs.music.currentTime)-2
                    }
                },100)
            }else{
                this.$refs.music.pause();
            }
            this.onoff = !this.onoff
        },
        isShowlrc(){
            //this.Showlrc = !this.Showlrc
        }
    },
    destroyed(){
        console.log('销毁')
        clearInterval(this.timer);
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
