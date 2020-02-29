<template>
  <div class="qualMatches">
    <h1 class="text-success">Qualification Match Strategy</h1>
    <form class="qualMatch" @submit.prevent="setEventMatch">
      <span>
        <input
          type="text"
          class="form-control"
          minlength="6"
          maxlength="9"
          v-bind:placeholder="event ? event : 'Event Code'"
          v-model="requestedEvent"
        />
        <br />
        <input
          type="number"
          class="form-control"
          min="1"
          max="150"
          v-bind:placeholder="match ? match : 'Match Number'"
          v-model="requestedMatch"
        />
        <span>
          <input type="checkbox" name="eventOnly" id="eventOnly" v-model="eventOnly" />
          <label for="eventOnly">Get data from this event only</label>
        </span>
        <br />
        <button type="submit" class="btn btn-outline-success" v-bind:disabled="!loggedIn">Submit</button>
      </span>
    </form>
    <hr />
    <div>
      <transition name="fade">
        <p v-if="error" class="text-danger">{{error}}</p>
        <p v-if="!loggedIn" class="text-danger">You must be logged in to use this feature.</p>
      </transition>
      <transition name="fade">
        <matchDashboard
          v-if="data"
          :data="data"
          :gaussData="gaussChart"
          :match="match"
          :event="event"
        ></matchDashboard>
      </transition>
      <p v-if="data">Sample Size: {{data.blueRaw.length + data.redRaw.length}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import matchDashboard from "@/components/match.vue";

export default {
  name: "qualMatches",
  components: {
    matchDashboard
  },
  data() {
    return {
      data: null,
      gaussChart: null,
      eventOnly: null,
      requestedEvent: null,
      requestedMatch: null,
      error: null
    };
  },
  computed: {
    match() {
      return this.$store.state.match;
    },
    event() {
      return this.$store.state.event;
    },
    loggedIn() {
      return this.$store.state.name;
    }
  },
  methods: {
    setEventMatch() {
      if (this.requestedEvent) {
        this.$store.commit("setEvent", this.requestedEvent);
      }
      if (this.requestedMatch) {
        this.$store.commit("setMatch", this.requestedMatch);
      }
    },
    getData() {
      this.data = null;
      this.error = null;
      axios({
        method: "GET",
        url: this.eventOnly
          ? `/stats/${this.event}/${this.match}/strict`
          : `/stats/${this.event}/${this.match}`
      })
        .then(res => {
          this.data = res.data ? res.data : null;
          this.gaussChart = {
            labels: ["Red", "Blue"],
            datasets: [
              {
                label: "Red",
                data: this.data.redCurve
              },
              {
                label: "Blue",
                data: this.data.blueCurve
              }
            ]
          };
        })
        .catch(err => {
          console.warn(err);
          this.data = null;
          this.error = err;
        });
    }
  },
  mounted() {
    if (this.event && this.match) {
      this.getData();
    }
  },
  watch: {
    match: function() {
      this.getData();
    },
    event: function() {
      this.getData();
    },
    eventOnly: function() {
      this.getData();
    }
  }
};
</script>

<style scoped>
input {
  max-width: 100vw;
}
label {
  margin-left: 5px;
}
</style>