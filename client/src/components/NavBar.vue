<template>
    <div id="navbar" class="container-fluid">
        <ul class="nav nav-tabs justify-content-around fixed-bottom bg-light pt-1">
            <li class="nav-item">
                <router-link to="/" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="md-home" class="iconfont" /></div>
                    </div>
                    <div class="row">
                        <div class="col-12">首页</div>
                    </div>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/Recommend" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="ios-thumbs-up" class="iconfont"/></div>
                    </div>
                    <div class="row">
                        <div class="col-12">推荐</div>
                    </div>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/Music" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="md-headset" class="iconfont"/></div>
                    </div>
                    <div class="row">
                        <div class="col-12">随心听</div>
                    </div>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/VideoPlayer" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="logo-youtube" class="iconfont" /></div>
                    </div>
                    <div class="row">
                        <div class="col-12">视频</div>
                    </div>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/Mine" exact>
                    <div class="row">
                        <div class="col-12"><Icon type="ios-contact" class="iconfont"/></div>
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
            
        }
    }
}
</script>

<style scoped>
    .iconfont{
        font-size:20px;
    }
    ul li a{
        color:#333;
        text-decoration:none;
    }
    .router-link-active{
        color:#f00;
    }
</style>
