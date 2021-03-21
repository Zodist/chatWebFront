<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm6>
      <form>
        <v-text-field
          v-model="id"
          disabled
          label="ID"
        ></v-text-field>
        <v-text-field
          v-model="password"
          disabled
          label="PASSWORD"
        ></v-text-field>
        <v-text-field
          v-model="name"
          disabled
          label="NAME"
        ></v-text-field>
        <!-- <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Do you agree?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>

      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn> -->
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    id: function () {
      return this.$store.state.userInfo.userInfo.id;
    },
    password: function () {
      return this.$store.state.userInfo.userInfo.password;
    },
    name: function () {
      return this.$store.state.userInfo.userInfo.name;
    },
  },
  created() {
  },
  methods: {
  },
};
</script>

<style></style>