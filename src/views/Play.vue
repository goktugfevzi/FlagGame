<template>
  <div>
    SCORE: <strong>{{ score }}</strong> / {{ $store.state.session.length }}

    <div v-if="country" class="max-w-full md:max-w-screen-sm mx-auto p-2">
      <img :src="country.flags.svg" class="w-full" /><br />
      <div class="grid grid-cols-2 grid-rows-2 gap-2">
        <option-button
          v-for="(option, key) in options"
          :key="key + '-' + country.cca2"
          @click="optionSelected(key)"
        >
          {{ option }}
        </option-button>
      </div>
    </div>
  </div>
</template>

<script>

var _ = require("lodash");
import OptionButton from "../components/OptionButton.vue";

export default {
  components: {
    OptionButton,
  },
  computed: {
    countries() {
      return this.$store.state.countries;
    },
    score() {
      return this.$store.state.score;
    },
    session() {
      return this.$store.state.session;
    },
    country() {
      return this.$store.state.currentQuestionCountry;
    },
    options() {
      return this.$store.state.currentQuestionOptions;
    },
  },
  methods: {
    selectARandomCountry() {
      const randIndex = Math.floor(Math.random() * this.countries.length);
      return this.countries[randIndex];
    },
    setupGameTour() {
      var randomCountry = this.selectARandomCountry();
      var options = [];
      options.push(randomCountry.name.common);

      for (let index = 0; index < 3; index++) {
        randomCountry = this.selectARandomCountry();
        if (options.indexOf(randomCountry.name.common) == -1) {
          options.push(randomCountry.name.common);
        } else {
          index--;
        }
      }

      options = _.shuffle(options);

      this.$store.commit("setCurrentQuestionCountry", randomCountry);
      this.$store.commit("setCurrentQuestionOptions", options);
    },
    optionSelected(key) {
      if (this.options[key] == this.country.name.common) {
        this.$store.commit("incrementScore");
        this.$confetti.start();
        setTimeout(() => {
          this.$confetti.stop();
        }, 500);
      }
      this.$store.commit("pushToSession", {
        country: this.country,
        options: this.options,
        selectedOption: this.options[key],
      });
      this.setupGameTour();
    },
  },
  beforeMount() {
    if (this.session.length >= 20) {
      this.$router.push("/session");
    }

    if (this.countries.length < 1) {
      this.$router.push("/");
    } else {
      if (this.country == null) {
        this.setupGameTour();
      }
    }
  },
  watch: {
    session() {
      if (this.session.length >= 20) {
        this.$router.push("/session");
      }
    },
    country(newValue) {
      if (newValue == null) {
        this.$router.push("/");
      }
    },
  },
};
</script>