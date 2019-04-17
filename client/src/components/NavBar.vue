<template>
    <div id="navbar" class="container">
        <div class="row fixed-top bg-primary p-3">
            <div class="col-2" v-on:click="showmsg">
                <Icon type="md-menu" class="pl-2 h6"/>
            </div>
            <!-- 左侧返回 -->
			<Drawer :closable="false" width="60" v-model="onoff" placement="left">
				<Row class="mt-5">
					<Col span="8">
						<Avatar style="background-color: #87d068" icon="ios-person"/>
					</Col>
					<!-- <Col span="16" class="mt-2">{{$store.state.userInfo.username?$store.state.userInfo.username:"你还没有登陆"}}</Col> -->
					<Col span="16" class="mt-2">{{$store.getters.getLoginUserName}}</Col>
				</Row>
				<Divider/>
				<CellGroup>
					<Cell title="选项一"/>
					<hr>
					<Cell title="选项二"/>
					<hr>
					<Cell title="选项三"/>
					<hr>
					<Cell title="选项四"/>
					<hr>
				</CellGroup>
			</Drawer>
            <div class="col-8">
                <h5 class="">9240音乐</h5>
            </div>
            <div class="col-2">
                <Icon type="md-add" class="pr-2 h6"/>
            </div>
        </div>
        <ul class="nav nav-tabs justify-content-around fixed-bottom bg-light p-2">
            <li class="nav-item">
                <router-link to="/" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="ios-star" class="iconfont" /></div>
                    </div>
                    <div class="row">
                        <div class="col-12">新歌</div>
                    </div>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/rank" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="ios-thumbs-up" class="iconfont"/></div>
                    </div>
                    <div class="row">
                        <div class="col-12">排行榜</div>
                    </div>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/search" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="md-search" class="iconfont"/></div>
                    </div>
                    <div class="row">
                        <div class="col-12">搜索</div>
                    </div>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/Mine" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="ios-contact" class="iconfont" /></div>
                    </div>
                    <div class="row">
                        <div class="col-12">我的</div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'navbar',
    data(){
        return{
            onoff: false,
			isShowNav:true
        }
    },
    methods:{
        showmsg() {
			this.onoff = !this.onoff;
		},
    }
}
</script>
<style scoped>
    .router-link-active{
        color:#f00;
    }
    .iconfont{
        font-size: 20px;
    }
</style>
