<template>
	<div class="mine">
		<template v-if="!userInfo.name&&!userInfo.password">
			<h5 class="pt-5">你还没有登陆 <router-link to='/LoginRegister'>去登陆</router-link></h5>
		</template>
		<template v-else>
			<h3 style="padding:10px;">收藏列表</h3>
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
					<tr v-for="(item,index) in favlist" :key="index" @click="setSongInfo({songmid:item.mid,songname:item.name,singername:item.singer[0].name,picid:item.album.mid})">
						<td class="border-0"><span class="float-left"><span class="text-danger pr-2">{{index+1}}</span>{{item.name.slice(0,20)}}</span></td>
						<td class="border-0"><span class="float-right">{{item.singer[0].name}}</span></td>
					</tr>
				</tbody>
			</table>
		</template>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'mine',
	data(){
        return{
			favlist:[],
			isloading:true,
        }
    },
	created(){
		if(localStorage.getItem("username")){
			axios.get("/local/usermsg/getfav?username="+localStorage.getItem("username"))
			.then(res=>{
				this.isloading = false
				res.data.favlist.map(item=>{
					axios.get("/bzqq/tencent/song?id="+item).then(res=>{
						this.favlist.push(res.data.data[0])
					})
				})
			})
		}
	},
	methods: {
        setSongInfo(payload){
            this.$store.commit("songInfoG",payload)
            this.$store.commit("changeIsMini",false)
        }
    },
	computed:{
		userInfo(){
			return this.$store.state.userInfo
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mine{
        text-align: center;
    }
</style>
