<template>
  <v-layout align-center justify-center>
    <!-- <div><canvas></canvas></div> -->
    <!-- <v-flex xs12 sm6> -->
      <!-- <div style="text-align: center; margin: 10px">
        Earth2 국가별 정보
      </div>
      <v-divider></v-divider> -->
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          dense
          :mobile-breakpoint="300"
          :headers="headers"
          :items="countries"
          :search="search"
        ></v-data-table>
      </v-card>
    <!-- </v-flex> -->
  </v-layout>
</template>

<script>
import Constant from "../Constant";
export default {
  name: "Earth2",
  data() {
    return {
      search: '',
      headers: [
        {
          text: '국가명',
          align: 'start',
          // filterable: false,
          value: 'name',
        },
        { text: '신규거래가격 (원)', value: 'new_tile_price' },
        { text: '시장가 (원)', value: 'marketplace_tile_value' },
        { text: '매도 타일 수', value: 'total_sold_tiles' },
        { text: '시총 (원)', value: 'assume_total_price' },
      ],
      countries: []
    };
  },
  computed: {},
  created() {
    this.getEarth2Country();
  },
  methods: {
    getEarth2Country() {
      this.$http
        .get(Constant.URL_EARTH2)
        .then((res) => {
          this.countries = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>