<template>
  <v-layout justify-center>
    <v-list>
      <template v-for="(item, index) in todoItems">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item v-else :key="index" style="min-width: 375px">
          <v-list-item-avatar>
            {{ item.todoid }}
            <!-- <v-icon>mdi-account-multiple</v-icon> -->
            <!-- <v-img :src="item.avatar"></v-img> -->
            <!-- <v-img color="light-blue lighten-1"></v-img> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.content"></v-list-item-title>
            <!-- <v-list-item-subtitle>
              {{ item.completed }}
            </v-list-item-subtitle> -->
          </v-list-item-content>

          <v-list-item-action @click="setItemDone(item)">
            <v-icon :color="item.completed ? 'deep-purple accent-4' : 'grey'">
              mdi-message-outline
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
    <v-btn
      fab
      color="cyan accent-2"
      bottom
      left
      absolute
      class="v-btn--example"
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field label="To Do" v-model="newTodo"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="submit()"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Constant from "../Constant"
export default {
  name: "TodoList",
  data() {
    return {
      todoItems: [],
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
  mounted() {},
  created() {
    this.getTodoItems();
  },
  destroyed() {},
  methods: {
    getTodoItems() {
      this.$http.get(Constant.URL_TODOS).then((res) => {
        this.todoItems = res.data;
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
    }
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
