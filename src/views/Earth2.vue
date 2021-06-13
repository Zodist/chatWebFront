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
        @click:row="handleClick"
      ></v-data-table>
    </v-card>
    <!-- </v-flex> -->
    <v-dialog
      v-model="chartDialog"
      eager
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="chartDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Chart</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="chartDialog = false"> Save </v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <div>
          <canvas id="myChart" style="height: 70vh; width: 80vw"></canvas>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Chart from "chart.js";
import Constant from "../Constant";
export default {
  name: "Earth2",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "국가명",
          align: "start",
          // filterable: false,
          value: "name",
        },
        { text: "신규거래가격 (원)", value: "new_tile_price" },
        { text: "시장가 (원)", value: "marketplace_tile_value" },
        { text: "매도 타일 수", value: "total_sold_tiles" },
        { text: "시총 (원)", value: "assume_total_price" },
        { text: "업데이트시간", value: "time2" },
      ],
      countries: [],

      chartDialog: false,
      chart: null,
      chartData: [],
    };
  },
  computed: {},
  created() {
    this.getEarth2Country();
  },
  mounted() {
    this.setChart();
  },
  methods: {
    addData() {
      var labels = [];
      var new_tile_price = [];
      var marketplace_tile_value = [];
      var total_sold_tiles = [];

      this.chartData.forEach((element) => {
        labels.push(this.getTimeStamp(new Date(element.time)));
        new_tile_price.push(element.new_tile_price);
        marketplace_tile_value.push(element.marketplace_tile_value);
        total_sold_tiles.push(element.total_sold_tiles);
      });

      this.chart.data = {
        labels: labels,
        datasets: [
          {
            label: "신규거래가격",
            yAxisID: "A",
            data: new_tile_price,
            fill: false,
            borderColor: "rgb(255, 0, 0)",
          },
          {
            label: "시장가격",
            yAxisID: "A",
            data: marketplace_tile_value,
            fill: false,
            borderColor: "rgb(0, 255, 0)",
          },
          {
            label: "매도타일수",
            yAxisID: "B",
            data: total_sold_tiles,
            fill: false,
            borderColor: "rgb(0, 0, 255)",
          },
        ],
      };

      this.chart.update();
    },
    setChart() {
      var labels = [];
      var new_tile_price = [];
      var marketplace_tile_value = [];
      var total_sold_tiles = [];

      this.chartData.forEach((element) => {
        labels.push(this.getTimeStamp(new Date(element.time)));
        new_tile_price.push(element.new_tile_price);
        marketplace_tile_value.push(element.marketplace_tile_value);
        total_sold_tiles.push(element.total_sold_tiles);
      });

      var ctx = document.getElementById("myChart").getContext("2d");
      //var myChart =
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "신규거래가격",
              yAxisID: "A",
              data: new_tile_price,
              fill: false,
              borderColor: "rgb(255, 0, 0)",
            },
            {
              label: "시장가격",
              yAxisID: "A",
              data: marketplace_tile_value,
              fill: false,
              borderColor: "rgb(0, 255, 0)",
            },
            {
              label: "매도타일수",
              yAxisID: "B",
              data: total_sold_tiles,
              fill: false,
              borderColor: "rgb(0, 0, 255)",
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                id: "A",
                type: "linear",
                position: "left",
              },
              {
                id: "B",
                type: "linear",
                position: "right",
                // ticks: {
                //   max: 1,
                //   min: 0,
                // },
              },
            ],
          },
          responsive: true,
        },
        /*
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
        */
      });
    },
    handleClick(row) {
      // console.log(row);
      this.$http
        .get(Constant.URL_EARTH2 + "/" + row.code)
        .then((res) => {
          this.chartData = res.data;
          this.chartDialog = true;
          // this.setChart();
          this.addData();
          // this.chartData.push({
          //   x: date.valueOf(),
          //   o: open,
          //   h: high,
          //   l: low,
          //   c: close,
          // });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getEarth2Country() {
      this.$http
        .get(Constant.URL_EARTH2)
        .then((res) => {
          this.countries = res.data;
          this.countries.forEach((element) => {
            element.time2 = this.getTimeStamp(new Date(element.time));
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getTimeStamp(d) {
      var s =
        this.leadingZeros(d.getFullYear(), 4) +
        "-" +
        this.leadingZeros(d.getMonth() + 1, 2) +
        "-" +
        this.leadingZeros(d.getDate(), 2) +
        " " +
        this.leadingZeros(d.getHours(), 2) +
        "h" // +
        // this.leadingZeros(d.getMinutes(), 2) +
        // ":" +
        // this.leadingZeros(d.getSeconds(), 2);

      return s;
    },

    leadingZeros(n, digits) {
      var zero = "";
      n = n.toString();

      if (n.length < digits) {
        for (let i = 0; i < digits - n.length; i++) zero += "0";
      }
      return zero + n;
    },
  },
};
</script>

<style></style>