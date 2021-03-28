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
import MessageList from "@/components/Chat/MessageList.vue";
import MessageForm from "@/components/Chat/MessageForm.vue";
// import Constant from "@/Constant";

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
  },
  mounted() {},
  created() {
    // const $ths = this;
    // this.$connect().then(()=> {
    //   this.$socket.on('chat', (data) => {
    //     this.pushMsgData(data);
    //     $ths.datas.push(data);
    //   });
    //   this.$socket.on('personCnt', (data) => {
    //     this.$store.commit("setUserCnt", data);
    //   });
    //   this.$socket.on('rooms', (data) => {
    //     console.log("rooms : ", data)
    //   });
    // });
    this.$socket.emit("join", {
      roomName: this.$route.params.roomName,
    });
  },
  destroyed() {
    // this.$socket.disconnect();
  },
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
