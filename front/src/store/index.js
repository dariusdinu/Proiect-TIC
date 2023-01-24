import axios from "axios";
import { createStore } from "vuex";

let timer;

export default createStore({
  state: {
    email: null,
    token: null,
    userId: null,
    plants: [],
  },
  getters: {
    email(state) {
      return state.email;
    },
    token(state) {
      return state.token;
    },
    userId(state) {
      return state.userId;
    },
    isAuthenticated(state) {
      return state.token !== null;
    },
    getPlants(state) {
      return state.plants;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.email = payload.email;
      state.token = payload.token;
      state.userId = payload.userId;
    },
    setPlants(state, payload) {
      state.plants = payload;
    },
  },
  actions: {
    login: ({ commit, dispatch }, responseData) => {
      const expiresIn = +responseData.expiresIn * 1000;

      localStorage.setItem("email", responseData.email);
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);

      timer = setTimeout(function () {
        dispatch("logout");
      }, expiresIn);

      commit("setUser", {
        email: responseData.email,
        token: responseData.idToken,
        userId: responseData.localId,
      });
    },
    logout({ commit }) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      clearTimeout(timer);

      commit("setUser", {
        email: null,
        token: null,
        userId: null,
      });
    },
    async loadPlants({ commit }) {
      const plants = await axios.get(`${process.env.VUE_APP_API_URL}/plants`);
      commit("setPlants", plants?.data || []);
    },
    async loadPlant(_, id) {
      const plant = await axios.get(
        `${process.env.VUE_APP_API_URL}/plants/${id}`
      );
      return plant?.data || {};
    },
  },
  modules: {},
});
