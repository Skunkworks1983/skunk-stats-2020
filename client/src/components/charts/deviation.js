import {
  Line,
  mixins
} from 'vue-chartjs'
const {
  reactiveProp
} = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartTitle: String,
    color: String
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
          display: false,
          position: "bottom"
        },
        tooltip: {
          enabled: false,
          mode: "index",
          intersect: false,
          position: "average"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        elements: {
          point: {
            pointStyle: 'triangle'
          }
        },
        responsive: true,
        scales: {
          xAxes: [{
            type: 'linear',
            display: true,
            ticks: {
              beginAtZero: true,
              // min: 0,
              autoSkip: true
            }
          }],
          yAxes: [{
            type: 'linear',
            display: false,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      };
    }
  },
  mounted() {
    this.chart = this.chartData;
    for (let i of this.chart.datasets) {
      let gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
      gradient.addColorStop(0, `rgba(${this.color}, 0.5)`);
      gradient.addColorStop(0.5, `rgba(${this.color}, 0.25)`);
      gradient.addColorStop(1, `rgba(${this.color}, 0)`);
      i['borderColor'] = `rgb(${this.color})`;
      i['pointBackgroundColor'] = "#002B36";
      i['borderWidth'] = 2;
      i['pointBorderColor'] = `rgb(${this.color})`;
      i['backgroundColor'] = gradient;
      i['lineTension'] = 0.5;
    }
    this.renderChart(this.chart, this.chartOptions);
  }
}