<template>
  <div class="user">
    <h1>Account Management ~ WIP</h1>
    <hr />
    <div class="container">
      <div class="box">
        <h3>Details</h3>
        <hr />
        <p>Account Details</p>
        <p v-if="loggedIn">Name: {{name}}</p>
      </div>
      <div class="box">
        <h3>Delete Account</h3>
        <hr />
        <p>This is a destructive action that cannot be undone.</p>
      </div>
      <div class="box">
        <h3>Logout</h3>
        <hr />
        <p>End the current user session and wipe user information from this client.</p>
        <button class="btn btn-outline-success" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserManagement",
  data() {
    return {};
  },
  computed: {
    name() {
      return this.$store.name;
    },
    loggedIn() {
      return this.$store.token ? true : false;
    }
  },
  methods: {
    deleteUser() {},
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.box {
  flex: 1;
  width: 766px;
  padding: 3px;
}
</style>