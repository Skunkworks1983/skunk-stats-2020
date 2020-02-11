// import * as utils from '@/utils.js'
import {
  HorizontalBar,
  mixins
} from "vue-chartjs";
const {
  reactiveProp
} = mixins;
export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  data() {
    return {
      chart: null,
      legendMarkup: null
    }
  },
  computed: {
    ctx() {
      return this.$refs.canvas.getContext('2d')
    },
    chartOptions() {
      return {
        title: {
          display: this.chartTitle ? true : false,
          text: this.chartTitle
        },
        legend: {
          display: true,
          position: "bottom"
        },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
          position: "average"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              autoSkip: false
            }
          }]
        }
      };
    }
  },
  methods: {
    hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
  },
  props: {
    chartTitle: String
  },
  mounted() {
    this.chart = this.chartData;
    this.renderChart(this.chart, this.chartOptions);
    for (let i of this.chart.datasets) {
      let gradient = this.ctx.createLinearGradient(0, 0, this.$refs.canvas.width, 0);
      let color = this.hexToRgb(i.backgroundColor);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`);
      gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.25)`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      i['borderColor'] = i.backgroundColor;
      i['pointBackgroundColor'] = "white";
      i['borderWidth'] = 2;
      i['pointBorderColor'] = "white";
      i['backgroundColor'] = gradient;
    }
    this.renderChart(this.chart, this.chartOptions);
  }
};