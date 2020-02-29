<template>
  <div class="box-plot">
    <canvas id="teamPlot" ref="boxplot"></canvas>
  </div>
</template>

<script>
import chartjs from "chart.js";
import boxplot from "chartjs-chart-box-and-violin-plot";

export default {
  name: "AllianceBoxplot",
  props: {
    // chartTitle: String,
    redData: Array,
    blueData: Array
  },
  data() {
    return {
      plot: null
    };
  },
  computed: {
    ctx() {
      return this.$refs.boxplot.getContext("2d");
    },
    sampleSize() {
      return this.redData.length + this.blueData.length;
    }
  },
  methods: {
    drawBoxplot() {
      this.plot =
        this.sampleSize === 0
          ? null
          : new Chart(this.ctx, {
              type: "horizontalBoxplot",
              data: {
                datasets: [
                  {
                    label: "Red",
                    backgroundColor: "rgba(255, 0, 0, 0.5)",
                    borderColor: "rgb(255, 0, 0)",
                    borderWidth: 3,
                    outlierColor: "rgb(255, 0, 0)",
                    outlierRadius: 5,
                    data: [this.redData]
                  },
                  {
                    label: "Blue",
                    backgroundColor: "rgba(0, 0, 255, 0.5)",
                    borderColor: "rgb(0, 0, 255)",
                    borderWidth: 3,
                    outlierColor: "rgb(0, 0, 255)",
                    outlierRadius: 5,
                    data: [this.blueData]
                  }
                ]
              },
              options: {
                tooltipDecimals: 2,
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
                      display: false
                    }
                  ]
                }
              }
            });
    }
  },
  mounted() {
    this.drawBoxplot();
  }
};
</script>

<style>
</style>