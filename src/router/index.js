import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import ChatRoom from '../views/ChatRoom.vue';
import Store from '../store/index';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/chat-room/:username',
      name: 'ChatRoom',
      component: ChatRoom,
    },
  ]
});
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  console.log("=== navigation guard ===");
  // console.log("from : " + from.path);
  // console.log("to : " + to.path);
  // console.log("to : " + to.name);
  // console.log("to : " + to.params.username);
  if (to.name == "ChatRoom" && Store.state.userInfo.userId == "") next("/");
  next();
})
export default router;