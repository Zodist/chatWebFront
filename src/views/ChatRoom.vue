<template>
  <div class="inner-wrap" fluid fill-height inner-wrap>
    <div>
      <v-toolbar dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <Message-List :msgs="msgDatas" class="msg-list"></Message-List>
    <Message-From
      v-on:submitMessage="sendMessage"
      class="msg-form"
    ></Message-From>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MessageList from '@/components/Chat/MessageList.vue';
import MessageForm from '@/components/Chat/MessageForm.vue';
import Constant from '@/Constant';

export default {
  name: 'ChatRoom',
  data() {
    return {
      datas: [],
    };
  },
  components: {
    'Message-List': MessageList,
    'Message-From': MessageForm,
  },
  computed: {
    ...mapState({
      msgDatas: state => state.socket.msgDatas,
    }),
    userId () {
      return this.$store.getters.getUserId
    }
  },
  mounted() {
  },
  created() {
    const $ths = this;
    this.$connect().then(()=> {
      this.$socket.on('chat', (data) => {
        this.pushMsgData(data);
        $ths.datas.push(data);
      });
      this.$socket.on('personCnt', (data) => {
        this.$store.commit("setUserCnt", data);
      });
    });
  },
  destroyed() {
    this.$socket.disconnect();
  },
  methods: {
    ...mapMutations({
      pushMsgData: Constant.PUSH_MSG_DATA,
    }),
    sendMessage(msg) {
      this.pushMsgData({
        from: {
          name: '나',
        },
        msg,
      });
      this.$sendMessage({
        name: this.userId,
        msg,
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
