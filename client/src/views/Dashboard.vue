<template>
  <div class="dashboard-page">
    <h1 class="text-success">Team Dashboards</h1>
    <form class="dashboard-team" @submit.prevent="setTeam">
      <span>
        <input
          type="number"
          class="form-control"
          required
          min="1"
          max="9999"
          v-bind:placeholder="team ? team : 'Team Number'"
          v-model="requestedTeam"
        />
        <br />
        <button type="submit" class="btn btn-outline-success" v-bind:disabled="!loggedIn">Submit</button>
      </span>
    </form>
    <p v-if="!loggedIn" class="text-danger">You must be logged in to use this feature</p>
    <hr />
    <transition name="slide">
      <dashboard v-bind:team="team" v-if="team"></dashboard>
      <p v-if="error">Error: {{error}}</p>
    </transition>
  </div>
</template>

<script>
import * as config from "../config.js";
import dashboard from "@/components/dashboard.vue";

export default {
  name: "DashboardPage",
  components: {
    dashboard
  },
  data() {
    return {
      requestedTeam: null,
      error: null
    };
  },
  methods: {
    setTeam() {
      this.$store.commit("setTeam", this.requestedTeam);
    }
  },
  computed: {
    team() {
      return this.$store.state.team;
    },
    loggedIn() {
      return this.$store.state.name;
    }
  },
  mounted() {}
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