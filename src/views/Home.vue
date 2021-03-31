<template>
  <v-layout align-center justify-center>
    <!-- <div><canvas></canvas></div> -->
    <v-flex xs12 sm6>
      <div style="text-align: center; margin: 10px">
        채팅 프로그램에 오신 것을 환영합니다.
        <br />
        접속 정보입니다.
      </div>
      <v-divider></v-divider>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">속성</th>
              <th class="text-left">값</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td>{{ item.property }}</td>
              <td>{{ item.value }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  computed: {},
  created() {
    // console.log(navigator);
    this.items.push({
      property: "운영체제",
      value: navigator.platform,
    });
    this.items.push({
      property: "메모리 용량",
      value: navigator.deviceMemory,
    });

    var browser = "";
    if (
      (navigator.userAgent.indexOf("Opera") ||
        navigator.userAgent.indexOf("OPR")) != -1
    ) {
      browser = "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      browser = "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      browser = "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      browser = "Firefox";
    } else if (
      navigator.userAgent.indexOf("MSIE") != -1 ||
      !!document.documentMode == true
    ) {
      //IF IE > 10
      browser = "IE";
    } else {
      browser = "unknown";
    }

    this.items.push({
      property: "웹브라우져",
      value: browser,
    });
  },
  methods: {},
};
</script>

<style></style>