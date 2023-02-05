<template>
  <button @click="logout" class="btn btn-logout">Logout</button>
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
