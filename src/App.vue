<template>
  <div id="app" class="h-screen flex flex-col justify-between">
    <div id="nav" class="p-6">
      <router-link to="/">Home</router-link> |
      <template v-if="$store.state.countries.length > 0 && !isGameFinished">
        <router-link to="/play">Play</router-link>
      </template>
      <template v-if="isGameFinished">
        <router-link to="/session">Result</router-link>
      </template>
      |
      <a href="#" @click.prevent="restartGame()">Restart</a>
    </div>
    <router-view class="overflow-scroll" />
    <div id="footer" class="p-2">
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    if (this.$store.state.countries.length == 0) {
      this.$store.dispatch("fetchCountriesFromAPI");
    }
  },
  methods: {
    restartGame() {
      this.$store.dispatch("resetState");
      this.$router.push("/");
    },
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
    isGameFinished() {
      return this.session.length >= 20;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #180239;
}

a {
  font-weight: bold;
  color: #180239;
}

a.router-link-exact-active {
  color: #7c3aed;
}
</style>
