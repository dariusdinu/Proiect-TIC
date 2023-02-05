<template>
  <h1>Edit Reminder</h1>
  <form @submit.prevent="submitForm" class="form">
    <div class="reminder-info-container">
      <input class="input" type="text" placeholder="name" v-model.trim="name" />
      <div class="div-for-select">
        <select class="select-type" name="type" id="type" v-model.trim="type">
          <option value="water">water</option>
          <option value="fertilize">fertilize</option>
          <option value="mist">mist</option>
          <option value="repot">repot</option>
          <option value="other">other</option>
        </select>
        <i class="fa-solid fa-angle-down"></i>
      </div>
      <input
        class="input"
        type="date"
        placeholder="startDate"
        v-model.trim="startDate"
      />
      <input
        class="input"
        type="number"
        placeholder="How often"
        v-model.trim="numberOfTimeUnits"
      />
      <div class="div-for-select">
        <select
          class="select-time-unit"
          name="timeUnit"
          id="timeUnit"
          v-model.trim="timeUnit"
        >
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="months">months</option>
          <option value="years">years</option>
        </select>
        <i class="fa-solid fa-angle-down"></i>
      </div>
    </div>
    <div>
      <button type="submit" class="btn-save">Save</button>
    </div>
  </form>
  <p class="error-input-form" v-if="error">{{ error }}</p>
</template>

<script>
import axios from "axios";
export default {
  name: "ReminderEdit",
  props: {
    id: {
      type: String,
      required: true,
    },
    reminderId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      timeUnit: [],
      name: "",
      type: [],
      startDate: "",
      numberOfTimeUnits: "",
      error: "",
    };
  },
  created() {
    this.getReminder();
  },
  methods: {
    async getReminder() {
      const reminder = await axios.get(
        `${process.env.VUE_APP_API_URL}/plants/${this.id}/reminders/${this.reminderId}`
      );
      const { timeUnit, name, type, startDate, numberOfTimeUnits } =
        reminder.data || {};
      this.timeUnit = timeUnit;
      this.name = name;
      this.type = type;
      this.startDate = startDate;
      this.numberOfTimeUnits = numberOfTimeUnits;
    },
    async submitForm() {
      this.resetError();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const reminder = {
        name: this.name,
        type: this.type,
        startDate: this.startDate,
        numberOfTimeUnits: this.numberOfTimeUnits,
      };
      await axios.put(
        `${process.env.VUE_APP_API_URL}/admin/plants/${this.id}/reminders/${this.reminderId}`,
        reminder,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.$router.push(`/plants/${this.id}/reminders`);
    },
    resetError() {
      this.error = null;
    },
    validateForm() {
      let valid = true;
      if (this.name.trim().length === 0) {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      if (this.numberOfTimeUnits === 0) {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      if (this.type.trim().length === 0) {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      if (this.startDate.trim().length === 0) {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      if (this.timeUnit === "") {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      return valid;
    },
  },
};
</script>

<style scoped>
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

* {
  margin: 0;
  --main-light: #f1f1f1;
  --highlight: rgb(255, 255, 255);
  --shadow: rgba(200, 200, 200, 0.7);
  --main-accent: #69dfa6;
  --dark-accent: #51ab7f;
  --small-text: #224936;
  font-family: Quicksand, sans-serif;
}

h1 {
  margin: 1rem;
  margin-left: auto;
  margin-right: auto;
  color: var(--dark-accent);
  font-size: 4rem;
  font-weight: 800;
  width: 50%;
  animation: show 0.3s ease-in;
  text-align: center;
}
.form {
  border-radius: 1.5rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  text-align: center;
  width: 60vw;
  box-shadow: -8px -8px 25px var(--highlight), 5px 5px 20px var(--shadow);
  animation: rise 0.5s ease-in;
}

.reminder-info-container {
  display: grid;
  grid-template-columns: 1fr;
}

.btn-save {
  border-radius: 3rem;
  font-size: 2rem;
  padding: 1rem 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  outline: none;
  cursor: pointer;
  border: none;
  width: 40%;
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

.input {
  border: none;
  font-size: 1.8rem;
  padding: 0.8rem;
  margin: 1rem 1rem;
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

.select-time-unit,
.select-type {
  border: none;
  font-size: 2rem;
  padding: 0.8rem;
  padding-left: 1.3rem;
  width: 100%;
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

.select-time-unit:hover,
.select-time-unit:focus,
.select-type:hover,
.select-type:focus {
  background-color: var(--highlight);
}

.select-time-unit:focus,
.select-type:focus {
  outline: 0.2rem solid var(--dark-accent);
  outline-offset: -4px;
}

.btn-save:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -1px -1px 5px rgba(255, 255, 255, 0.6),
    inset 1px 1px 4px rgba(0, 0, 0, 0.3);
  color: var(--dark-accent-hover);
}

.error {
  color: red;
  font-size: 1.5rem;
}
</style>
