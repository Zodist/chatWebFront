<template>
  <v-layout justify-center>
    <v-list three-line>
      <template v-for="(user, idx) in users">
        <!-- <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider> -->

        <v-list-item :key="idx">
          <v-list-item-avatar>
            <!-- <v-img :src="user.img"></v-img> -->
            <v-img :src="user.img"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="user.id"></v-list-item-title>
            <v-list-item-subtitle v-html="user.name"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-layout>
</template>

<script>
import Constant from "../Constant";
export default {
  name: "UserList",
  data() {
    return {
      users: [],
      dialog: false,
      newTodo: "",
    };
  },
  components: {},
  computed: {
    items() {
      return this.$store.getters.getJoinedRooms;
    },
    userName() {
      return this.$store.getters.getUserName;
    },
  },
  mounted() {
    this.getUsers();
  },
  created() {},
  destroyed() {},
  methods: {
    getUsers() {
      this.$http
        .get(Constant.URL_USERS)
        .then((res) => {
          this.users = res.data;
          this.users.forEach((element) => {
            this.$set(element, 'img', null);
          });
          this.users.forEach((element, idx) => {
            this.getImage(element.image, idx);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getImage(fileName, idx) {
      this.$http
        .post(
          Constant.URL_IMG_DOWNLOAD,
          { fileName },
          { "Content-Type": "application-json" }
        )
        .then((res) => {
          this.$set(this.users[idx], 'img', res.data);
          // Object.assign(this.users[idx], {
          //   img: res.data,
          // });
          // this.users[idx].img = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    setItemDone(item) {
      let param = {
        todoid: item.todoid,
        content: item.content,
        completed: !item.completed,
      };
      this.$http
        .put(Constant.URL_TODOS_TODOID + item.todoid, param, {
          "Content-Type": "application-json",
        })
        .then((res) => {
          console.log(res);
          this.getTodoItems();
        });
    },
    submit() {
      let param = {
        content: this.newTodo,
        completed: false,
      };
      this.$http
        .post(Constant.URL_TODOS, param, {
          "Content-Type": "application-json",
        })
        .then((res) => {
          this.dialog = false;
          this.newTodo = false;
          console.log(res);
          this.getTodoItems();
        });
    },
  },
};
</script>

<style>
.v-btn--example {
  bottom: 0px !important;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>
