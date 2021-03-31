<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm6>
      <v-text-field
        ref="id"
        v-model="id"
        label="ID"
        required
        v-on:keyup.enter="onSubmit"
      ></v-text-field>
      <v-text-field
        ref="password"
        v-model="password"
        type="password"
        label="PASSWORD"
        required
        v-on:keyup.enter="onSubmit"
      ></v-text-field>
      <div class="text-xs-center">
        <v-btn
          :disabled="nameValidation"
          @click="onSubmit"
          rounded
          color="primary"
          >LOGIN</v-btn
        >
        <v-divider class="mx-1" vertical></v-divider>
        <v-btn @click="signUp" rounded color="primary">SIGN UP</v-btn>
      </div>
      <div>
        <v-alert v-show="showAlert" type="error">
          {{ alertMessage }}
        </v-alert>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      password: "",
      showAlert: false,
      alertMessage: "",
    };
  },
  computed: {
    nameValidation: function () {
      return this.id === "" && this.password === "";
    },
  },
  created() {},
  methods: {
    onSubmit() {
      const id = this.id;
      const password = this.password;
      this.$http
        .post(
          "api/login",
          { id, password },
          { "Content-Type": "application-json" }
        )
        .then((res) => {
          if (res.data.user) {
              this.$store.commit("onGlobalAlert", "로그인되었습니다");
            this.$connectWS().then(() => {
              console.log("socket connceted");
            });
            this.$store.commit("setUserId", res.data.user);
            this.$router.push({ name: "Home" });
          } else if (res.data.message) {
            this.showAlert = true;
            this.alertMessage = res.data.message;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    signUp() {
      this.$router.push({ name: "SignUp" });
    },
  },
};
</script>

<style></style>