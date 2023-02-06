<template>
  <header class="header">
    <span class="title">Reminders</span>
    <button @click="addReminder" class="btn-add-reminder">
      <i class="fa-solid fa-plus"></i>
      Add a new reminder
    </button>
  </header>
  <div class="reminders-container">
    <div v-for="reminder in reminders" :key="reminder.id" class="reminder-card">
      <p class="reminder-info date-info">
        <strong>From:</strong> {{ reminder.startDate }}
      </p>
      <div class="container-main-info">
        <div class="reminder-info-card">
          <p class="reminder-info">
            <strong>Name:</strong> <br />{{ reminder.name }}
          </p>
        </div>
        <div class="reminder-info-card">
          <p class="reminder-info">
            <strong>Type:</strong> <br />{{ reminder.type }}
          </p>
        </div>
        <div class="reminder-info-card">
          <p class="reminder-info">
            <strong>How often:</strong> <br />
            every {{ reminder.numberOfTimeUnits }} {{ reminder.timeUnit }}
          </p>
        </div>
      </div>
      <div class="btn-container">
        <button
          @click="handleDelete(this.id, reminder.id)"
          class="btn-delete-reminder"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
        <button @click="handleEdit(reminder.id)" class="btn-edit-reminder">
          <i class="fa-solid fa-pen-to-square"></i>Edit reminder
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
      error: null,
    };
  },
  created() {
    this.error = null;
    this.loadReminders();
  },
  computed: {
    reminders() {
      return this.$store.getters.getReminders;
    },
    isAdmin() {
      return (
        this.$store.getters.isAdmin ||
        localStorage.getItem("email") === "darius@email.com"
      );
    },
  },
  methods: {
    async handleDelete(id, reminderId) {
      this.error = null;
      try {
        await this.$store.dispatch("deleteReminder", { id, reminderId });
      } catch (error) {
        this.error = error.message;
      }
    },
    async loadReminders() {
      const id = this.id;
      await this.$store.dispatch("loadReminders", { id });
    },
    handleEdit(reminderId) {
      this.$router.push(`/plants/${this.id}/reminders/${reminderId}/edit`);
    },
    addReminder() {
      this.$router.push(`/plants/${this.id}/reminders/add`);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  --main-light: #f1f1f1;
  --highlight: rgb(255, 255, 255);
  --shadow: rgba(200, 200, 200, 0.7);
  --main-accent: #69dfa6;
  --dark-accent: #51ab7f;
  --dark-accent-hover: #399b6c;
  --small-text: #224936;
  --error-text: rgb(245, 81, 81);
  font-family: Quicksand, sans-serif;
}
@keyframes rise {
  0% {
    box-shadow: none;
  }

  100% {
    box-shadow: -8px -8px 25px var(--highlight), 5px 5px 20px var(--shadow);
  }
}

@keyframes show {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

@keyframes rise-button {
  0% {
    opacity: 0;
    box-shadow: none;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    box-shadow: -5px -5px 15px var(--highlight), 5px 5px 5px var(--shadow);
  }
}

@keyframes sunk-input {
  0% {
    opacity: 0;
    box-shadow: none;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    box-shadow: inset -2px -2px 5px var(--highlight),
      inset 2px 2px 4px var(--shadow);
  }
}

@keyframes error-input {
  0% {
    opacity: 0;
    /* transform: translateY(-1.1rem); */
  }
  100% {
    opacity: 1;
    /* transform: translateY(-1.8rem); */
  }
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.title {
  margin: 1rem;
  color: var(--dark-accent);
  font-size: 4rem;
  font-weight: 800;
  animation: show 0.3s ease-in;
  text-align: center;
}

.reminders-container {
  display: grid;
  row-gap: 2.5rem;
  column-gap: 2.5rem;
  margin: 2rem 2rem;
}

.reminder-card {
  border-radius: 1.5rem;
  padding: 1.2rem;
  background-color: var(--main-light);
  box-shadow: -8px -8px 25px var(--highlight), 5px 5px 20px var(--shadow);
  animation: rise 1.5s ease-in;
}

.container-main-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.reminder-info-card {
  border-radius: 1.5rem;
  font-size: 1.6rem;
  margin: 1.5rem 1rem;
  padding: 0.5rem 2rem;
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
  text-align: center;
}

.reminder-info {
  color: var(--dark-accent);
  font-weight: 500;
  font-size: 2rem;
  align-items: left;
  animation: show 0.5s ease-in;
}

.date-info {
  background-color: var(--dark-accent);
  color: var(--main-light);
  margin: 0;
  padding: 0.5rem;
  padding-left: 2rem;
  border-radius: 2rem;
}
.btn-add-reminder {
  border-radius: 1.5rem;
  font-size: 1.6rem;
  padding: 0.5rem 2rem;
  margin-left: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 2.5rem;
  outline: none;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
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

.btn-add-reminder:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -1px -1px 5px rgba(255, 255, 255, 0.6),
    inset 1px 1px 4px rgba(0, 0, 0, 0.3);
  color: var(--dark-accent-hover);
}

.fa-plus {
  border: 3px solid var(--dark-accent);
  border-radius: 100px;
  font-size: small;
  padding: 0.1rem 0.2rem;
}

.btn-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  gap: 2rem;
}

.btn-delete-reminder {
  border-radius: 1.5rem;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
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

.btn-delete-reminder:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -1px -1px 5px rgba(255, 255, 255, 0.6),
    inset 1px 1px 4px rgba(0, 0, 0, 0.3);
  color: var(--dark-accent-hover);
}

.btn-edit-reminder {
  border-radius: 1.5rem;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  outline: none;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: none;
  width: 100%;
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

.btn-edit-reminder:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -1px -1px 5px rgba(255, 255, 255, 0.6),
    inset 1px 1px 4px rgba(0, 0, 0, 0.3);
  color: var(--dark-accent-hover);
}
</style>
