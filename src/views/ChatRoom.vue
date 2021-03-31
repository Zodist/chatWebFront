<template>
  <div class="inner-wrap" fluid fill-height inner-wrap>
    <Message-List :msgs="msgDatas" class="msg-list"></Message-List>
    <Message-From
      v-on:submitMessage="sendMessage"
      class="msg-form"
    ></Message-From>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MessageList from "@/components/Chat/MessageList.vue";
import MessageForm from "@/components/Chat/MessageForm.vue";

export default {
  name: "ChatRoom",
  data() {
    return {
      datas: [],
    };
  },
  components: {
    "Message-List": MessageList,
    "Message-From": MessageForm,
  },
  computed: {
    msgDatas() {
      return this.$store.getters.getMsgByRoomName(this.$route.params.roomName);
    },
    userName() {
      return this.$store.getters.getUserName;
    },
    ...mapState({
      msgState: state => state.socket.msgDatas,
    }),
  },
  watch: {
    msgState: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler() {
        this.$store.commit("readMsgs", this.$route.params.roomName);
      }
    }
  },
  mounted() {},
  created() {
    this.$socket.emit("join", {
      roomName: this.$route.params.roomName,
    });
    this.$store.commit("readMsgs", this.$route.params.roomName);
  },
  destroyed() {},
  methods: {
    sendMessage(msg) {
      const date = new Date();
      const time =
        date.getHours() +
        ":" +
        (date.getMinutes() < 10 ? "0" : "") +
        date.getMinutes();
      this.$store.commit("pushMsgData", {
        from: {
          name: "나",
        },
        msg: [msg],
        roomName: this.$route.params.roomName,
        time: time,
      });
      this.$sendMessage({
        name: this.userName,
        msg,
        roomName: this.$route.params.roomName,
      });
    },
  },
};
</script>

<style>
.msg-form {
  bottom: -28px;
  position: absolute;
  left: 0;
  right: 0;
}
.msg-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px;
  overflow-x: scroll;
}
</style>
