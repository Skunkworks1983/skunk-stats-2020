<template>
  <div class="matchStrategy">
    <h1 class="text-success">{{event}} - Match {{match}}</h1>
    <deviationChart
      v-if="gaussData.datasets[0].data[0].y || gaussData.datasets[1].data[0].y"
      :chartData="gaussData"
      color1="255, 0, 0"
      color2="0, 0, 255"
      :height="250"
      chartTitle="Alliance Scoring Distributions"
    ></deviationChart>
    <boxplot :redData="data.redRaw" :blueData="data.blueRaw"></boxplot>
    <div class="teamTable">
      <div>
        <h5>Blue</h5>
        <table class="table table-hover">
          <thead>
            <tr>
              <td>Team</td>
              <td class="shape">&#9209;</td>
              <td class="shape">&#11043;</td>
              <td class="shape">&#9210;</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(team, index) in data.blue" :key="team">
              <td @click="showDashboard(team)">{{team}}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h5>Red</h5>
        <table class="table table-hover">
          <thead>
            <tr>
              <td>Team</td>
              <td class="shape">&#9209;</td>
              <td class="shape">&#11043;</td>
              <td class="shape">&#9210;</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(team, index) in data.red" :key="team" :class="'dashboard'">
              <td @click="showDashboard(team)">{{team}}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import allianceHeatmap from "@/components/allianceHeatmap.vue";
import deviationChart from "@/components/charts/allianceDeviation.js";
import boxplot from "@/components/charts/allianceBoxplot.vue";
import dashboard from "@/components/dashboard.vue";

// This component should be reusable for both qualification and playoff matches
export default {
  name: "MatchStrategy",
  components: {
    allianceHeatmap,
    deviationChart,
    boxplot,
    dashboard
  },
  props: {
    data: Object,
    gaussData: Object,
    shots: Object,
    match: String,
    event: String
  },
  methods: {
    showDashboard(team) {
      this.$store.commit("setTeam", team);
      this.$modal.show(dashboard, {
        buttons: [
          {
            title: "Close",
            default: true
          }
        ]
      });
    },
    closeDashboard() {
      this.$modal.close(dashboard);
    }
  }
};
</script>

<style scoped>
.teamTable {
  display: flex;
  flex-flow: row nowrap;
}

.teamTable > * {
  flex: 1;
  text-align: center;
}

.shape {
  font-size: 24px;
}

.dashboard,
.dashboard > * {
  cursor: pointer;
}

@media only screen and (max-width: 971px) {
  .teamTable {
    display: block;
  }
}
</style>