<template>
    <div id="search">
        <div class="container">
            <input type="text" class="form-control mt-2" placeholder="搜索歌曲" v-model="search" v-on:input="searchsong" v-on:click="recommend">
            <div v-show="isloading">
                <Row>
                    <Col class="demo-spin-col" span="24">
                        <Spin fix>
                            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                            <div>加载中。。。</div>
                        </Spin>
                    </Col>
                </Row>
            </div>
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
            search:'',
            hotkey:[],
            song:[],
            isloading:false
        }
    },
    created(){

    },
    methods:{
        recommend(){
            if(this.hotkey.length == 0){
                this.isloading = true
            }else{
                this.isloading = false;
            }
            axios("https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg").then(data=>{
                this.isloading = false
                this.hotkey = data.data.data.hotkey.slice(0,8);
            })
        },
        searchsong(){
            axios("https://c.y.qq.com/soso/fcgi-bin/client_search_cp?catZhida=1&w="+this.search).then(data=>{
                this.song = JSON.parse(data.data.slice(9,data.data.length-1)).data.song.list
            })
        },
        up(item){
            this.isloading = true;
            this.search = item;
            axios("https://c.y.qq.com/soso/fcgi-bin/client_search_cp?catZhida=1&w="+this.search).then(data=>{
                this.isloading = false;
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