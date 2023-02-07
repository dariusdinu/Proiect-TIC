<template>
  <div>
    <nav>
      <div class="main-buttons">
        <button class="btn btn-home">
          <router-link to="/">Home</router-link>
        </button>
        <button class="btn btn-reminders">
          <router-link to="/reminders">Reminders</router-link>
        </button>
      </div>
    </nav>
    <div class="login-container">
      <p></p>
      <logout-button v-if="isAuthenticated" @logout="logout"></logout-button>
      <button v-else class="btn btn-login">
        <router-link class="btn" to="/login">Login</router-link>
      </button>
    </div>
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

<style>
nav {
  background-color: var(--main-light);
  font-family: Quicksand, sans-serif;
  text-decoration: none;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-around;
}

nav a.router-link-exact-active {
  color: #51ab7f;
}

.main-buttons {
  border-radius: 5rem;
  font-size: 1.8rem;
  margin-top: 1rem;
  z-index: 1;
  position: relative;
  outline: none;
  cursor: pointer;
  border: none;
  font-weight: 700;
  color: var(--dark-accent);
  background-color: var(--main-light);
  border: 4px solid var(--main-light);
  transition: 0.3s ease-in-out;
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.6),
    inset 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.btn {
  border-radius: 100rem;
  font-size: 2rem;
  outline: none;
  cursor: pointer;
  padding: 1rem 2rem;
  border: none;
  font-weight: 700;
  color: var(--dark-accent);
  background-color: transparent;
  transition: 0.3s ease-in-out;
}

.btn-login,
.btn-logout {
  color: var(--dark-accent);
  position: relative;
  padding: 1rem;
  margin: 1.5rem;
  border: none;
  border-radius: 20rem;
  font-size: 1.8rem;
  outline: none;
  cursor: pointer;
  border: none;
  font-weight: 700;
  color: var(--dark-accent);
  background-color: var(--main-light);
  border: 4px solid var(--main-light);
  box-shadow: -5px -5px 15px var(--highlight), 5px 5px 5px var(--shadow);
  transition: 0.3s ease-in-out;
  animation-name: rise-button;
  animation-duration: 1.5s;
  animation-timing-function: ease-in;
}

.btn-login:hover,
.btn-logout:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.6),
    inset 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.login-container {
  position: absolute;
  font-size: 1.8rem;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
}

a {
  text-decoration: none;
  color: var(--small-text);
  border-radius: 10rem;
}
</style>
