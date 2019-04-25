import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        userInfo:{
            username:"",
            password:"",
            repassword:""
        },
        songInfo:{
            // name:"",
            // singer:"",
            // lrc:"",
            // pic:"",
            // playState:null,
            // isMini:null,
            songmid:"",
            songname:"",
            singername:"",
            picid:"",
            picurl:"",
            songstate:false
        },
        leftIcon:"md-menu",
        IsMini:true
    },
    mutations:{
        userInfoG(state,payload){
            state.userInfo.username = payload.username;
            state.userInfo.password = payload.password;
            state.userInfo.repassword = payload.repassword;
        },
        songInfoG(state,payload){
            state.songInfo.songmid = payload.songmid;
            state.songInfo.songname = payload.songname;
            state.songInfo.singername = payload.singername;
            state.songInfo.picid = payload.picid;
            state.songInfo.songstate = payload.songstate;
            state.songInfo.picurl =  'https://y.gtimg.cn/music/photo_new/T002R150x150M000'+payload.picid+'.jpg'  
        },
        changeIsMini(state,payload){
            state.IsMini = payload
        }
    },
    actions:{

    },
    getters:{
        //从vuex中获取用户名，必须经过此getters
        getLoginUserName(state){
            return state.userInfo.username?state.userInfo.username:"你还未登陆"
        },
        getSongInfo(state){
            return state.songInfo
        }
    }
})