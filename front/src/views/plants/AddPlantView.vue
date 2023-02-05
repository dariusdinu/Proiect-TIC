<template>
  <div>
    <h1>Add a new friend</h1>
    <form @submit.prevent="submitForm" class="form">
      <div class="input-fields--container">
        <input
          type="text"
          placeholder="Name"
          v-model.trim="name"
          class="input"
        />
        <input
          type="text"
          placeholder="Species"
          v-model.trim="species"
          class="input"
        />

        <input
          type="text"
          placeholder="Room"
          v-model.trim="room"
          class="input"
        />

        <input
          type="text"
          placeholder="Soil Type"
          v-model.trim="soilType"
          class="input"
        />
        <input
          type="text"
          placeholder="Sun Exposure"
          v-model.trim="sunExposure"
          class="input"
        />

        <div class="div-for-select">
          <select
            name="toxicityLevel"
            id="toxicityLevel"
            v-model="toxicityLevel"
            class="select-toxicity"
          >
            <option value="" selected>Select toxicity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">8</option>
            <option value="10">10</option>
          </select>
          <i class="fa-solid fa-angle-down"></i>
        </div>

        <input
          type="text"
          placeholder="Color"
          v-model.trim="color"
          class="input"
        />
        <input
          type="number"
          placeholder="Max Height"
          v-model="maxHeight"
          class="input"
        />
      </div>

      <div><button type="submit" class="btn-add-new-plant">Add</button></div>
    </form>
    <p class="error-input-form" v-if="error">
      {{ error }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddPlantView",
  data() {
    return {
      name: "",
      species: "",
      room: "",
      sunExposure: "",
      soilType: "",
      color: "",
      maxHeight: "",
      toxicityLevel: "",
      error: "",
    };
  },
  methods: {
    async submitForm() {
      this.resetError();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const plant = {
        name: this.name,
        species: this.species,
        room: this.room,
        sunExposure: this.sunExposure,
        soilType: this.soilType,
        toxicityLevel: this.toxicityLevel,
        color: this.color,
        maxHeight: this.maxHeight,
      };
      await axios.post(`${process.env.VUE_APP_API_URL}/admin/plants`, plant, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      this.$router.push(`/`);
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
      if (this.species.trim().length === 0) {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      if (this.room.trim().length === 0) {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      if (this.sunExposure.trim().length === 0) {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      if (this.toxicityLevel === "") {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      if (this.soilType.length === 0) {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      if (this.color.length === 0) {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      if (this.maxHeight === 0) {
        this.error = "All fields are mandatory.";
        valid = false;
      }
      return valid;
    },
  },
};
</script>

<style scoped>
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

h1 {
  margin: 1rem;
  margin-left: 3rem;
  color: var(--dark-accent);
  font-size: 3.2rem;
  font-weight: 600;
  width: 50%;
  animation: show 0.3s ease-in;
}

.form {
  margin-top: 10rem;
  border-radius: 1.5rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  text-align: center;
  width: 60%;
  box-shadow: -8px -8px 25px var(--highlight), 5px 5px 20px var(--shadow);
  animation: rise 0.5s ease-in;
}

.input-fields--container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.input {
  border: none;
  font-size: 2rem;
  padding: 0.8rem;
  padding-left: 1.3rem;
  margin: 1rem 1.5rem;
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

.input:hover,
.input:focus {
  background-color: var(--highlight);
}

.input:focus {
  outline: 0.2rem solid var(--dark-accent);
  outline-offset: -4px;
}
.input:-webkit-autofill,
.input:-webkit-autofill:hover,
.input:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--dark-accent);
  background-color: var(--main-light) !important;
}

.input::placeholder {
  color: var(--small-text);
}

.select-toxicity {
  border: none;
  font-size: 2rem;
  padding: 0.8rem;
  padding-left: 1.3rem;
  width: 100%;
  border-radius: 1.5rem;
  color: var(--small-text);
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

.select-toxicity:hover,
.select-toxicity:focus {
  background-color: var(--highlight);
}

.select-toxicity:focus {
  outline: 0.2rem solid var(--dark-accent);
  outline-offset: -4px;
}

.div-for-select {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  margin: 1rem 1.5rem;
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

.btn-add-new-plant {
  border-radius: 1.5rem;
  font-size: 2.3rem;
  padding: 0.2rem 5rem;
  margin-left: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 2.5rem;
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

.btn-add-new-plant:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.6),
    inset 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.error-input-form {
  text-align: center;
  font-size: 1.8rem;
  margin-top: 1rem;
  animation: error-input 0.3s ease-in;
  color: rgb(255, 108, 108);
}
</style>
