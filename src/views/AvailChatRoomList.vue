<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="clockDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Available Chat Room</v-toolbar-title>
      </v-toolbar>
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
            :key="item.title"
            @click="enterChatRoom(item.title)"
            style="min-width: 375px"
          >
            <v-list-item-avatar>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                v-html="item.title + ' (' + item.userCnt + ')'"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <!-- <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action> -->
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AvailChatRoomList",
  props: {
    dialog: Boolean,
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    items() {
      return this.$store.getters.getAvailableRooms;
    },
  },
  watch: {
    dialog(val) {
      if (val) {
        this.$socket.emit("getAvailableRoom");
      }
    },
  },
  mounted() {},
  created() {},
  destroyed() {},
  methods: {
    enterChatRoom(roomName) {
      this.$emit("close");
      this.$router.push({ name: "ChatRoom", params: { roomName: roomName } });
    },
    clockDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>
