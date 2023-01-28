<template>
  <div>
    <nav>
      <button><router-link to="/">Home</router-link></button>
      <button><router-link to="/about">About</router-link></button>
      <button v-if="isAuthenticated">
        <logout-button @logout="logout"></logout-button>
      </button>
      <button v-else><router-link to="/login">Login</router-link></button>
    </nav>
  </div>
</template>

<script>
import LogoutButton from "./LogoutButton.vue";

export default {
  name: "TheHeader",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  components: {
    LogoutButton,
  },
  computed: {
    isAuthenticated() {
      return this.isLoggedIn || this.$store.getters.token != null;
    },
  },
  created() {
    this.isLoggedIn = this.$store.getters.isAuthenticated;
  },
  methods: {
    logout() {
      this.isLoggedIn = false;
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem;
}

button {
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  background-color: transparent;
}
</style>
