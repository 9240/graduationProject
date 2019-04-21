<template>
  <div class="loginRegister pt-5">
    <template v-if="isLogin">
        <h5>欢迎登陆</h5>
        <Input prefix="ios-contact" placeholder="用户名" style="width: 80%" class="mt-3" type="text" name="username" v-model="userInfo.username"/>
        <Input prefix="md-lock" placeholder="密码" style="width: 80%" class="mt-3" type="password" name="password" v-model="userInfo.password"/>
        <Button type="primary" shape="circle" style="width:80%" class="mt-3" v-on:click="login()">登陆</Button>
        <p style="width:90%"><span class="float-right">没有账号？<a href="javascript:void(0)" class="float-right" v-on:click="switchTab">去注册</a></span></p>
    </template>
    <template v-else>
        <h5>欢迎注册</h5>
        <Input prefix="ios-contact" placeholder="用户名" style="width: 80%" class="mt-3" type="text" name="username" v-model="userInfo.username"/>
        <Input prefix="md-lock" placeholder="密码" style="width: 80%" class="mt-3" type="password" name="password" v-model="userInfo.password"/>
        <Input prefix="md-lock" placeholder="重复密码" style="width: 80%" class="mt-3" type="password" name="repassword" v-model="userInfo.repassword"/>
        <Button type="primary" shape="circle" style="width:80%" class="mt-3" v-on:click="register()">注册</Button>
        <p style="width:90%"><span class="float-right">已有账号？<a href="javascript:void(0)" class="float-right" v-on:click="switchTab">去登陆</a></span></p>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'loginRegister',
  data () {
    return {
      api:"https://bird.ioliu.cn/v1?url=",
      userInfo:{
        username:"",
        password:"",
        repassword:"",
      },
      isLogin:true
    }
  },
  mounted(){
    this.$Message.config({
        top: 200,
        duration: 3
    });
  },
  methods:{
      switchTab(){
          this.isLogin = !this.isLogin;
      },
      login(){
          if(!this.userInfo.username || !this.userInfo.password){
              this.$Message.info('请完善信息');
          }else{
              axios.post("/local/usermsg/login",{
                username:this.userInfo.username,
                password:this.userInfo.password
            })
            .then(res=>{
                if(res.data.code == 200){
                    this.$Message.success({
                        duration:1,
                        content:'登陆成功',
                        onClose:()=>{
                            this.$router.push({path:'/'})
                            this.$store.commit("userInfoG",this.userInfo)
                        }
                    })
                }else if(res.data.code == 411){
                    this.$Message.warning({
                        duration:1,
                        content:'密码不正确',
                    })
                }else if(res.data.code == 412){
                    this.$Message.error({
                        duration:1,
                        content:'你还没有注册',
                    })
                }
            })
          }
      },
      register(){
        if(!this.userInfo.username || !this.userInfo.password ||!this.userInfo.repassword){
            this.$Message.error({
                duration:1,
                content:'请完善信息',
            })
        }else if(this.userInfo.password != this.userInfo.repassword){
            this.$Message.warning({
                duration:1,
                content:'两次密码不一致',
            })
        }else if(this.userInfo.password.length < 6){
            this.$Message.warning({
                duration:1,
                content:'密码长度要大于6',
            })
        }else{
            axios.post('/local/usermsg/register',{
                username:this.userInfo.username,
                password:this.userInfo.password
            })
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
                    this.$Message.success({
                        duration:1,
                        content:'注册成功',
                        onClose:()=>{
                            this.$router.push({path:'/'})
                            this.$store.commit("userInfoG",this.userInfo)
                        }
                    })
                }else if(res.data.code == 410){
                    this.$Message.error({
                        duration:1,
                        content:'用户名已被注册',
                    })
                }
            })
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .loginRegister{
        text-align: center;
    }
</style>
