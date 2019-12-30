<template>
  <div class="login">
    <h1 class="text-success">Login</h1>
    <br />
    <form class="login-form" @submit.prevent="onSubmit()">
      <div class="grid-container">
        <div>
          <p for="username">Username:</p>
        </div>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            class="form-control"
            required
            v-model="username"
            placeholder="Username"
            autofocus
          />
        </div>
        <div>
          <p for="password">Password:</p>
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            required
            v-model="password"
            placeholder="Password"
          />
        </div>
      </div>
      <br />
      <div class="center">
        <p class="text-danger" v-if="requestError">{{ statusText }}</p>
        <p class="text-success" v-if="requestSuccess">Success! Redirecting...</p>
        <button type="submit" class="btn btn-outline-success">Submit</button>
      </div>
    </form>
    <hr />
  </div>
</template>

<script>
import * as config from "../config.js";
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      username: null,
      password: null,
      statusCode: null,
      statusText: null,
      requestError: null,
      requestSuccess: null
    };
  },
  methods: {
    onSubmit() {
      this.statusCode = null;
      this.statusText = null;
      this.requestError = null;
      this.requestSuccess = null;
      var credentials = {
        username: this.username,
        password: this.password
      };
      axios({
        method: "POST",
        url: `${config.hostname}/users/login`,
        data: credentials
      })
        .then(res => {
          this.requestSuccess = true;
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("name", res.data.user);
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 1000);
        })
        .catch(err => {
          this.statusCode = err.response.status;
          this.statusText = err.response.data;
          this.requestError = true;
        });
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
p {
  text-align: right;
}
input {
  width: 15vw;
}
.center {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5vh;
  /* grid-auto-rows: minmax(100px, auto); */
}
@media only screen and (max-width: 971px) {
  .grid-container {
    display: block;
  }

  div {
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  p {
    margin-bottom: 5px;
  }

  input {
    min-width: 72vw;
    margin-bottom: 15px;
  }
}
</style>