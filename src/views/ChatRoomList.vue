<template>
  <v-layout justify-center>
    <v-list three-line>
      <template v-for="(item, index) in items">
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

        <v-list-item
          v-else
          :key="item.roomName"
          @click="enterChatRoom(item.roomName)"
          style="min-width: 375px"
        >
          <v-list-item-avatar>
            <v-icon>mdi-account-multiple</v-icon>
            <!-- <v-img :src="item.avatar"></v-img> -->
            <!-- <v-img color="light-blue lighten-1"></v-img> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              v-html="item.roomName + ' (' + item.userCnt + ')'"
            ></v-list-item-title>
            <v-list-item-subtitle>
              {{ $store.getters.getLastMsgByRoomName(item.roomName) }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <div style="font-size: small">
              {{ $store.getters.getLastMsgDateByRoomName(item.roomName) }}
            </div>
            <v-list-item-avatar
              color="light-blue lighten-4"
              v-show="
                $store.getters.getUnReadMsgCntByRoomName(item.roomName) !== 0
              "
            >
              {{ $store.getters.getUnReadMsgCntByRoomName(item.roomName) }}
            </v-list-item-avatar>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </v-layout>
</template>

<script>
export default {
  name: "ChatRoomList",
  data() {
    return {};
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
    // this.$connectWS().then(() => {
    //   console.log("socket connceted");
    // });
  },
  destroyed() {},
  methods: {
    enterChatRoom(roomName) {
      this.$router.push({ name: "ChatRoom", params: { roomName: roomName } });
    },
  },
};
</script>

<style>
</style>
