import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/Recommend'
import Rank from '@/components/Rank'
import NavBar from '@/components/NavBar'
import Search from '@/components/Search'
import SingleRank from '@/components/SingleRank'
import Mine from '@/components/Mine'
import LoginRegister from '@/components/LoginRegister'
import HotSongSheet from '@/components/HotSongSheet'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      components:{
        nav:NavBar,
        default:Recommend
      } 
    },
    {
      path:'/rank',
      name:'rank',
      components:{
        nav:NavBar,
        default:Rank
      }
    },
    {
      path:'/search',
      name:'search',
      components:{
        nav:NavBar,
        default:Search
      }
    },
    {
      path:'/singlerank/:url',
      name:'singlerank',
      components:{
        nav:NavBar,
        default:SingleRank
      }
    },
    {
      path:'/mine',
      name:'mine',
      components:{
        nav:NavBar,
        default:Mine
      }
    },
    {
      path:'/loginregister',
      name:'loginregister',
      components:{
        nav:NavBar,
        default:LoginRegister
      }
    },
    {
      path:'/hotsongsheet/:id',
      name:'hotsongsheet',
      components:{
        nav:NavBar,
        default:HotSongSheet
      }
    }
  ]
})
