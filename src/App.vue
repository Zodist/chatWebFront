<template>
  <v-app>
    <div>
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-show="isLogined" @click="moveTo('Login')">
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn icon v-show="!isLogined" @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <div v-show="inChatRoomList">
      <v-toolbar dark>
        <v-btn icon @click="flag_newChatRoom = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="flag_availChatRoomList = true">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
    </div>

    <div v-show="inChatRoom">
      <v-toolbar dark>
        <v-btn icon @click="moveTo('ChatRoomList')">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <div>
          {{ $route.params.roomName }}
        </div>
        <v-spacer></v-spacer>
        접속자: {{ userCnt }}명
      </v-toolbar>
    </div>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="moveTo('Home')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="moveTo('AccountInfo')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

          <v-list-item @click="moveTo('ChatRoomList')">
            <v-list-item-icon>
              <v-icon>mdi-chat</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Chat</v-list-item-title>
          </v-list-item>

          <v-list-item @click="moveTo('TodoList')">
            <v-list-item-icon>
              <v-icon>mdi-chat</v-icon>
            </v-list-item-icon>
            <v-list-item-title>TodoList</v-list-item-title>
          </v-list-item>

          <v-list-item @click="moveTo('CanvasTest')">
            <v-list-item-icon>
              <v-icon>mdi-chat</v-icon>
            </v-list-item-icon>
            <v-list-item-title>CanvasTest</v-list-item-title>
          </v-list-item>

          <v-list-item @click="moveTo('ImageTest')">
            <v-list-item-icon>
              <v-icon>mdi-chat</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ImageTest</v-list-item-title>
          </v-list-item>

          <v-list-item @click="moveTo('UserTest')">
            <v-list-item-icon>
              <v-icon>mdi-chat</v-icon>
            </v-list-item-icon>
            <v-list-item-title>UserTest</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- 라우터 -->
      <v-container fluid fill-height aacontainer>
        <!-- <transition :name="transitionName"> -->
        <!-- <transition> -->
        <router-view class="child-view"></router-view>
        <!-- </transition> -->
      </v-container>
      <!-- 라우터 -->
    </v-main>

    <!-- 알림 표시 -->
    <v-snackbar v-model="snackBarFlag" :timeout="timeout">
      {{ snackBarText }}
    </v-snackbar>

    <!-- dialogue -->
    <new-chat-room
      :dialog="flag_newChatRoom"
      @close="flag_newChatRoom = false"
    />
    <avail-chat-room-list
      :dialog="flag_availChatRoomList"
      @close="flag_availChatRoomList = false"
    />

    <v-dialog
      v-model="loading"
      fullscreen
      hide-overlay
      persistent
      overlay-opacity="0.5"
      overlay-color="#000000"
      transition="none"
    >
      <v-container
        fluid
        fill-height
        style="background-color: rgba(255, 255, 255, 0.5)"
      >
        <v-layout justify-center align-center>
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-app>
</template>

<script>
import NewChatRoom from "./views/NewChatRoom.vue";
import AvailChatRoomList from "./views/AvailChatRoomList.vue";
import Constant from "./Constant";
export default {
  name: "App",
  components: {
    AvailChatRoomList,
    NewChatRoom,
  },
  data() {
    return {
      drawer: null,
      group: null,
      transitionName: "",

      timeout: 1500,

      flag_newChatRoom: false,
      flag_availChatRoomList: false,

      isLogined: false,
    };
  },
  watch: {
    $route(to, from) {
      if (from.name === "ChatRoomList" && to.name === "ChatRoom") {
        this.transitionName = "slide-right";
      }
      if (from.name === "ChatRoom" && to.name === "ChatRoomList") {
        this.transitionName = "slide-left";
      }
    },
  },
  mounted() {
    this.$http
      .get(
        Constant.URL_LOGIN,
        { "Content-Type": "application-json" }
      )
      .then((res) => {
        console.log("check login:",res.data.logined);
        this.isLogined = res.data.logined
      })
      .catch((err) => {
        console.error(err);
      });
  },
  computed: {
    loading() {
      return this.$store.getters.getGlobalLoadingFlag;
    },
    snackBarFlag: {
      // getter
      get: function () {
        return this.$store.getters.getFlag;
      },
      // setter
      set: function (newValue) {
        console.log("snackBarFlag", newValue);
        this.$store.commit("offGlobalAlert");
      },
    },
    snackBarText() {
      return this.$store.getters.getText;
    },
    inChatRoom: function () {
      return this.$route.name === "ChatRoom";
    },
    inChatRoomList: function () {
      return this.$route.name === "ChatRoomList";
    },
    title: function () {
      return this.$route.name;
    },
    // existUserId: function () {
    //   return (
    //     this.$store.state.userInfo.userInfo !== "" &&
    //     this.$store.state.userInfo.userInfo.id !== ""
    //   );
    // },
    userCnt() {
      if (this.$store.getters.getJoinedRooms.length === 0) return 0;
      var filteredRooms = this.$store.getters.getJoinedRooms.filter((el) => {
        return el.title === this.$route.params.roomName;
      });
      if (filteredRooms.length !== 0) return filteredRooms[0].userCnt;
      else return 0;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push({ name: "Home" });
      this.$store.commit("onGlobalAlert", "로그아웃되었습니다");
    },
    moveTo(pageName) {
      this.$router.push({ name: pageName });
    },
  },
};
</script>

<style>
@media screen and (max-width: 425px) {
  /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
  .v-application--wrap {
    min-height: -webkit-fill-available !important;
  }
}
/* 애니메이션 진입 및 진출은 다른 지속 시간 및  */
/* 타이밍 기능을 사용할 수 있습니다. */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.child-view {
  transition: all 0.75s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>