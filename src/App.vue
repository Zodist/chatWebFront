<template>
  <v-app>
    <v-app-bar app></v-app-bar>
    <v-main>
      <!-- 라우터 -->
      <v-container fluid fill-height aacontainer>
        <router-view></router-view>
      </v-container>
      <!-- 라우터 -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
    };
  },
};
</script>
