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

    <div v-show="inChatRoom">
      <v-toolbar dark>
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

          <v-list-item @click="moveTo('ChatRoom')">
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
        <router-view></router-view>
      </v-container>
      <!-- 라우터 -->
    </v-main>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
    </v-snackbar>
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
    };
  },
  computed: {
    inChatRoom: function () {
      return this.$route.name === "ChatRoom";
    },
    title: function () {
      return this.$route.name;
    },
    existUserId: function () {
      return (
        this.$store.state.userInfo.userInfo !== "" &&
        this.$store.state.userInfo.userInfo.id !== "");
    },
    userCnt: function () {
      return this.$store.state.socket.userCnt;
    },
  },
  methods: {
    loginOrLogout() {
      console.log(this.$store.state.userInfo)
      if (!this.existUserId) {
        this.$router.push({ name: "Login" });
        return;
      }

      this.$http
        .get("/api/logout")
        .then((res) => {
          console.log(res);
          this.$store.commit("setUserId", "");
          this.$router.push({ name: "Home" });
          this.snackbar = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    moveTo(pageName) {
      this.$router.push({ name: pageName });
    },
  },
};
</script>
