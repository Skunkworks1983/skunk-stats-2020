<template>
  <div>
    <h1>Team {{team}}</h1>
    <hr />
    <transition name="fade">
      <template v-if="TBAData">
        <div>
          <h2>{{ TBAData.nickname }}</h2>
          <p>{{ TBAData.school_name }}</p>
          <p>{{ TBAData.city }}, {{ TBAData.state_prov }}, {{ TBAData.country }}</p>
          <p>Rookie Year: {{ TBAData.rookie_year }}</p>
          <hr />
        </div>
      </template>
    </transition>
    <transition name="fade">
      <template v-if="pitData">
        <div>
          <div>
            <h3>Pit Data</h3>
            <select name="selectPitData" id="selectPitData" class="form-control" v-model="pitIndex">
              <option
                v-for="(data,index) in pitData"
                :value="index"
                :key="data.creationDate"
              >{{ new Date(data.creationDate).toString() }}</option>
            </select>
            <hr v-if="pitIndex === null" />
          </div>
          <transition name="fade">
            <template v-if="pitIndex !== null">
              <div>
                <div>
                  <p>
                    <span>Drivetrain Type: {{pitData[pitIndex].drivetrainType}}</span>
                    <span>Drivetrain Motors: {{pitData[pitIndex].drivetrainMotors}}</span>
                    <span>Max Cell Storage: {{pitData[pitIndex].cellMaxStorage}}</span>
                  </p>
                  <p>
                    <span>Robot Weight: {{pitData[pitIndex].robotWeight}} lb.</span>
                    <span>Robot Height: {{pitData[pitIndex].robotHeight}} in.</span>
                  </p>
                  <p>
                    <span>Lower Goal: {{pitData[pitIndex].lowerGoal ? "&#9745;" : "&#9746;"}}</span>
                    <span>Outer Goal: {{pitData[pitIndex].outerGoal ? "&#9745;" : "&#9746;"}}</span>
                    <span>Inner Goal: {{pitData[pitIndex].innerGoal ? "&#9745;" : "&#9746;"}}</span>
                  </p>
                  <p>
                    <span>Trench Runner: {{pitData[pitIndex].trench ? "&#9745;" : "&#9746;"}}</span>
                    <span>Wheel Rotation: {{pitData[pitIndex].wheelRotation ? "&#9745;" : "&#9746;"}}</span>
                    <span>Wheel Position: {{pitData[pitIndex].wheelPosition ? "&#9745;" : "&#9746;"}}</span>
                  </p>
                  <p>
                    <span>Hang: {{pitData[pitIndex].hang ? "&#9745;" : "&#9746;"}}</span>
                    <span>Buddy Hang: {{pitData[pitIndex].buddyHang ? "&#9745;" : "&#9746;"}}</span>
                  </p>
                </div>
                <div>
                  <h6>Notes:</h6>
                  <p>{{pitData[pitIndex].notes}}</p>
                </div>
                <hr />
              </div>
            </template>
          </transition>
        </div>
      </template>
    </transition>
    <transition name="fade">
      <template v-if="history">
        <div>
          <h3>Heatmaps</h3>
          <h6>Filters</h6>
          <div>
            <span>
              <input type="checkbox" v-model="showWeek1" id="week1" />&nbsp;
              <label for="week1">Week 1</label>
            </span>
            <span>
              <input type="checkbox" v-model="showWeek2" id="week2" />&nbsp;
              <label for="week2">Week 2</label>
            </span>
            <span>
              <input type="checkbox" v-model="showWeek3" id="week3" />&nbsp;
              <label for="week3">Week 3</label>
            </span>
            <span>
              <input type="checkbox" v-model="showWeek4" id="week4" />&nbsp;
              <label for="week4">Week 4</label>
            </span>
            <span>
              <input type="checkbox" v-model="showWeek5" id="week5" />&nbsp;
              <label for="week5">Week 5</label>
            </span>
            <span>
              <input type="checkbox" v-model="showWeek6" id="week6" />&nbsp;
              <label for="week6">Week 6</label>
            </span>
            <span>
              <input type="checkbox" v-model="showWeek8" id="week8" />&nbsp;
              <label for="week8">Week 8</label>
            </span>
          </div>
          <div>
            <span>
              <input type="checkbox" v-model="showZero" id="showZero" />&nbsp;
              <label for="showZero">0-19% Accuracy</label>
            </span>
            <span>
              <input type="checkbox" v-model="showTwo" id="showTwo" />&nbsp;
              <label for="showTwo">20-39% Accuracy</label>
            </span>
            <span>
              <input type="checkbox" v-model="showFour" id="showFour" />&nbsp;
              <label for="showFour">40-59% Accuracy</label>
            </span>
            <span>
              <input type="checkbox" v-model="showSix" id="showSix" />&nbsp;
              <label for="showSix">60-79% Accuracy</label>
            </span>
            <span>
              <input type="checkbox" v-model="showEight" id="showEight" />&nbsp;
              <label for="showEight">80-99% Accuracy</label>
            </span>
            <span>
              <input type="checkbox" v-model="showTen" id="showTen" />&nbsp;
              <label for="showTen">100% Accuracy</label>
            </span>
            <!-- <span>
              <input type="checkbox" v-model="showOthers" id="showOthers" />&nbsp;
              <label for="showOthers">Others</label>
            </span>-->
          </div>
          <div>
            <h5>Auto Shooting Positions</h5>
            <heatmap
              class="shootingHeatmap"
              :history="history.filter(e => e.gamePhase === 'auto')"
              :showZero="showZero"
              :showTwo="showTwo"
              :showFour="showFour"
              :showSix="showSix"
              :showEight="showEight"
              :showTen="showTen"
              :showOthers="showOthers"
              :showWeek1="showWeek1"
              :showWeek2="showWeek2"
              :showWeek3="showWeek3"
              :showWeek4="showWeek4"
              :showWeek5="showWeek5"
              :showWeek6="showWeek6"
              :showWeek8="showWeek8"
            ></heatmap>
          </div>
          <br />
          <div>
            <h5>Tele Shooting Positions</h5>
            <heatmap
              class="shootingHeatmap"
              :history="history.filter(e => e.gamePhase === 'tele')"
              :showZero="showZero"
              :showTwo="showTwo"
              :showFour="showFour"
              :showSix="showSix"
              :showEight="showEight"
              :showTen="showTen"
              :showOthers="showOthers"
              :showWeek1="showWeek1"
              :showWeek2="showWeek2"
              :showWeek3="showWeek3"
              :showWeek4="showWeek4"
              :showWeek5="showWeek5"
              :showWeek6="showWeek6"
              :showWeek8="showWeek8"
            ></heatmap>
          </div>
          <hr />
        </div>
      </template>
    </transition>
    <transition name="fade">
      <template v-if="imagePaths">
        <div>
          <h3>Robot Images</h3>
          <h6 v-if="imagePaths.length < 2">Coach is sad when there are no images &#128546;</h6>
          <div class="image-container">
            <img v-for="path in imagePaths" :key="path" :src="path" :class="'robot-image'" />
          </div>
          <hr />
        </div>
      </template>
    </transition>
    <transition name="fade">
      <template v-if="analysis">
        <div>
          <h3>Analysis</h3>
          <div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Low Goal</td>
                  <td>Outer Goal</td>
                  <td>Inner Goal</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Auto Average Power Cells Scored</td>
                  <td>{{analysis.stats.avgAutoLow.toFixed(2)}}</td>
                  <td>{{analysis.stats.avgAutoOuter.toFixed(2)}}</td>
                  <td>{{analysis.stats.avgAutoInner.toFixed(2)}}</td>
                </tr>
                <tr>
                  <td>Tele Average Power Cells Scored</td>
                  <td>{{analysis.stats.avgTeleLow.toFixed(2)}}</td>
                  <td>{{analysis.stats.avgTeleOuter.toFixed(2)}}</td>
                  <td>{{analysis.stats.avgTeleInner.toFixed(2)}}</td>
                </tr>
                <tr>
                  <td>Auto Goal Breakdown</td>
                  <td>{{(analysis.stats.propAutoLow * 100).toFixed(2)}} %</td>
                  <td>{{(analysis.stats.propAutoOuter * 100).toFixed(2)}} %</td>
                  <td>{{(analysis.stats.propAutoInner * 100).toFixed(2)}} %</td>
                </tr>
                <tr>
                  <td>Tele Goal Breakdown</td>
                  <td>{{(analysis.stats.propTeleLow * 100).toFixed(2)}} %</td>
                  <td>{{(analysis.stats.propTeleOuter * 100).toFixed(2)}} %</td>
                  <td>{{(analysis.stats.propTeleInner * 100).toFixed(2)}} %</td>
                </tr>
              </tbody>
            </table>
            <div class="analysisCharts">
              <shootingChart
                v-if="shootingDataset"
                :chartData="shootingDataset"
                chartTitle="Average Shots on Target - 1st row is Autonomous, 2nd is Teleop"
              ></shootingChart>
              <deviationChart
                v-if="distDataset"
                :chartData="distDataset"
                chartTitle="Population Scoring Distribution"
                :color="currentColor"
              ></deviationChart>
              <deviationChart
                v-if="cumulativeDataset"
                :chartData="cumulativeDataset"
                chartTitle="Cumulative Scoring Distribution"
                :color="currentColor"
              ></deviationChart>
              <boxPlotChart
                :boxData="boxDataset"
                :histogramData="histogramDataset"
                :color="currentColor"
                chartTitle="Scoring Distribution and Frequency"
              ></boxPlotChart>
            </div>
          </div>
          <hr />
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
import * as config from "@/config.js";
import heatmap from "@/components/teamHeatmap.vue";
import shootingChart from "@/components/charts/shootingProportions.js";
import deviationChart from "@/components/charts/deviation.js";
import boxPlotChart from "@/components/charts/teamBoxplot.vue";
import axios from "axios";

export default {
  name: "dashboard",
  data() {
    return {
      TBAData: null,
      imagePaths: null,
      history: null,
      pitData: null,
      pitIndex: null,
      analysis: null,
      accuracy: null,
      shootingDataset: null,
      distDataset: null,
      cumulativeDataset: null,
      boxDataset: null,
      histogramDataset: null,
      showZero: true,
      showTwo: true,
      showFour: true,
      showSix: true,
      showEight: true,
      showTen: true,
      showOthers: true,
      showWeek1: true,
      showWeek2: true,
      showWeek3: true,
      showWeek4: true,
      showWeek5: true,
      showWeek6: true,
      showWeek8: true
    };
  },
  components: {
    heatmap,
    shootingChart,
    deviationChart,
    boxPlotChart
  },
  computed: {
    team() {
      return this.$store.state.team;
    },
    currentColor() {
      return `${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}`;
    }
  },
  methods: {
    color() {
      return `${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}`;
    },
    findDuplicates(original) {
      let counts = new Object(),
        duplicate = new Object();
      original.forEach(x => {
        counts[x] = (counts[x] || 0) + 1;
      });
      for (var key in counts) {
        if (counts.hasOwnProperty(key)) {
          counts[key] > 1 ? (duplicate[key] = counts[key]) : duplicate;
        }
      }
      return duplicate;
    },
    getTeamInfo() {
      // get tba info
      axios({
        method: "GET",
        url: `${config.hostname}/scouting/tba`,
        headers: {
          "x-stats-tba-redirect-url": `https://www.thebluealliance.com/api/v3/team/frc${this.team}`
        }
      })
        .then(res => {
          this.TBAData = res.data;
        })
        .catch(err => {
          console.warn(err);
          this.TBAData = null;
        });
    },
    getHeatmap() {
      // get heatmap info
      axios({
        method: "GET",
        url: `${config.hostname}/stats/shooting/robot`,
        headers: {
          "x-stats-team": this.team
        }
      })
        .then(res => {
          if (res.data.length !== 0) {
            this.history = res.data;
          } else {
            this.history = null;
          }
        })
        .catch(err => {
          console.warn(err);
          this.history = null;
        });
    },
    getImagePaths() {
      // get image paths
      axios({
        method: "GET",
        url: `${config.hostname}/scouting/robot/${this.team}`
      })
        .then(res => {
          this.imagePaths = res.data;
        })
        .catch(err => {
          console.warn(err);
          this.imagePaths = null;
        });
    },
    getPitData() {
      // get pit data
      axios({
        method: "GET",
        url: `${config.hostname}/stats/pit`,
        headers: {
          "x-stats-team": this.team
        }
      })
        .then(res => {
          if (res.data.length !== 0) {
            this.pitData = res.data;
          } else {
            this.pitData = null;
          }
        })
        .catch(err => {
          console.warn(err);
          this.pitData = null;
        });
    },
    getAnalysis() {
      // get analysis data
      axios({
        method: "GET",
        url: `${config.hostname}/stats/${this.team}`
      })
        .then(res => {
          let color1 = this.color(),
            color2 = this.color(),
            color3 = this.color();
          this.analysis = res.data;
          this.shootingDataset = {
            labels: ["Lower Goal", "Outer Goal", "Inner Goal"],
            datasets: [
              {
                label: "Auto",
                backgroundColor: [
                  `rgba(${color1},0.5)`,
                  `rgba(${color2}, 0.5)`,
                  `rgba(${color3}, 0.5)`
                ],
                borderWidth: 2,
                borderColor: [
                  `rgb(${color1})`,
                  `rgb(${color2})`,
                  `rgb(${color3})`
                ],
                data: [
                  this.analysis.stats.avgAutoLow,
                  this.analysis.stats.avgAutoOuter,
                  this.analysis.stats.avgAutoInner
                ]
              },
              {
                label: "Tele",
                backgroundColor: [
                  `rgba(${color1},0.5)`,
                  `rgba(${color2}, 0.5)`,
                  `rgba(${color3}, 0.5)`
                ],
                borderWidth: 2,
                borderColor: [
                  `rgb(${color1})`,
                  `rgb(${color2})`,
                  `rgb(${color3})`
                ],

                data: [
                  this.analysis.stats.avgTeleLow,
                  this.analysis.stats.avgTeleOuter,
                  this.analysis.stats.avgTeleInner
                ]
              }
            ]
          };
          this.distDataset = {
            datasets: [
              {
                label: this.team,
                data: new Array()
              }
            ]
          };
          for (let i = 0; i < this.analysis.scores.length; i++) {
            this.distDataset.datasets[0].data.push({
              x: this.analysis.scores[i],
              y: this.analysis.dist[i]
            });
          }
          this.cumulativeDataset = {
            datasets: [
              {
                label: this.team,
                data: new Array()
              }
            ]
          };
          for (let i = 0; i < this.analysis.scores.length; i++) {
            this.cumulativeDataset.datasets[0].data.push({
              x: this.analysis.scores[i],
              y: this.analysis.cumulative[i]
            });
          }
          this.boxDataset = {
            labels: [this.team],
            datasets: [
              {
                label: this.team,
                borderColor: `rgb(${this.currentColor})`,
                borderWidth: 3,
                backgroundColor: `rgba(${this.currentColor}, 0.5)`,
                outlierColor: `rgb(${this.currentColor})`,
                outlierRadius: 5,
                data: [this.analysis.scores]
              }
            ]
          };
          this.histogramDataset = {
            datasets: [
              {
                label: this.team,
                borderColor: `rgb(${this.currentColor})`,
                borderWidth: 2,
                backgroundColor: `rgba(${this.currentColor}, 0.5)`,
                data: new Array()
              }
            ]
          };
          let duplicates = this.findDuplicates(this.analysis.scores);
          for (let i = 0; i < this.analysis.scores.length; i++) {
            this.histogramDataset.datasets[0].data.push({
              x: this.analysis.scores[i],
              y: duplicates[this.analysis.scores[i]]
                ? duplicates[this.analysis.scores[i]]
                : 1
            });
          }
        })
        .catch(err => {
          console.warn(err);
          this.analysis = null;
          this.shootingDataset = null;
        });
    },
    getAccuracy() {},
    loadNewTeam() {
      this.getImagePaths();
      this.getTeamInfo();
      this.getAnalysis();
      this.getPitData();
      this.getHeatmap();
    }
  },
  mounted() {
    this.loadNewTeam();
  },
  watch: {
    team: function() {
      this.loadNewTeam();
    }
  }
};
</script>

<style scoped>
* {
  user-select: none;
}

span {
  margin-right: 15px;
}

.shootingHeatmap {
  width: 600px;
}

.image-container {
  display: flex;
  flex-flow: row wrap;
}

.image-container > * {
  min-width: 33vw;
  max-width: 50%;
  flex: 1;
}

.analysisCharts {
  display: flex;
  flex-flow: row wrap;
}
.analysisCharts > * {
  min-width: 33vw;
  flex: 1;
}

@media only screen and (max-width: 971px) {
  .shootingHeatmap {
    width: 100%;
  }
  .image-container {
    display: block;
  }
  .robot-image {
    min-width: 100%;
    max-width: 100%;
  }
  .analysisCharts {
    display: block;
  }
  .analysisCharts > * {
    max-width: 100vw;
  }
}

#showZero + label {
  color: rgba(0, 100, 255, 1);
}

#showTwo + label {
  color: rgba(0, 151, 255, 1);
}
#showFour + label {
  color: rgba(0, 180, 223, 1);
}
#showSix + label {
  color: rgba(0, 208, 172, 1);
}
#showEight + label {
  color: rgba(0, 234, 109, 1);
}
#showTen + label {
  color: rgba(45, 255, 0, 1);
}
#showOthers + label {
  color: rgba(255, 255, 255, 1);
}
</style>