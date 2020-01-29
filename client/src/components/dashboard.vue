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
      <template v-if="analysis">
        <div></div>
      </template>
    </transition>
    <transition name="fade">
      <template v-if="history">
        <div>
          <h3>Heatmaps</h3>
          <h6>Filters</h6>
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
              :history="history.filter(e => e.gamePhase === 'auto')"
              :showZero="showZero"
              :showTwo="showTwo"
              :showFour="showFour"
              :showSix="showSix"
              :showEight="showEight"
              :showTen="showTen"
              :showOthers="showOthers"
            ></heatmap>
          </div>
          <br />
          <div>
            <h5>Tele Shooting Positions</h5>
            <heatmap
              :history="history.filter(e => e.gamePhase === 'tele')"
              :showZero="showZero"
              :showTwo="showTwo"
              :showFour="showFour"
              :showSix="showSix"
              :showEight="showEight"
              :showTen="showTen"
              :showOthers="showOthers"
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
          <div class="image-container">
            <img v-for="path in imagePaths" :key="path" :src="path" :class="'robot-image'" />
          </div>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
import * as config from "../config.js";
import heatmap from "@/components/teamHeatmap.vue";
import axios from "axios";

export default {
  name: "dashboard",
  data() {
    return {
      TBAData: null,
      imagePaths: null,
      history: null,
      data: null,
      analysis: null,
      showZero: true,
      showTwo: true,
      showFour: true,
      showSix: true,
      showEight: true,
      showTen: true,
      showOthers: true
    };
  },
  components: {
    heatmap
  },
  computed: {
    team() {
      return this.$store.state.team;
    }
  },
  methods: {
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
          console.error(err);
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
          console.error(err);
          this.history = null;
        });
    },
    getImagePaths() {
      // get image paths
      axios({
        method: "GET",
        url: `${config.hostname}/scouting/robot`,
        headers: {
          "x-stats-team": this.team
        }
      })
        .then(res => {
          this.imagePaths = res.data;
        })
        .catch(err => {
          console.error(err);
          this.imagePaths = null;
        });
    },
    getMatchData() {},
    loadNewTeam() {
      this.getTeamInfo();
      this.getMatchData();
      this.getHeatmap();
      this.getImagePaths();
    }
  },
  mounted() {
    this.loadNewTeam();
  },
  watch: {
    team: function() {
      // console.log(this.team);
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

.image-container {
  display: flex;
  flex-flow: row wrap;
}

.robot-image {
  width: 500px;
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