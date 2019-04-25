// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import {store} from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if(to.path == '/' || to.path == '/rank' || to.path == '/search' || to.path == '/Mine'){
    store.state.leftIcon = 'md-menu'
  }else{
    store.state.leftIcon = 'ios-arrow-back'
  }
  if(to.path == '/play'){
    store.state.IsMini = false;
  }else{
    store.state.IsMini = true;
  }
  next()
})
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
