<template>
    <div>
        <Card :title="'歌单  共'+songlist.length+'首'" icon="md-headset" :padding="0" >
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
            <CellGroup>
                <Row v-for="(item,index) in songlist" :key="index">
                    <Col span="21">
                        <div @click="setSongInfo({songmid:item.mid,songname:item.name,singername:item.singer[0].name,picid:item.album.mid})">
                            <Cell :title="item.name" :label="item.album.name"/>
                        </div>
                    </Col>
                    <Col span="3">
                        <Icon :type="favtype" style="line-height:52px;color:red;" @click="addFav(index,item.mid)" ref="fav"/>
                    </Col>
                </Row>
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
            songlist:[],
            favtype:"md-heart-outline",
            isloading:true,
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
            this.isloading = false
            this.songlist = res.data.req_0.data.tracks;
        })
    },
    mounted(){
        this.$Message.config({
            top: 200,
            duration: 3
        });
    },
    methods:{
        setSongInfo(payload){
            this.$store.commit("songInfoG",payload)
            this.$store.commit("changeIsMini",false)
        },
        addFav(index,mid){
            if(localStorage.getItem("username")){
                if(this.$store.state.userInfo.favlist.some(function(item){return item == mid})){
                    this.$Message.success({
                        duration:1,
                        content:'已收藏',
                    })
                }else{
                    this.$refs.fav[index].type = "md-heart";
                        this.$store.commit("favlistG",mid)
                        axios.post("/local/usermsg/addfav",{username:this.$store.state.userInfo.username,favlist:this.$store.state.userInfo.favlist})
                        .then(res=>{
                            if(res.data.code == 200){
                                this.$Message.success({
                                    duration:1,
                                    content:'收藏成功',
                                })
                                axios.get("/local/usermsg/getfav?username="+localStorage.getItem("username"))
                                .then(res=>{
                                    localStorage.setItem("favlist",res.data.favlist)
                                })
                            }
                    })
                }
            }else{
                this.$Message.success({
                    duration:1,
                    content:'你还未登陆',
                    onClose:()=>{
                        this.$router.push({path:'/loginregister'})
                    }
                })
            }
        }
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