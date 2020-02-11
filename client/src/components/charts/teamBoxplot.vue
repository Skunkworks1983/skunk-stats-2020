<template>
  <div class="boxplot-histogram">
    <!-- <h5>{{chartTitle}}</h5> -->
    <canvas id="boxplot" ref="boxplot"></canvas>
    <canvas id="histogram" ref="histogram"></canvas>
  </div>
</template>

<script>
import chartjs from "chart.js";
import boxplot from "chartjs-chart-box-and-violin-plot";

export default {
  name: "teamBoxplot",
  props: {
    chartTitle: String,
    boxData: Object,
    histogramData: Object
  },
  data() {
    return {
      boxplot: null,
      histogram: null
    };
  },
  computed: {
    boxCtx() {
      return this.$refs.boxplot.getContext("2d");
    },
    barCtx() {
      return this.$refs.histogram.getContext("2d");
    }
  },
  methods: {
    drawBoxplot() {
      window.boxplot = new Chart(this.boxCtx, {
        type: "horizontalBoxplot",
        data: this.boxData,
        options: {
          tooltipDecimals: 2,
          title: {
            display: this.chartTitle ? true : false,
            text: this.chartTitle
          },
          responsive: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                display: false,
                ticks: {
                  min: 0,
                  beginAtZero: true
                }
              }
            ],
            yAxes: [
              {
                display: false
              }
            ]
          }
        }
      });
    },
    drawHistogram() {
      this.histogram = new Chart(this.barCtx, {
        type: "scatter",
        data: this.histogramData,
        options: {
          title: {
            display: false
          },
          responsive: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            yAxes: [
              {
                display: false,
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  },
  mounted() {
    this.drawBoxplot();
    this.drawHistogram();
  }
};
</script>

<style scoped>
#boxplot {
  width: 100%;
  height: 50%;
}
#histogram {
  width: 100%;
  height: 50%;
}
</style>