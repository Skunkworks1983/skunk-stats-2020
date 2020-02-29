import {
  Bar,
  mixins
} from "vue-chartjs";
const {
  reactiveProp
} = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartTitle: String
  },
  data() {
    return {
      options: {}
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}