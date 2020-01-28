<template>
  <div>
    <h1>Team {{team}}</h1>
    <transition>
      <template v-if="heatmapHistory">
        <h5>Shooting Positions</h5>
        <heatmap :team1History="heatmapHistory"></heatmap>
      </template>
    </transition>
  </div>
</template>

<script>
import heatmap from "@/components/teamHeatmap.vue";

export default {
  name: "dashboard",
  data() {
    return {
      TBAData: null,
      imagePaths: null,
      heatmapHistory: null,
      data: null
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
    },
    getHeatmap() {
      // get heatmap info
    },
    getImagePaths() {
      // get image paths
    },
    loadNewTeam() {
      this.getTeamInfo();
      this.getHeatmap();
      this.getImagePaths();
    }
  },
  mounted() {
    this.getTeamInfo();
  },
  watch: {
    team: () => {
      this.loadNewTeam();
    }
  }
};
</script>

<style>
</style>