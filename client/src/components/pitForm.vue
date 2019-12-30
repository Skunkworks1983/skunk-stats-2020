<template>
  <div class="pitForm">
    <h1 class="text-success">Pit Scouting Form</h1>
    <br />
    <form enctype="multi-part/form-data" class="pit-form" @submit.prevent="onSubmit()">
      <input
        type="text"
        name="name"
        v-model="name"
        placeholder="Login required"
        class="form-control"
        required
        disabled
      />
      <input type="file" accept="image/jpg" name="robot-image" multiple required />
      <button type="submit" class="btn btn-outline-success">Submit</button>
      <p v-if="!loggedIn" class="text-danger">You must be logged in to use this feature.</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "pitForm",
  data() {
    return {
      loggedIn: false,
      imageUploadErr: null,
      formUploadErr: null
    };
  },
  methods: {
    onSubmit() {
      // TODO
    },
    imageUpload() {
      // TODO
    },
    isLoggedIn() {
      if (sessionStorage.getItem("name") && sessionStorage.getItem("token")) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  },
  computed: {
    name: () => {
      if (sessionStorage.getItem("name")) {
        return sessionStorage.getItem("name");
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
    isLoggedIn();
  }
};
</script>

<style scoped>
</style>