import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import AccountInfo from '../views/AccountInfo.vue';
import LoginPage from '../views/LoginPage.vue';
import ChatRoom from '../views/ChatRoom.vue';
import SignUpPage from '../views/SignUpPage';

import Store from '../store/index';
import axios from 'axios'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/Login',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/AccountInfo',
      name: 'AccountInfo',
      component: AccountInfo,
    },
    {
      path: '/ChatRoom',
      name: 'ChatRoom',
      component: ChatRoom,
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUpPage,
    },
  ]
});
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  console.log("=== navigation guard ===");
  if (Store.state.userInfo.userInfo.id == ""
    && (
      to.name == "AccountInfo" ||
      to.name == "ChatRoom"
    )) {
      axios.get("/api/login")
        .then((res) => {
            const user = res.data.user;
            if (user) {
              Store.commit("setUserId", res.data.user);
            } else {
              next("/Login");
            }
        }).catch((err) => {
            console.log(err);
        });
    
    return;
  }
  next();
})
export default router;