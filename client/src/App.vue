<template>
  <div id="app" style="display: flex; flex-direction: column; align-items:center;">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<script>
export default {
  beforeCreate() {
    if (localStorage.access_token) {
      this.$store.dispatch("getTodoList");
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa&display=swap");

#app {
  font-family: "Comfortaa", cursive, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222e40;
  background-image: linear-gradient(to bottom right, #a8e600, #e2ff5e, #a8e600);
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow-y: scroll;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
