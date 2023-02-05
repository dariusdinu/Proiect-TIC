<template>
  <div>
    <nav>
      <button><router-link to="/">Home</router-link></button>
      <button v-if="isAuthenticated">
        <logout-button @logout="logout"></logout-button>
      </button>
      <button v-else class="btn btn-login">
        <router-link to="/login">Login</router-link>
      </button>
      <button class="btn btn-reminders"></button>
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

<style>
nav {
  background-color: #51ab7f;
  font-family: Quicksand, sans-serif;
  text-decoration: none;
}

/* nav a { */
/* background-color: red;
  font-family: Quicksand;
  text-decoration: none;
  font-weight: 700;
  margin: 1rem 1.2rem;
}

nav a.router-link-exact-active {
  color: #51ab7f;
  padding: 10px;
  border-radius: 100px;
  background-color: white;
} */

.btn {
  border: none;
}

.btn-login,
.btn-logout {
  background-color: red;
  border-radius: 10px;
  margin: 10px;
}

a {
  text-decoration: none;
}

/* nav a.router-link-exact-active {
  color: #51ab7f;
  padding: 10px;
  border-radius: 100px;
  background-color: white;
} */
</style>
