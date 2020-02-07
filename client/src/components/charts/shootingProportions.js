import {
  Doughnut,
  mixins
} from 'vue-chartjs';
const {
  reactiveProp
} = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartTitle: String
  },
  mounted() {
    // this.dataset is created in the mixin
    this.renderChart(this.chartData, {
      title: {
        display: this.chartData ? true : false,
        text: this.chartTitle
      },
      legend: {
        display: true,
        position: 'left'
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        position: 'average',
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },
      responsive: true,
      rotation: Math.PI,
      circumference: Math.PI / 2,
    })
  }
}