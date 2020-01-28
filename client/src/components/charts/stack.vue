<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: { data: Object },
  mounted() {
    this.renderChart(this.data, options);
  }
};
</script>