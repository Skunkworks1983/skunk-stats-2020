<template>
  <div id="app">
    <div class="wrapper">
      <nav id="sidebar" v-bind:class="{active:toggleMenu}">
        <div class="sidebar-header">
          <h3>
            Skunk Stats
            <br />2020
          </h3>
        </div>
        <ul class="list-unstyled components">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/about">About</router-link>
          </li>
          <li>
            <a
              aria-disabled
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle"
            >Account</a>
            <ul>
              <li>
                <router-link to="/register">Register</router-link>
              </li>
              <li>
                <router-link to="/login">Login</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="content">
        <!-- Add onclick to toggle -->
        <div
          class="container navbar-btn"
          v-bind:class="{change:toggleMenu}"
          @click="toggleMenu = !toggleMenu"
        >
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<style >
@import url("https://fonts.googleapis.com/css?family=Alata|KoHo&display=swap");
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "KoHo" !important;
}

ul {
  list-style: none inside !important;
  padding: 0;
}

#sidebar a {
  color: #839496;
}

#sidebar a.router-link-exact-active {
  color: #b58900;
  background: #fcddb6;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
  perspective: 1000px;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #fdf6e3;
  transition: all 0.6s cubic-bezier(0.945, 0.02, 0.27, 0.665);
  transform-origin: bottom left;
  font-family: "KoHo";
}

#sidebar.active {
  margin-left: -250px;
  transform: rotateY(100deg);
}

.components {
  padding-top: 0;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #fafafa;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #eee8d5;
  color: #b58900;
  font-weight: bold;
  text-align: center;
  padding-left: 0;
  padding-right: 0;
}

#sidebar ul p {
  color: #839496;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #b58900;
  background: #fcddb6;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle {
  background: #eee8d5;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #eee8d5;
}

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
}

#sidebarCollapse {
  cursor: pointer;
}

/* Menu Animation */
.container {
  display: inline-block;
  cursor: pointer;
  width: auto;
  margin: 0;
  padding: 0;
}

.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 3px;
  background-color: #b58900;
  margin: 6px 0;
  transition: 0.4s;
}

/* Rotate first bar */
.change .bar1 {
  transform: rotate(-45deg) translate(-9px, 6px);
}

/* Fade out the second bar */
.change .bar2 {
  opacity: 0;
}

/* Rotate last bar */
.change .bar3 {
  transform: rotate(45deg) translate(-7px, -4px);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
  justify-content: flex-start;
}

@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
    transform: rotateY(90deg);
  }

  #sidebar.active {
    margin-left: 0;
    -webkit-transform: none;
    transform: none;
  }

  .container-fluid {
    display: flex;
    transition-property: all;
    align-items: center;
    padding: 0;
    transition: ease-in-out 0.4s;
  }
}
</style>

<script>
export default {
  name: "NAV",
  data() {
    return {
      toggleMenu: false,
      links: [{}]
    };
  },
  methods: {}
};
</script>