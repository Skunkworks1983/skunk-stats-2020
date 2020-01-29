<template>
  <div class="heatmap-container">
    <canvas ref="heatmap" class="heatmap" width="600" height="360"></canvas>
  </div>
</template>

<script>
export default {
  name: "teamHeatmap",
  computed: {
    canvas() {
      return this.$refs.heatmap;
    },
    ctx() {
      return this.canvas.getContext("2d");
    },
    zeroAccuracy() {
      return this.history.filter(e => e.hitPercent >= 0 && e.hitPercent < 20);
    },
    twoAccuracy() {
      return this.history.filter(e => e.hitPercent >= 20 && e.hitPercent < 40);
    },
    fourAccuracy() {
      return this.history.filter(e => e.hitPercent >= 40 && e.hitPercent < 60);
    },
    sixAccuracy() {
      return this.history.filter(e => e.hitPercent >= 60 && e.hitPercent < 80);
    },
    eightAccuracy() {
      return this.history.filter(e => e.hitPercent >= 80 && e.hitPercent < 100);
    },
    tenAccuracy() {
      return this.history.filter(e => e.hitPercent === 100);
    },
    others() {
      return this.history.filter(e => e.hitPercent < 0 && e.hitPercent > 100);
    }
  },
  props: {
    history: Array,
    showZero: Boolean,
    showTwo: Boolean,
    showFour: Boolean,
    showSix: Boolean,
    showEight: Boolean,
    showTen: Boolean,
    showOthers: Boolean
  },
  methods: {
    drawHistory() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // draw all points
      if (this.showZero) {
        for (let i of this.zeroAccuracy) {
          this.drawDot(this.ctx, i.xpos, i.ypos, 12, "rgba(0, 100, 255, 0.3)");
        }
      }
      if (this.showTwo) {
        for (let i of this.twoAccuracy) {
          this.drawDot(this.ctx, i.xpos, i.ypos, 12, "rgba(0, 151, 255, 0.3)");
        }
      }
      if (this.showFour) {
        for (let i of this.fourAccuracy) {
          this.drawDot(this.ctx, i.xpos, i.ypos, 12, "rgba(0, 180, 223, 0.3)");
        }
      }
      if (this.showSix) {
        for (let i of this.sixAccuracy) {
          this.drawDot(this.ctx, i.xpos, i.ypos, 12, "rgba(0, 208, 172, 0.3)");
        }
      }
      if (this.showEight) {
        for (let i of this.eightAccuracy) {
          this.drawDot(this.ctx, i.xpos, i.ypos, 12, "rgba(0, 234, 109, 0.3)");
        }
      }
      if (this.showTen) {
        for (let i of this.tenAccuracy) {
          this.drawDot(this.ctx, i.xpos, i.ypos, 12, "rgba(45, 255, 0, 0.3)");
        }
      }
      if (this.showOthers) {
        for (let i of this.others) {
          this.drawDot(this.ctx, i.xpos, i.ypos, 12, "rgba(255,255,255,0.3)");
        }
      }
    },
    drawDot(ctx, x, y, size, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }
  },
  mounted() {
    this.drawHistory();
  },
  updated() {
    this.drawHistory();
  },
  watch: {
    history: function() {
      this.drawHistory();
    },
    showZero: function() {
      this.drawHistory();
    },
    showTwo: function() {
      this.drawHistory();
    },
    showFour: function() {
      this.drawHistory();
    },
    showSix: function() {
      this.drawHistory();
    },
    showEight: function() {
      this.drawHistory();
    },
    showTen: function() {
      this.drawHistory();
    },
    showOthers: function() {
      this.drawHistory();
    }
  }
};
</script>

<style scoped>
.heatmap {
  background-image: url("../assets/render.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;

  box-sizing: border-box;
  /* border: 3px solid #1db588; */
}
</style>