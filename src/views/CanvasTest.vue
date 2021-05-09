<template>
  <v-layout align-center justify-center>
    <v-row justify="center">
      <v-img :src="img"> </v-img>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      img: null,
    };
  },
  computed: {},
  created() {},
  mounted() {
    let fileName = "1620022008763-zodist-images.png";
    this.$http
      .post(
        "api/download",
        { fileName },
        { "Content-Type": "application-json" }
      )
      .then((res) => {
        console.log(res.data);
        this.img = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {},
};
</script>

<style>
</style>