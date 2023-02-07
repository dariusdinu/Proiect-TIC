<template>
  <div>
    <h1>Edit Plant</h1>
    <form @submit.prevent="submitForm" class="form">
      <div class="plant-info-container-edit">
        <input
          class="input"
          type="text"
          placeholder="name"
          v-model.trim="name"
        />
        <input
          class="input"
          type="text"
          placeholder="species"
          v-model.trim="species"
        />
        <input
          class="input"
          type="text"
          placeholder="room"
          v-model.trim="room"
        />
        <input
          class="input"
          type="text"
          placeholder="Soil type"
          v-model.trim="soilType"
        />
        <input
          class="input"
          type="text"
          placeholder="sunExposure"
          v-model.trim="sunExposure"
        />
        <div class="div-for-select">
          <select
            class="select-toxicity"
            name="toxicityLevel"
            id="toxicityLevel"
            v-model="toxicityLevel"
          >
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
          class="input"
          type="text"
          placeholder="color"
          v-model.trim="color"
        />
        <input
          class="input"
          type="number"
          placeholder="maximum height"
          v-model.trim="maxHeight"
        />
      </div>

      <div><button type="submit" class="btn-save">Save</button></div>
    </form>
    <p class="error-input-form" v-if="error">{{ error }}</p>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "PlantEdit",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      species: "",
      room: "",
      sunExposure: "",
      toxicityLevel: [],
      soilType: "",
      color: "",
      maxHeight: "",
      error: "",
    };
  },
  created() {
    this.getPlant();
  },
  methods: {
    async getPlant() {
      const plant = await axios.get(
        `${process.env.VUE_APP_API_URL}/plants/${this.id}`
      );
      const {
        name,
        species,
        room,
        sunExposure,
        toxicityLevel,
        soilType,
        color,
        maxHeight,
      } = plant.data || {};
      this.name = name;
      this.species = species;
      this.room = room;
      this.sunExposure = sunExposure;
      this.toxicityLevel = toxicityLevel;
      this.soilType = soilType;
      this.maxHeight = maxHeight;
      this.color = color;
    },
    async submitForm() {
      this.resetErrors();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const plant = {
        name: this.name,
        species: this.species,
        room: this.room,
        sunExposure: this.sunExposure,
        toxicityLevel: this.toxicityLevel,
        soilType: this.soilType,
        color: this.color,
        maxHeight: this.maxHeight,
      };
      await axios.put(
        `${process.env.VUE_APP_API_URL}/admin/plants/${this.id}`,
        plant,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.$router.push(`/plants/${this.id}`);
    },
    resetErrors() {
      this.error = null;
    },
    validateForm() {
      let valid = true;
      if (this.name.trim().length === 0) {
        this.error = "All fields are mandatory";
        valid = false;
      }
      if (this.species.trim().length === 0) {
        this.error = "All fields are mandatory";
        valid = false;
      }
      if (this.room.trim().length === 0) {
        this.error = "All fields are mandatory";
        valid = false;
      }
      if (this.sunExposure.trim().length === 0) {
        this.error = "All fields are mandatory";
        valid = false;
      }
      if (this.toxicityLevel === "") {
        this.error = "All fields are mandatory";
        valid = false;
      }
      if (this.soilType.length === 0) {
        this.error = "All fields are mandatory";
        valid = false;
      }
      if (this.color.length === 0) {
        this.error = "All fields are mandatory";
        valid = false;
      }
      if (this.maxHeight === 0) {
        this.error = "All fields are mandatory";
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

.plant-info-container-edit {
  display: grid;
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

.input-name {
  border: none;
  font-size: 1.5rem;
  padding: 0.8rem;
  width: 96%;
  padding-left: 1.3rem;
  margin-bottom: 2rem;
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
.input:focus,
.input-name:hover,
.input-name:focus {
  background-color: var(--highlight);
}

.input:focus,
.input-name:focus {
  outline: 0.2rem solid var(--dark-accent);
  outline-offset: -4px;
}
.input:-webkit-autofill,
.input:-webkit-autofill:hover,
.input:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--dark-accent);
  background-color: var(--main-light) !important;
}

.select-toxicity {
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

.select-toxicity:hover,
.select-toxicity:focus {
  background-color: var(--highlight);
}

.select-toxicity:focus {
  outline: 0.2rem solid var(--dark-accent);
  outline-offset: -4px;
}

.select-toxicity {
  background-color: var(--main-light);
}

.select-toxicity > option:hover {
  background-color: var(--dark-accent);
  color: var(--main-light);
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

.btn-save:hover {
  box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
    1px 1px 5px rgba(0, 0, 0, 0.3), inset -1px -1px 5px rgba(255, 255, 255, 0.6),
    inset 1px 1px 4px rgba(0, 0, 0, 0.3);
  color: var(--dark-accent-hover);
}

.error-input-form {
  text-align: center;
  font-size: 1.8rem;
  margin-top: 1rem;
  animation: error-input 0.3s ease-in;
  color: rgb(255, 108, 108);
}
</style>
