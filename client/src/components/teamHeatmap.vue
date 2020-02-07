<template>
  <div class="heatmap-container">
    <canvas ref="heatmap" class="heatmap" width="600" height="360"></canvas>
  </div>
</template>

<script>
export default {
  name: "teamHeatmap",
  data() {
    return {
      coords: []
    };
  },
  computed: {
    canvas() {
      return this.$refs.heatmap;
    },
    ctx() {
      return this.canvas.getContext("2d");
    },
    week1() {
      return this.history.filter(e => e.FRCWeek === 1);
    },
    week2() {
      return this.history.filter(e => e.FRCWeek === 2);
    },
    week3() {
      return this.history.filter(e => e.FRCWeek === 3);
    },
    week4() {
      return this.history.filter(e => e.FRCWeek === 4);
    },
    week5() {
      return this.history.filter(e => e.FRCWeek === 5);
    },
    week6() {
      return this.history.filter(e => e.FRCWeek === 6);
    },
    week8() {
      return this.history.filter(e => e.FRCWeek === 8);
    },
    zeroAccuracy() {
      return this.coords.filter(e => e.hitPercent >= 0 && e.hitPercent < 20);
    },
    twoAccuracy() {
      return this.coords.filter(e => e.hitPercent >= 20 && e.hitPercent < 40);
    },
    fourAccuracy() {
      return this.coords.filter(e => e.hitPercent >= 40 && e.hitPercent < 60);
    },
    sixAccuracy() {
      return this.coords.filter(e => e.hitPercent >= 60 && e.hitPercent < 80);
    },
    eightAccuracy() {
      return this.coords.filter(e => e.hitPercent >= 80 && e.hitPercent < 100);
    },
    tenAccuracy() {
      return this.coords.filter(e => e.hitPercent === 100);
    },
    others() {
      return this.coords.filter(e => e.hitPercent < 0 && e.hitPercent > 100);
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
    showOthers: Boolean,
    showWeek1: Boolean,
    showWeek2: Boolean,
    showWeek3: Boolean,
    showWeek4: Boolean,
    showWeek5: Boolean,
    showWeek6: Boolean,
    showWeek8: Boolean
  },
  methods: {
    drawHistory() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.coords = new Array();

      if (this.showWeek1) {
        this.coords = this.coords.concat(this.week1);
      }
      if (this.showWeek2) {
        this.coords = this.coords.concat(this.week2);
      }
      if (this.showWeek3) {
        this.coords = this.coords.concat(this.week3);
      }
      if (this.showWeek4) {
        this.coords = this.coords.concat(this.week4);
      }
      if (this.showWeek5) {
        this.coords = this.coords.concat(this.week5);
      }
      if (this.showWeek6) {
        this.coords = this.coords.concat(this.week6);
      }
      if (this.showWeek8) {
        this.coords = this.coords.concat(this.week8);
      }

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
    },
    showWeek1: function() {
      this.drawHistory();
    },
    showWeek2: function() {
      this.drawHistory();
    },
    showWeek3: function() {
      this.drawHistory();
    },
    showWeek4: function() {
      this.drawHistory();
    },
    showWeek5: function() {
      this.drawHistory();
    },
    showWeek6: function() {
      this.drawHistory();
    },
    showWeek8: function() {
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
  min-width: 600px;
  min-height: 360px;

  box-sizing: border-box;
  /* border: 3px solid #1db588; */
}
</style>