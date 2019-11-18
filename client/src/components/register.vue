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
            required
          />
          <span v-if="!passwordMatch" class="text-danger">Passwords do not match!</span>
        </div>
        <div>
          <p for="email">Email:</p>
        </div>
        <div>
          <input
            type="text"
            required
            v-model="email"
            placeholder="example@whostinks.tk"
            class="form-control"
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
      <br />
      <div class="center">
        <p class="text-danger" v-if="statusCode !== 200">Error {{ statusCode }}.</p>
        <p class="text-danger" v-if="statusText != 'null'">{{ statusText }}</p>
        <button type="submit" class="btn btn-outline-success">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import * as config from "../config.js";

export default {
  name: "register",
  props: {
    address: String
  },
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
      statusCode: 200,
      statusText: "null",
      errors: []
    };
  },
  methods: {
    onSubmit() {
      this.status = null;
      this.statusText = null;
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
        console.log(config.hostname);
        axios({
          method: "POST",
          url: `${config.hostname}/users/register`,
          data: registration
        })
          .then(function(res) {
            console.log("Called then");
            if (res.status === 200) {
              router.push({ name: "/" });
            } else {
              this.statusCode = res.status;
              this.statusText = res.statusText;
              console.log(`${this.statusCode}, ${this.statusText}`);
            }
          })
          .catch(function(err) {
            console.log("Called catch");
            this.statusCode = err.status;
            this.statusText = err.statusText;
            console.log(`${this.statusCode}, ${this.statusText}`);
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