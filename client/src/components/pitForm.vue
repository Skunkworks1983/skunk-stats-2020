<template>
  <div class="pitForm">
    <h1 class="text-success">Pit Scouting Form</h1>
    <hr />
    <form enctype="multi-part/form-data" class="pit-form" @submit.prevent="onSubmit()">
      <div class="form-group">
        <label for="team">Team Number</label>
        <input
          class="form-control"
          type="number"
          name="team"
          min="0"
          max="9999"
          placeholder="1983"
          v-model="team"
          required
        />
      </div>
      <div class="form-group">
        <label for="drivetrainType">Drivetrain Type</label>
        <select
          name="drivetrainType"
          id="driveTrainType"
          class="custom-select"
          v-model="drivetrainType"
          required
        >
          <optgroup label="Tank Drive">
            <option value="Kitbot">Kitbot</option>
            <option value="4-Wheel Tank">4-Wheel Tank</option>
            <option selected value="6-Wheel Tank">6-Wheel Tank (WCD)</option>
            <option value="8-Wheel Tank">8-Wheel Tank (WCD)</option>
            <option value="10-Wheel Tank">10-Wheel Tank (WCD)</option>
          </optgroup>
          <optgroup label="Holonomic">
            <option value="H-Drive">H-Drive</option>
            <option value="Swerve">Swerve</option>
            <option value="Crab Drive">Crab Drive</option>
            <option value="Holonomic">Holonomic</option>
            <option value="Mechanum">Mechanum</option>
            <option value="Mechanum Swerve">Mechanum Swerve</option>
          </optgroup>
          <optgroup label="Exotic">
            <option value="Butterfly">Butterfly</option>
            <option value="Kiwi Drive">Kiwi Drive</option>
            <option value="Rhino Drive">Rhino Drive</option>
          </optgroup>
        </select>
      </div>
      <div class="form-group">
        <label for="driveTrainMotors">Drivetrain Motors</label>
        <input
          type="text"
          class="form-control"
          name="driveTrainMotors"
          required
          v-model="drivetrainMotors"
          placeholder="4 NEOs"
        />
      </div>
      <div>
        <div class="form-group">
          <label for="height">Robot Height</label>
          <input
            type="number"
            placeholder="45 inches"
            min="0"
            name="height"
            required
            v-model="height"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="weight">Robot Weight</label>
          <input
            type="number"
            max="125"
            min="0"
            name="weight"
            required
            v-model="weight"
            class="form-control"
          />
        </div>
      </div>
      <!-- <div class="form-group">
        <div class="form-group">
          <label for="cellStorage">Cell Storage Type</label>
          <input
            type="text"
            name="cellStorage"
            v-model="cellStorage"
            class="form-control"
            required
            placeholder="Cell Storage Mechanism"
          />
        </div>
        <div class="form-group">
          <label for="cellCollection">Cell Collection</label>
          <input
            type="text"
            name="cellCollection"
            v-model="cellCollection"
            class="form-control"
            required
            placeholder="Cell Collection Mechanism"
          />
        </div>
      </div>-->
      <div class="form-group">
        <label for="cellCount">Max Cell Storage</label>
        <input
          type="number"
          required
          name="cellCount"
          placeholder="Max Cell Storage Count"
          min="0"
          max="5"
          v-model="cellCount"
          class="form-control"
        />
      </div>
      <fieldset>
        <div class="form-group">
          <input type="checkbox" name="lowerGoal" v-model="lowerGoal" required id="lowerGoal" />
          <label class="custom-control-label" for="lowerGoal">
            <span class="ui"></span>
            Lower Goal
          </label>
        </div>
        <div class="form-group">
          <input type="checkbox" name="outerGoal" v-model="outerGoal" required id="outerGoal" />
          <label class="custom-control-label" for="outerGoal">
            <span class="ui"></span>
            Outer Goal
          </label>
        </div>
        <div class="form-group">
          <input type="checkbox" name="innerGoal" v-model="innerGoal" required id="innerGoal" />
          <label class="custom-control-label" for="innerGoal">
            <span class="ui"></span>
            Inner Goal
          </label>
        </div>
      </fieldset>
      <div class="form-group">
        <span>Notes</span>
        <textarea
          class="form-control"
          v-model="notes"
          name="notes"
          placeholder="Additional Notes (Max 1000 chars)"
          cols="50"
          rows="4"
          maxlength="1000"
        ></textarea>
      </div>
      <div class="input-group mb-3">
        <div class="custom-file">
          <input
            type="file"
            accept="image/jpg"
            class="custom-file-input"
            name="robot-image"
            multiple
            required
          />
          <label class="custom-file-label" for="inputGroupFile02">Upload Robot Images</label>
        </div>
        <div class="input-group-append">
          <button type="submit" class="btn btn-primary" :disabled="!loggedIn">Submit</button>
        </div>
      </div>
      <p v-if="!loggedIn" class="text-danger">You must be logged in to use this feature.</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import * as config from "../config";

export default {
  name: "pitForm",
  data() {
    return {
      team: null,
      drivetrainType: "6-Wheel Tank",
      drivetrainMotors: null,
      height: null,
      weight: 125,
      cellCount: null,
      lowerGoal: null,
      outerGoal: null,
      innerGoal: null,
      notes: null,
      loggedIn: false,
      imageUploadErr: null,
      formUploadErr: null
    };
  },
  methods: {
    onSubmit() {
      // form upload
      axios({
        method: "POST",
        url: `${config.hostname}/pit/upload`,
        data: {
          drivetrainType,
          drivetrainMotors
        }
      })
        .then(res => {})
        .catch(err => {});
      // image upload
      axios({
        method: "POST",
        url: `${config.hostname}/pit/upload/images`
      });
    },
    imageUpload() {
      // TODO
    },
    isLoggedIn() {
      if (localStorage.getItem("name") && localStorage.getItem("token")) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  },
  computed: {
    name: () => {
      if (localStorage.getItem("name")) {
        return localStorage.getItem("name");
      }
    },
    submittable: () => {
      return {
        disabled: !this.loggedIn
      };
    }
  },
  mounted() {
    // check if signed in
    this.isLoggedIn();
  }
};
</script>

<style scoped>
label {
  user-select: none;
}

optgroup {
  background: #98aaaa;
}
input,
select {
  cursor: pointer;
}

[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  left: -9999px;
}
[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 95px;
  cursor: pointer;
}
[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before,
[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  content: "";
  position: absolute;
}
[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
  left: 0;
  top: 0;
  width: 80px;
  height: 30px;
  background: #dddddd;
  border-radius: 4px;
  transition: background-color 0.2s;
}
[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  width: 30px;
  height: 30px;
  transition: all 0.2s;
  border-radius: 4px 0 0 4px;
  background: #7f8c9a;
  top: 0;
  left: 0;
}

/* on checked */
[type="checkbox"]:checked + label:before {
  background: #002b36;
}
[type="checkbox"]:checked + label:after {
  background: #39d2b4;
  top: 0;
  left: 51px;
  border-radius: 0 4px 4px 0;
}

[type="checkbox"]:checked + label .ui,
[type="checkbox"]:not(:checked) + label .ui:before,
[type="checkbox"]:checked + label .ui:after {
  position: absolute;
  left: 6px;
  width: 65px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  transition: all 0.2s;
}

[type="checkbox"]:not(:checked) + label .ui:before {
  left: 46px;
  margin-top: 3px;
}
[type="checkbox"]:checked + label .ui:after {
  color: #39d2b4;
  margin-top: 3px;
  left: 12px;
}
[type="checkbox"]:focus + label:before {
  border: 0;
  outline: 0;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  /* PC queries */
  fieldset {
    display: flex;
    flex-flow: column wrap;
  }
  fieldset > div.form-group {
    flex: 1 !important;
  }
}
</style>