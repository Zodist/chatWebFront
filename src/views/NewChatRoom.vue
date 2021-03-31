<template>
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
        <v-btn color="blue darken-1" text @click="clockDialog">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="makeRoom"> Make </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewChatRoom",
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      roomName: "",
    };
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  destroyed() {},
  methods: {
    makeRoom() {
      this.$socket.emit("join", {
        roomName: this.roomName,
      });
      this.roomName = "";
      this.$store.commit("onGlobalAlert", "방이 생성되었습니다");
      this.clockDialog();
    },
    clockDialog() {
      this.$emit("close");
    },
  },
};
</script>