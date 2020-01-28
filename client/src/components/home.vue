<template>
  <div class="homePage">
    <div>
      <h1 class="text-success" v-if="username">Welcome back, {{username}}!</h1>
      <div v-else>
        <h1 class="text-success">Welcome to Skunk-Stats!</h1>
        <h4>You are not logged in!</h4>
      </div>
    </div>
    <hr />
    <div>
      <h2>What is Skunk-Stats?</h2>
      <p>
        Skunk-Stats is a scouting system developed by FRC team 1983,
        <a
          href="https://www.thebluealliance.com/team/1983"
        >Skunk Works Robotics</a>. Scouting is one of the most important parts of the FRC game, guiding everything from our design process, to match play, to alliance selection. To this end, Skunk-Stats is a agglomeration of various tools and dashboards used by our team for ease of access. Over time, we have implemented a scouting app, pit scouting tools, team dashboards, and game-specific analyses.
      </p>
    </div>
    <div>
      <h2>Features</h2>
      <p class="no-padding">Skunk-Stats provides the following services.</p>
      <ul>
        <li>Secure Access</li>
        <li>Pit Scouting Database</li>
        <li>Statistical Analyses</li>
        <li>Graphs and Visualizations</li>
        <li>Responsive User Interface</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  props: {
    username: String
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
p {
  font-size: 14pt;
}

.no-padding {
  padding: 0;
  margin: 0;
}

li {
  list-style-type: disc;
}

.parallax {
  max-height: 20vh;
}
</style>