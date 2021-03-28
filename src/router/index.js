import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import LoginPage from '../views/LoginPage.vue';
import SignUpPage from '../views/SignUpPage';
import AccountInfo from '../views/AccountInfo.vue';
import ChatRoom from '../views/ChatRoom.vue';
import ChatRoomList from '../views/ChatRoomList.vue';

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
      path: '/SignUp',
      name: 'SignUp',
      component: SignUpPage,
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
      path: '/ChatRoomList',
      name: 'ChatRoomList',
      component: ChatRoomList,
    },
  ]
});
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  console.log("=== navigation guard ===");
  if (Store.state.userInfo.userInfo.id == ""
    && (
      to.name == "AccountInfo" ||
      to.name == "ChatRoom" ||
      to.name == "ChatRoomList"
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