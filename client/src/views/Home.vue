<template>
  <div class="home">
    <homePage v-bind:username="user" />
  </div>
</template>

<script>
// @ is an alias to /src
import homePage from "@/components/home.vue";

export default {
  name: "home",
  components: {
    homePage
  },
  data() {
    return {};
  },
  computed: {
    user: () => {
      if (localStorage.getItem("name")) {
        return localStorage.getItem("name");
      }
    }
  }
};
</script>
