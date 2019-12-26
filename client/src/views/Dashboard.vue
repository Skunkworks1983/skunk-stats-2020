<template>
  <div class="dashboard-page">
    <h1 class="text-success">Team Dashboards</h1>
    <form class="dashboard-team" @submit.prevent="getDash()">
      <span>
        <!-- <label for="team">Team Number</label> -->
        <input
          type="number"
          class="form-control"
          required
          min="1"
          max="9999"
          placeholder="Team Number"
          v-model="requestedTeam"
        />
        <br />
        <button type="submit" class="btn btn-outline-success">Submit</button>
      </span>
    </form>
    <hr />
    <transition name="slide">
      <p v-if="revealInfo">stuff</p>
      <dashboard v-if="revealInfo" v-bind:requestedTeam="team" />
    </transition>
  </div>
</template>

<script>
import dashboard from "@/components/dashboard.vue";

export default {
  name: "DashboardPage",
  components: {
    dashboard
  },
  data() {
    return {
      requestedTeam: null,
      revealInfo: null,
      componentLoading: null,
      team: null
    };
  },
  computed: {},
  methods: {
    getDash() {
      if (this.revealInfo == null) {
        this.team = this.revealInfo;
        // Once done loading
        this.revealInfo = true;
      } else if (this.revealInfo) {
        // check if component is done loading new data
        // reveal it once it is complete
      }
    }
  },
  created: {}
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}

input {
  width: 200px;
}
</style>