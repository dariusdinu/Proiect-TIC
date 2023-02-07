<template>
  <div>
    <h1 class="title">All reminders</h1>
    <div class="filter-form">
      <div class="div-for-select">
        <select
          @click="handleSelectedType"
          name="typeSelect"
          class="select-type select"
          id=""
          v-model="selectedOption"
        >
          <option value="">All</option>
          <option value="water">water</option>
          <option value="fertilize">fertilize</option>
          <option value="mist">mist</option>
          <option value="repot">repot</option>
          <option value="other">other</option>
        </select>
        <i class="fa-solid fa-angle-down"></i>
      </div>
      <div class="div-for-select">
        <select
          name="dateSortSelect"
          id=""
          class="select select-date-sort"
          v-model="selectedDateOption"
        >
          <option value="">None</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        <i class="fa-solid fa-angle-down"></i>
      </div>
    </div>
    <div class="reminders-container">
      <div
        v-for="reminder in reminders"
        :key="reminder.id"
        class="reminder-card"
      >
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      error: null,
      selectedOption: "",
      selectedDateOption: "",
      types: ["water", "fertilize", "mist", "repot", "other"],
      date: "",
    };
  },
  created() {
    this.error = null;
    this.selectedOption = "";
    this.date = "";
    this.loadReminders();
  },
  computed: {
    reminders() {
      let reminders = [];
      if (!this.selectedOption) {
        reminders = this.$store.getters.getReminders;
      } else {
        reminders = this.$store.getters.getReminders.filter((reminder) => {
          return reminder.type === this.selectedOption;
        });
      }
      if (!this.selectedDateOption) {
        console.log(reminders);
        return reminders;
      } else if (this.selectedDateOption === "ascending") {
        return reminders.sort((a, b) => {
          console.log(a.startDate);
          if (a.startDate < b.startDate) {
            return -1;
          } else {
            return 1;
          }
        });
      } else if (this.selectedDateOption === "descending") {
        return reminders.sort((a, b) => {
          if (a.startDate < b.startDate) {
            return 1;
          } else {
            return -1;
          }
        });
      } else {
        console.log("dhsjk");
        return reminders;
      }
    },
    isAdmin() {
      return (
        this.$store.getters.isAdmin ||
        localStorage.getItem("email") === "darius@email.com"
      );
    },
  },
  methods: {
    async loadReminders() {
      await this.$store.dispatch("loadAllReminders");
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
  }
  100% {
    opacity: 1;
  }
}
.title {
  margin: 1rem;
  color: var(--dark-accent);
  font-size: 4rem;
  font-weight: 800;
  animation: show 0.3s ease-in;
  text-align: center;
}

.filter-form {
  display: grid;
  width: 100vw;
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

.select {
  border: none;
  font-size: 2rem;
  padding: 0.8rem;
  width: 100%;
  padding-left: 1.3rem;
  border-radius: 1.5rem;
  color: var(--dark-accent);
  background-color: var(--main-light);
  box-shadow: inset -2px -2px 5px var(--highlight),
    inset 2px 2px 4px var(--shadow);
  cursor: pointer;
  transition: 0.3s ease-in-out;
  animation-name: sunk-input;
  animation-duration: 1.5s;
  animation-timing-function: ease-in;

  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

.select:hover,
.select:focus {
  background-color: var(--highlight);
}

.select:focus {
  outline: 0.2rem solid var(--dark-accent);
  outline-offset: -4px;
}

.div-for-select {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  margin: 1rem 1rem;
}

.div-for-select .fa-angle-down {
  position: absolute;
  margin-right: 1rem;
  color: var(--dark-accent);
}

.fa-angle-down {
  width: 1rem;
  height: 1rem;
}
</style>
