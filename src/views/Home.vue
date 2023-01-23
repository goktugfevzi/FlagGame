<template>
  <div class="home flex w-full items-center justify-center">
    <template v-if="countriesCount > 0">
      <router-link
        to="play"
        class="
          bg-purple-500
          text-white
          p-6
          block
          m-3
          text-3xl
          rounded-2xl
          hover:bg-purple-700
          transition
          duration-200
          ease-in-out
          transform
          hover:scale-110
          w-full
          md:w-auto
        "
      >
        PLAY NOW
      </router-link>
    </template>
    <template v-else>Loading...</template>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    countriesCount() {
      return this.$store.state.countries.length;
    },
  },
};
</script>
