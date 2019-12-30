<template>
  <div class="dashboard">
    <h1>Team {{ requestedTeam }}</h1>
    <span>
      <p v-if="error">Error: {{error}}</p>
    </span>
  </div>
</template>

<script>
import * as config from "../config.js";

export default {
  name: "dashboard",
  params: {
    requestedTeam: Number
  },
  data() {
    team: null;
    images: null;
    error: null;
  },
  methods: {
    onSubmit() {
      // check for valid auth
    },
    getImages() {
      axios({
        method: "GET",
        url: `${config.hostname}/users/register`
      })
        .then(res => {
          images = JSON.parse(res.body);
        })
        .catch(err => {
          error = err;
        });
    }
  },
  watch: {
    requestedTeam: function(val, oldVal) {
      // repeat the request and update the page
    }
  }
};
</script>