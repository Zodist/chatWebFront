<template>
  <div>
    <v-list ref="msgList" v-auto-bottom="msgs">
      <!-- <transition-group name="list" > -->
      <div v-for="(msg, idx) in msgs" :key="idx">
        <v-list-item two-line style="align-items: unset">
          <v-list-item-action
            style="align-self: unset; justify-content: unset"
            v-show="msg.sender !== userId"
          >
            <span>{{ msg.sender }}</span>
            <v-avatar color="primary" size="56"></v-avatar>
          </v-list-item-action>
          <v-list-item-content
            :style="msg.sender === userId ? 'text-align:right;' : ''"
          >
            <v-list-item-title
              v-for="(msg2, idx2) in msg.msg"
              :key="idx2"
              style="white-space: none !important; margin-bottom: 5px"
            >
              <v-sheet
                rounded
                color="cyan lighten-5"
                style="display: inline-block"
                ><div style="margin: 10px">{{ msg2.content }}</div></v-sheet
              >
            </v-list-item-title>
            <v-list-item-subtitle>{{ msg.time }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-divider inset></v-divider> -->
      </div>
      <!-- </transition-group> -->
    </v-list>
  </div>
</template>

<script>
export default {
  name: "MessageList",
  props: ["msgs"],
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    },
  },
  created() {},
  mounted() {
    document.getElementsByClassName(
      "msg-list"
    )[0].scrollTop = document.getElementsByClassName(
      "msg-list"
    )[0].scrollHeight;
  },
};
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
