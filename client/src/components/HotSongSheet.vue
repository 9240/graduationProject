<template>
    <div>
        <Card :title="'歌单  共'+songlist.length+'首'" icon="md-headset" :padding="0" >
            <CellGroup>
                <div v-for="(item,index) in songlist">
                    <router-link :to="{name:'play',params:{songmid:item.mid,songname:item.name,index:index}}">
                        <Cell :title="item.name" :label="item.album.name" />
                    </router-link>
                </div>
            </CellGroup>
        </Card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'HotSongSheet',
    data(){
        return{
            id:this.$route.params.id,
            postData:'',
            api:"https://bird.ioliu.cn/v1?url=",
            songlist:[]
        }
    },
    created(){
        switch (this.id) {
            case '0':
                this.postData = '{"req_0":{"module":"track_info.UniformRuleCtrlServer","method":"GetTrackInfo","param":{"ids":[694646,101147345,95662,1249935,168793,107541275,190211,168797,492476,189959,469237,7141122,1314922,184503,1247462],"types":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},"comm":{"g_tk":5381,"uin":0,"format":"json","ct":23,"cv":0}}';
                break;
            case '1':
                this.postData = '{"req_0":{"module":"track_info.UniformRuleCtrlServer","method":"GetTrackInfo","param":{"ids":[1861642,726188,7072007,109072253,7035462,102295959,102873338,5057872,101804785,5002691,5002687,102973296,7198890,101807228,101806757],"types":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},"comm":{"g_tk":5381,"uin":0,"format":"json","ct":23,"cv":0}}';
                break;
            case '2':
                this.postData = '{"req_0":{"module":"track_info.UniformRuleCtrlServer","method":"GetTrackInfo","param":{"ids":[104903683,201613665,200913639,200195551,108654017,107359012,108748705,108030909,107960774,106148089,108964289,108284581,105561624,107312816],"types":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},"comm":{"g_tk":5381,"uin":0,"format":"json","ct":23,"cv":0}}';
                break;
            case '3':
                this.postData = '{"req_0":{"module":"track_info.UniformRuleCtrlServer","method":"GetTrackInfo","param":{"ids":[104769200,105564586,1865641,1770753,7315288,105477358,1883828,102335206,739120,4943082,5037883,1761010,478068,104384419,105747880],"types":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},"comm":{"g_tk":5381,"uin":0,"format":"json","ct":23,"cv":0}}';
                break;
            case '4':
                this.postData = '{"req_0":{"module":"track_info.UniformRuleCtrlServer","method":"GetTrackInfo","param":{"ids":[1458215,605652,3039036,605650,2308585,1458218,605926,425131,425133,425138,425132,2513565,425135,425136,1458212],"types":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},"comm":{"g_tk":5381,"uin":0,"format":"json","ct":23,"cv":0}}';
                break;
            default:
                break;
        }
        axios.post('/uqq/cgi-bin/musicu.fcg?_='+new Date().getTime(),this.postData).then(res=>{
            this.songlist = res.data.req_0.data.tracks;
        })
    },
    methods:{
        
    }
}
</script>
<style scoped>
    #HotSongSheet{
        margin-top:70px;
        padding: 10px;
        background: #f8f8f9;
    }
    #HotSongSheet .ivu-card-head,.ivu-card-bordered{
        border:0;
    }
</style>