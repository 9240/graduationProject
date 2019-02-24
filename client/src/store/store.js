import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        userInfo:{
            username:"",
            password:"",
            repassword:""
        }
    },
    mutations:{
        userInfoG(state,payload){
            state.userInfo.username = payload.username;
            state.userInfo.password = payload.password;
            state.userInfo.repassword = payload.repassword;
        }
    },
    actions:{

    },
    getters:{
        //从vuex中获取用户名，必须经过此getters
        getLoginUserName(state){
            return state.userInfo.username?state.userInfo.username:"你还未登陆"
        }
    }
})