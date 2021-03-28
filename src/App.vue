<template>
  <v-app>
    <div>
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="loginOrLogout">
          <v-icon v-if="existUserId">mdi-logout</v-icon>
          <v-icon v-else>mdi-login</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <div v-show="inChatRoomList">
      <v-toolbar dark>
        <v-btn icon @click="dialog = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
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
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
    </v-snackbar>

    <!-- dialogue -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">New ChatRoom</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="roomName"
                  label="Chat Name"
                  required
                  v-on:keyup.enter="makeRoom"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="makeRoom"> Make </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      drawer: null,
      group: null,
      snackbar: false,
      timeout: 1500,
      text: "로그아웃되었습니다.",
      dialog: false,
      roomName: "",
      transitionName: "",
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
  computed: {
    inChatRoom: function () {
      return this.$route.name === "ChatRoom";
    },
    inChatRoomList: function () {
      return this.$route.name === "ChatRoomList";
    },
    title: function () {
      return this.$route.name;
    },
    existUserId: function () {
      return (
        this.$store.state.userInfo.userInfo !== "" &&
        this.$store.state.userInfo.userInfo.id !== ""
      );
    },
    userCnt() {
      if (this.$store.getters.getRooms.length === 0) return 0;
      return this.$store.getters.getRooms.filter((el) => {
        return el.title === this.$route.params.roomName;
      })[0].userCnt;
    },
  },
  methods: {
    loginOrLogout() {
      if (!this.existUserId) {
        this.$router.push({ name: "Login" });
        return;
      }

      this.$http
        .get("/api/logout")
        .then((res) => {
          console.log(res);
          this.$store.commit("setUserId", {
            id: "",
            password: "",
            name: "",
          });
          this.$router.push({ name: "Home" });
          this.snackbar = true;
          this.$socket.disconnect();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    moveTo(pageName) {
      this.$router.push({ name: pageName });
    },
    makeRoom() {
      this.$socket.emit("makeRoom", {
        roomName: this.roomName,
      });
      this.roomName = "";
      this.dialog = false;
    },
  },
};
</script>

<style>
/* .v-application--wrap {
  min-height: -webkit-fill-available !important;
} */
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