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
    color1: String,
    color2: String
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
            pointStyle: 'triangle',
            radius: 0
          }
        },
        responsive: true,
        scales: {
          xAxes: [{
            type: 'linear',
            display: true,
            ticks: {
              beginAtZero: true,
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
    for (let i = 0; i < 2; i++) {
      let gradient = this.ctx.createLinearGradient(0, 0, 0, 1200);
      gradient.addColorStop(0, `rgba(${this[`color${i + 1}`]}, 0.5)`);
      gradient.addColorStop(0.5, `rgba(${this[`color${i + 1}`]}, 0.25)`);
      gradient.addColorStop(1, `rgba(${this[`color${i + 1}`]}, 0)`);
      this.chart.datasets[i]['borderColor'] = `rgb(${this[`color${i + 1}`]})`;
      this.chart.datasets[i]['pointBackgroundColor'] = "#002B36";
      this.chart.datasets[i]['borderWidth'] = 2;
      this.chart.datasets[i]['pointBorderColor'] = `rgb(${this[`color${i + 1}`]})`;
      this.chart.datasets[i]['backgroundColor'] = gradient;
      this.chart.datasets[i]['lineTension'] = 0.5;
    }
    this.renderChart(this.chart, this.chartOptions);
  }
}