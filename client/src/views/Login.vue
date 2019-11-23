<template>
  <div class="loginPage">
    <login></login>
    <div>
      <h5>
        Looking to
        <router-link to="/register" class="btn-link">register?</router-link>
      </h5>
    </div>
  </div>
</template>

<script>
import login from "@/components/login.vue";

export default {
  name: "login-page",
  components: {
    login
  }
};
</script>

<style scoped>
.centerText {
  display: flex;
  align-items: center;
  flex-flow: column;
}

h5 {
  text-align: center;
}
</style>