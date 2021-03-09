<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm6>
      <v-text-field
        ref="userName"
        v-model="userName"
        :rules="[() => !!userName || '대화명은 빈값일 수 없습니다.']"
        label="대화명"
        required
        v-on:keyup.enter="joinSubmit"
      ></v-text-field>
      <div class="text-xs-center">
        <v-btn :disabled="nameValidation" @click="joinSubmit" rounded color="primary" >JOIN</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'LoginForm',
  props: ['join'],
  data() {
    return {
      userName: '',
    };
  },
  computed: {
    nameValidation: function() {
      // console.log(this.$refs.userName.validate());
      // return !this.$refs.userName.validate();
      return this.userName == "";
    }
  },
  methods: {
    ...mapMutations({
      setUserId: "setUserId",
    }),
    joinSubmit() {
      if (!this.$refs.userName.validate()) {
        this.$refs.userName.validate(true);
        return;
      }
      this.setUserId(this.userName);
      this.$emit('joinSubmit', this.userName);
    },
  },
};
</script>
