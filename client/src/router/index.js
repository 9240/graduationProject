import Vue from 'vue'
import Router from 'vue-router'
import NavBar from '@/components/NavBar'
import Home from '@/components/Home'
import Recommend from '@/components/Recommend'
import Music from '@/components/Music'
import VideoPlayer from '@/components/VideoPlayer'
import Mine from '@/components/Mine'
import LoginRegister from '@/components/LoginRegister'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components:{
        nav:NavBar,
        default:Home
      }
    },
    {
      path: '/Recommend',
      name: 'Recommend',
      components:{
        nav:NavBar,
        default:Recommend
      }
    },
    {
      path: '/Music',
      name: 'Music',
      components:{
        nav:NavBar,
        default:Music
      }
    },
    {
      path: '/VideoPlayer',
      name: 'VideoPlayer',
      components:{
        nav:NavBar,
        default:VideoPlayer
      }
    },
    {
      path: '/Mine',
      name: 'Mine',
      components:{
        nav:NavBar,
        default:Mine
      }
    },
    {
      path: '/LoginRegister',
      name: 'LoginRegister',
      components:{
        default:LoginRegister
      }
    }
  ]
})
