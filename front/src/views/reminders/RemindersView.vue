<template>
  <h1>Reminders</h1>
  <div v-for="reminder in reminders" :key="reminder.id">{{ reminder }}</div>
</template>

<script>
import axios from "axios";

export default {
  name: "RemindersView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      reminders: [],
    };
  },
  created() {
    this.getReminders();
  },
  methods: {
    async getReminders() {
      const reminders = await axios.get(
        `${process.env.VUE_APP_API_URL}/plants/${this.id}/reminders`
      );
      this.reminders = reminders?.data || {};
    },
  },
};
</script>

<style scoped></style>
