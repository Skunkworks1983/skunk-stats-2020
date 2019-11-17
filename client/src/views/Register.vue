<template>
  <div class="register">
    <register address="127.0.0.1:3000/users/register" />
    <hr />
    <div class="centerText">
      <h5>
        Looking to
        <router-link to="/login" class="btn-link">log in?</router-link>
      </h5>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import register from "@/components/register.vue";

export default {
  name: "register-page",
  components: {
    register
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
