<template>
  <button @click="logout" class="btn btn-logout btn-login">Logout</button>
</template>

<script>
export default {
  name: "LogoutButton",
  emits: ["logout"],
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style>
/* .btn-logout {
  border: none;
} */
</style>
