import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import LoginPage from '../views/LoginPage.vue';
import SignUpPage from '../views/SignUpPage';
import AccountInfo from '../views/AccountInfo.vue';
import ChatRoom from '../views/ChatRoom.vue';
import ChatRoomList from '../views/ChatRoomList.vue';
import TodoList from '../views/TodoList.vue';
import CanvasTest from '../views/CanvasTest.vue';
import ImageTest from '../views/ImageTest.vue';
import UserTest from '../views/UserList.vue';
// import Constant from "../Constant"

// import Store from '../store/index';
// import axios from 'axios'

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
    {
      path: '/TodoList',
      name: 'TodoList',
      component: TodoList,
    },
    {
      path: '/CanvasTest',
      name: 'CanvasTest',
      component: CanvasTest,
    },
    {
      path: '/ImageTest',
      name: 'ImageTest',
      component: ImageTest,
    },
    {
      path: '/UserTest',
      name: 'UserTest',
      component: UserTest,
    },
  ]
});
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  /*
  if (Store.state.userInfo.userInfo.id === ""
    && (
      to.name === "AccountInfo" ||
      to.name === "ChatRoom" ||
      to.name === "ChatRoomList"
    )) {
    axios.get(Constant.URL_LOGIN)
      .then((res) => {
        const user = res.data.user;
        if (user) {
          Store.commit("setUserId", res.data.user);
        } else {
          console.log("=== navigation guard On ===");
          next("/Login");
          return;
        }
      }).catch((err) => {
        console.error(err);
      });
  }

  if (to.name == "Login") {
    axios.get(Constant.URL_LOGIN)
      .then((res) => {
        const user = res.data.user;
        if (user) {
          console.log("=== navigation guard On ===");
          Store.commit("setUserId", res.data.user);
          next("/");
          return;
        } 
      }).catch((err) => {
        console.error(err);
      });
  }
  */
  next();
})
export default router;