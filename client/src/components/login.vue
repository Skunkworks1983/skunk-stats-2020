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
        <p class="text-danger" v-if="statusCode !== 200">Error {{ statusCode }}.</p>
        <p class="text-danger" v-if="statusText != 'null'">{{ statusText }}</p>
        <button type="submit" class="btn btn-outline-success">Submit</button>
      </div>
    </form>
    <hr />
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    onSubmit() {}
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