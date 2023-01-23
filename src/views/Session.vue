<template>
  <div>
    SCORE: <strong>{{ score }}</strong> / {{ $store.state.session.length }}
    <div class="max-w-full md:max-w-screen-sm mx-auto p-2">
      <div
        v-for="(item, key) in session"
        :key="key"
        class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 p-4 rounded-xl"
        :class="[
          item.country.name.common == item.selectedOption
            ? 'bg-green-400'
            : 'bg-red-400',
        ]"
      >
        <img
          :src="item.country.flags.svg"
          alt="session.country.name.common"
          class="w-full mx-auto"
        />
        <div class="flex flex-col items-center justify-center">
          <div
            v-if="item.country.name.common == item.selectedOption"
            style="color: green; font-weight: bold"
          >
            CORRECT!
          </div>
          <div v-else style="color: red; font-weight: bold">WRONG</div>
          <div>
            {{ item.country.name.common }} - You selected:
            {{ item.selectedOption }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    session() {
      return this.$store.state.session;
    },
    score() {
      return this.$store.state.score;
    },
  },
};
</script>