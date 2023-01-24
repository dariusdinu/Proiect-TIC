<template>
  <div>
    <nav>
      <button><router-link to="/">Home</router-link></button>
      <button><router-link to="/about">About</router-link></button>
      <button v-if="isAuthenticated">
        <logout-button></logout-button>
      </button>
      <button v-else><router-link to="/login">Login</router-link></button>
    </nav>
  </div>
</template>

<script>
import LogoutButton from "./LogoutButton.vue";

export default {
  components: {
    LogoutButton,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
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
