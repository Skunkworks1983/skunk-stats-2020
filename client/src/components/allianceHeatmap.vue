<template>
  <div class="heatmap">
    <canvas class="heatmap" ref="heatmap" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
export default {
  name: "Alliance Heatmap",
  props: {
    alliance: String,
    team1History: Object,
    team2History: Object,
    team3History: Object
  },
  computed: {
    colors() {
      return alliance !== "blue"
        ? [
            `rgba(255,0,0,${this.opacity})`,
            `rgba(255,104,62,${this.opacity})`,
            `rgba(182,42,143,${this.opacity})`
          ]
        : [
            `rgba(0,0,255,${this.opacity})`,
            `rgba(82,251,221,${this.opacity})`,
            `rgba(0,139,115,${this.opacity})`
          ];
    }
  },
  data() {
    return {
      width: 600,
      height: 360,
      opacity: 0.3
    };
  },
  methods: {
    drawHistory() {
      this.$refs.heatmap.clearRect(0, 0, this.width, this.height);
      if (this.team1History) {
        this.drawPoints(this.team1History, colors[0]);
      }
      if (this.team2History) {
        this.drawPoints(this.team2History, colors[1]);
      }
      if (this.team3History) {
        this.drawPoints(this.team3History, colors[2]);
      }
    },
    drawPoints(points, color) {
      for (let i of points) {
      }
    }
  },
  mounted() {
    this.drawHistory();
  }
};
</script>

<style scoped>
.heatmap {
  background-image: url("../assets/render.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 600px;
  height: 360px;
}
</style>