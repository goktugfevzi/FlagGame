import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: [],
    score: 0,
    session: [],
    currentQuestionCountry: null,
    currentQuestionOptions: [],
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries;
    },
    incrementScore(state) {
      state.score++;
    },
    pushToSession(state, payload) {
      state.session.push(payload);
    },
    resetState(state) {
      state.score = 0;
      state.session = [];
      state.currentQuestionCountry = null;
      state.currentQuestionOptions = [];
    },
    setCurrentQuestionCountry(state, payload) {
      state.currentQuestionCountry = payload;
    },
    setCurrentQuestionOptions(state, payload) {
      state.currentQuestionOptions = payload;
    },
  },
  actions: {
    fetchCountriesFromAPI({ commit }) {
      return fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          commit("setCountries", data);
        });
    },
    resetState({ commit }) {
      commit("resetState");
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
