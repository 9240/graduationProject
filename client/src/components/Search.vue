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
                    <tr v-for="(item,index) in song" :key="index">
                        <router-link :to="{name:'play',params:{songmid:item.songmid,songname:item.songname,index:index}}">
                            <td class="float-left border-0"><span class="text-danger pr-2">{{index+1}}</span>{{item.songname.slice(0,6)}}</td>
                            <td class="float-right border-0">{{item.singer[0].name.slice(0.6)}}</td>
                        </router-link>
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
        axios("http://www.9240.fun:3000/usermsg/all").then(data=>{
		    console.log(data);
	    })
    },
    methods:{
        recommend(){
            axios("/proxy/splcloud/fcgi-bin/gethotkey.fcg").then(data=>{
                //console.log(data.data.data.hotkey.slice(0,5));
                this.hotkey = data.data.data.hotkey.slice(0,8);
            })
        },
        searchsong(){
            axios("/proxy/soso/fcgi-bin/client_search_cp?catZhida=1&w="+this.search).then(data=>{
                //console.log(JSON.parse(data.data.slice(9,data.data.length-1)))
                this.song = JSON.parse(data.data.slice(9,data.data.length-1)).data.song.list
            })
        },
        up(item){
            this.search = item
            axios("/proxy/soso/fcgi-bin/client_search_cp?catZhida=1&w="+this.search).then(data=>{
                this.song = JSON.parse(data.data.slice(9,data.data.length-1)).data.song.list
            })
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