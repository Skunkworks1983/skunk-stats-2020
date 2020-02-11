<template>
  <div class="charts" ref="container">
    <h1 class="text-success">Event Analyses</h1>
    <form class="dashboard-team" @submit.prevent="setEvent">
      <span>
        <input
          type="text"
          class="form-control"
          required
          minlength="6"
          maxlength="9"
          v-bind:placeholder="event ? event : 'Event Code'"
          v-model="requestedEvent"
        />
        <span>
          <input type="checkbox" name="eventOnly" id="eventOnly" disabled v-model="eventOnly" />
          <label for="eventOnly">Get data from this event only</label>
        </span>
        <br />
        <button type="submit" class="btn btn-outline-success" :disabled="!loggedIn">Submit</button>
      </span>
    </form>
    <p v-if="!loggedIn" class="text-danger">You must be logged in to use this feature</p>
    <hr />
    <transition name="fade">
      <stack
        v-if="averages"
        :chart-data="averages"
        :chart-title="title"
        :width="chartWidth"
        :height="(averages.labels.length * 15) + 100"
      ></stack>
    </transition>
    <transition name="fade">
      <p v-if="error" class="text-danger">{{error}}</p>
    </transition>
  </div>
</template>

<script>
import * as config from "@/config.js";
// import * as utils from "@/utils.js";
import stack from "@/components/charts/stack.js";
import axios from "axios";

export default {
  name: "Charts",
  components: {
    stack
  },
  data() {
    return {
      averages: null,
      requestedEvent: null,
      title: null,
      eventOnly: null,
      error: null
    };
  },
  methods: {
    setEvent() {
      this.$store.commit("setEvent", this.requestedEvent);
    },
    getEventAverages() {
      this.averages = null;
      this.error = null;
      axios({
        method: "GET",
        url: this.averagesURL
      })
        .then(res => {
          this.averages = res.data;
        })
        .then(() => {
          this.title = `Stack for ${this.event}`;
        })
        .catch(err => {
          console.warn(err);
          this.error = err;
          this.averages = null;
        });
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.name;
    },
    event() {
      return this.$store.state.event;
    },
    averagesURL() {
      return this.eventOnly
        ? `${config.hostname}/stats/${this.event}/averages`
        : `${config.hostname}/stats/${this.event}/averages/all`;
    },
    chartWidth() {
      return this.$refs.container.width;
    }
  },
  mounted() {
    if (this.event) {
      this.getEventAverages();
    }
  },
  watch: {
    event: function() {
      this.getEventAverages();
    },
    eventOnly: function() {
      this.getEventAverages();
    }
  }
};
</script>

<style scoped>
* {
  user-select: none;
}
label {
  margin-left: 5px;
}
</style>