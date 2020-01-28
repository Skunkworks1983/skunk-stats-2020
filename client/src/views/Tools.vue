<template>
  <div class="scoutBoss">
    <h1 class="text-success">Tools</h1>
    <hr />
    <div>
      <h4>Climbing Calculator</h4>
      <iframe
        id="calculator"
        src="http://samcfuchs.com/ClimbingSimulator"
        scrolling="no"
        frameborder="0"
        seamless
        height="1000"
      ></iframe>
    </div>
    <div>
      <h4>ScoutBoss</h4>
      <p>ScoutBoss is a tool for seeing, calculating, and predicting event match results. The tool runs in the browser, but can also be downloaded and used locally.</p>
      <span>
        <button
          class="btn btn-outline-success spacing"
          href="/scouting/scoutBoss/download"
          download
        >Download</button>
        <button class="btn btn-outline-success" href="/scouting/scoutBoss">Open in Browser</button>
      </span>
    </div>
    <hr />
    <div>
      <h4>Match Predictions Tool</h4>
      <p>The match predictions tool facilitates an easy way to lay out and calculate unplayed match results at the end of the first day of competitions.</p>
      <span>
        <button
          class="btn btn-outline-success spacing"
          href="/scouting/predictions/download"
          download
        >Download</button>
        <button class="btn btn-outline-success" href="/scouting/predictions">Open in Browser</button>
      </span>
    </div>
    <hr />
    <div>
      <h4>Python ELO Calculator</h4>
      <p>
        This tool calculates all season-long team ELOs from 2002 to the present into an Excel spreadsheet.
        <br />Prerequisites: Python 3, PIP, and included PIP packages.
      </p>
      <span>
        <button
          class="btn btn-outline-success spacing"
          href="/scouting/predictions/download"
          download
        >Download</button>
        <button class="btn btn-outline-success" href="/scouting/predictions">GitHub Page</button>
      </span>
    </div>
    <hr />
    <div>
      <h4>Python FRC Team Roster</h4>
      <p>
        Collects all FRC teams info and places it into an Excel spreadsheet.
        <br />Prerequisites: Python 3, PIP, and included PIP packages.
      </p>
      <span>
        <button
          class="btn btn-outline-success spacing"
          href="/scouting/predictions/download"
          download
        >Download</button>
        <button class="btn btn-outline-success" href="/scouting/predictions">GitHub Page</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tools"
};
</script>

<style scoped>
.spacing {
  margin-right: 20px;
}
#calculator {
  min-width: 100%;
  min-height: 80vh;
  overflow: hidden;
  color: #839496;
  background: white;
}
</style>