<template>
    <div id="recommend">
        <div id="demo" class="carousel slide" data-ride="carousel">
            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
                <li data-target="#demo" data-slide-to="3"></li>
                <li data-target="#demo" data-slide-to="4"></li>
            </ul>
            <!-- 轮播图片 -->
            <div class="carousel-inner">
                <div class="carousel-item active"><img :src="img[0]" class="img-fluid"></div>
                <div class="carousel-item"><img  :src="img[1]" class="img-fluid"></div>
                <div class="carousel-item"><img  :src="img[2]" class="img-fluid"></div>
                <div class="carousel-item"><img  :src="img[3]" class="img-fluid"></div>
                <div class="carousel-item"><img  :src="img[4]" class="img-fluid"></div>
            </div>
        </div>
        <h6 class="p-2">电台</h6>
        <div class="d-grid">
            <div v-for="(item,index) in radioList" :key="index">
                <img :src="item.picUrl" alt="" class="p-1">
                <label>{{item.Ftitle}}</label>
            </div>
        </div>
        <h6 class="p-2">热门歌单</h6>
        <div class="d-grid">
            <div v-for="(item,index) in songList.slice(1,6)" :key="index" class="p-1">
                <router-link :to="'/hotsongsheet/'+index">
                    <img :src="item.picUrl" alt="">
                    <small>{{item.songListDesc}}</small>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'recommend',
    data(){
        return{
            api:"https://bird.ioliu.cn/v1?url=",
            img:[],
            radioList:[],
            songList:[]
        }
    },
    created(){
        axios("/proxy/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg").then(data=>{
            //console.log(data.data);
            for (let index in data.data.data.slider){
                this.img.push(data.data.data.slider[index].picUrl)
            }
            for(let index in data.data.data.radioList){
                this.radioList.push(data.data.data.radioList[index])
            }
            for(let index in data.data.data.songList){
                this.songList.push(data.data.data.songList[index])
            }
        })
    }
}
</script>


<style scoped>
.d-grid img{
    width: 100%;
}
.d-grid{
    display:grid;
    grid-template-columns: 50% 50%;

}
.hide{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
