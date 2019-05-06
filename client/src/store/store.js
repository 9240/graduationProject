import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        userInfo:{
            username:localStorage.getItem("username")||"",
            password:localStorage.getItem("password")||"",
            favlist:[]
        },
        songInfo:{
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
            state.userInfo.favlist = payload.favlist
            localStorage.setItem("username",payload.username);
            localStorage.setItem("password",payload.password);
        },
        songInfoG(state,payload){
            state.songInfo.songmid = payload.songmid;
            state.songInfo.songname = payload.songname;
            state.songInfo.singername = payload.singername;
            state.songInfo.picid = payload.picid;
            state.songInfo.songstate = payload.songstate;
            state.songInfo.picurl =  payload.picid.length==14?'https://y.gtimg.cn/music/photo_new/T002R150x150M000'+payload.picid+'.jpg':payload.picid
        },
        changeIsMini(state,payload){
            state.IsMini = payload
        },
        favlistG(state,payload){
            state.userInfo.favlist.push(payload)
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
        },
        getfavlist(state){
            return state.userInfo.favlist;
        }
    }
})