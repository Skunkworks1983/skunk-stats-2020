<template>
  <div class="register-container">
    <h1 class="text-success">Register</h1>
    <br />
    <form class="register-form" @submit.prevent="onSubmit()">
      <div class="grid-container">
        <div>
          <p for="name">Name:</p>
        </div>
        <div>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="name"
            placeholder="Your name"
            maxlength="50"
            required
          />
        </div>
        <div>
          <p for="username">Login Username:</p>
        </div>
        <div>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="The username you use to login with"
            class="form-control"
            maxlength="50"
            minlength="3"
            required
          />
        </div>
        <div>
          <p for="password">Password:</p>
        </div>
        <div>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Password. Make it secure"
            class="form-control"
            minlength="8"
            maxlength="72"
            required
          />
        </div>
        <div>
          <p>Confirm Password:</p>
        </div>
        <div>
          <input
            type="password"
            id="confirmPass"
            v-model="confirmPass"
            placeholder="Confirm your password"
            class="form-control"
            minlength="8"
            maxlength="72"
            required
          />
          <span v-if="!passwordMatch" class="text-danger">Passwords do not match!</span>
        </div>
        <div>
          <p for="email">Email:</p>
        </div>
        <div>
          <input
            type="email"
            required
            v-model="email"
            placeholder="example@whostinks.tk"
            class="form-control"
            maxlength="50"
          />
        </div>
        <div>
          <p for="team">FRC Team Number:</p>
        </div>
        <div>
          <input
            type="number"
            v-model.number="team"
            required
            pattern="\\d+"
            step="1"
            min="1"
            max="9999"
            class="form-control"
            placeholder="1983"
          />
        </div>
        <div>
          <p for="code">Registration Code:</p>
        </div>
        <div>
          <input
            type="text"
            name="code"
            id="code"
            placeholder="code"
            v-model="code"
            required
            class="form-control"
          />
        </div>
      </div>
      <br />
      <div class="center">
        <p class="text-danger" v-if="requestError">{{ statusText }}</p>
        <p class="text-success" v-if="requestSuccess">Success! Redirecting to login page...</p>
        <button type="submit" class="btn btn-outline-success">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import * as config from "../config.js";
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      name: null,
      code: null,
      email: null,
      team: null,
      password: null,
      confirmPass: null,
      username: null,
      passwordMatch: true,
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
      if (this.password === this.confirmPass) {
        this.passwordMatch = true;
        let registration = {
          name: this.name,
          code: this.code,
          email: this.email,
          team: this.team,
          password: this.password,
          username: this.username
        };
        this.$emit("registration-submitted", registration);
        axios({
          method: "POST",
          url: `${config.hostname}/users/register`,
          data: registration,
          validateStatus: status => {
            return status == 201;
          }
        })
          .then(res => {
            this.statusCode = res.statusCode;
            this.statusText = res.data;
            this.requestSuccess = true;
            setTimeout(() => {
              this.$router.push({ path: "/login" });
            }, 1000);
          })
          .catch(err => {
            if (err.response) {
              this.statusCode = err.response.status;
              this.statusText = err.response.data;
              this.requestError = true;
            } else if (err.request) {
              console.log(`Request Error: ${err.request}`);
            } else {
              console.log(`Error: ${err}`);
            }
          });
      } else {
        this.passwordMatch = false;
      }
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
span {
  margin: 0;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5vh;
  /* grid-auto-rows: minmax(100px, auto); */
}
.center {
  display: flex;
  flex-flow: column;
  align-items: center;
}
p {
  text-align: right;
}
input {
  width: 15vw;
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