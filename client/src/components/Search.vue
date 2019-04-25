<template>
    <div id="search">
        <div class="container">
            <input type="text" class="form-control mt-2" placeholder="搜索歌曲" v-model="search" v-on:input="searchsong" v-on:click="recommend">
            <table class="table table-striped text-primary" v-show="search==''">
                <tbody>
                    <tr v-for="(item,index) in hotkey" :key="index" v-on:click='up(item.k)'>
                        <td class="float-left border-0"><span class="text-danger pr-2">{{index+1}}</span>{{item.k}}</td>
                        <td class="float-right border-0">{{item.n/10000}}万</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-striped" v-show="!search==''">
                <tbody>
                    <tr v-for="(item,index) in song" :key="index" @click="setSongInfo({songmid:item.songmid,songname:item.songname,singername:item.singer[0].name,picid:item.albummid,songstate:true})">
                        <td class="float-left border-0"><span class="text-danger pr-2">{{index+1}}</span>{{item.songname.slice(0,6)}}</td>
                        <td class="float-right border-0">{{item.singer[0].name.slice(0.6)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name:'search',
    data(){
        return{
            api:"https://bird.ioliu.cn/v1?url=",
            search:'',
            hotkey:[],
            song:[]
        }
    },
    created(){

    },
    methods:{
        recommend(){
            axios("/proxy/splcloud/fcgi-bin/gethotkey.fcg").then(data=>{
                this.hotkey = data.data.data.hotkey.slice(0,8);
            })
        },
        searchsong(){
            axios("/proxy/soso/fcgi-bin/client_search_cp?catZhida=1&w="+this.search).then(data=>{
                this.song = JSON.parse(data.data.slice(9,data.data.length-1)).data.song.list
            })
        },
        up(item){
            this.search = item
            axios("/proxy/soso/fcgi-bin/client_search_cp?catZhida=1&w="+this.search).then(data=>{
                this.song = JSON.parse(data.data.slice(9,data.data.length-1)).data.song.list
            })
        },
        setSongInfo(payload){
            this.$store.commit("songInfoG",payload)
            this.$store.commit("changeIsMini",false)
        }
    }
}
</script>
<style scoped>
    #search{
        margin-top:70px;
        text-align: center;
    }
</style>