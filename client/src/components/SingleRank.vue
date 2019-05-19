<template>
    <div id="singlerank">
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
        <table class="table table-striped">
            <tbody>
                <tr v-for="(item,index) in songlist" :key="index" @click="setSongInfo({songmid:item.data.songmid,songname:item.data.songname,singername:item.data.singer[0].name,picid:item.data.albummid})">
                    <td class="border-0"><span class="float-left"><span class="text-danger pr-2">{{index+1}}</span>{{item.data.songname}}</span></td>
                    <td class="border-0"><span class="float-right">{{item.data.singer[0].name}}</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'singlerank',
    data(){
        return{
            api:"https://bird.ioliu.cn/v1?url=",
            id:this.$route.params.id,
            url:this.$route.params.url,
            songlist:[],
            isloading:true,
        }
    },
    created(){
        axios("/proxy/"+this.url).then(data=>{
            this.isloading = false;
            this.songlist = data.data.songlist
        })
    },
    methods: {
        setSongInfo(payload){
            this.$store.commit("songInfoG",payload)
            this.$store.commit("changeIsMini",false)
        }
    }
}
</script>

<style scoped>
#singlerank{
    text-align: center;
}
</style>
