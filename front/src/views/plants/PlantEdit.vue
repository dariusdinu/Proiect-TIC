<template>
  <div>
    <h1>Edit Plant</h1>
    <form @submit.prevent="submitForm" class="form">
      <input class="input" type="text" placeholder="name" v-model.trim="name" />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
      <input
        class="input"
        type="text"
        placeholder="species"
        v-model.trim="species"
      />
      <p v-if="errors.species" class="error">{{ errors.species }}</p>
      <input class="input" type="text" placeholder="room" v-model.trim="room" />
      <p v-if="errors.room" class="error">{{ errors.room }}</p>
      <input
        class="input"
        type="text"
        placeholder="sunExposure"
        v-model.trim="sunExposure"
      />
      <p v-if="errors.sunExposure" class="error">{{ errors.sunExposure }}</p>

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

      <p v-if="errors.toxicityLevel" class="error">
        {{ errors.toxicityLevel }}
      </p>
      <div><button type="submit">Save</button></div>
    </form>
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
      errors: {
        name: null,
        species: null,
        room: null,
        sunExposure: null,
        toxicityLevel: null,
      },
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
      const { name, species, room, sunExposure, toxicityLevel } =
        plant.data || {};
      this.name = name;
      this.species = species;
      this.room = room;
      this.sunExposure = sunExposure;
      this.toxicityLevel = toxicityLevel;
    },
    async submitForm() {
      console.log(this.toxicityLevel);
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
      this.errors = {
        name: null,
        species: null,
        room: null,
        sunExposure: null,
        toxicityLevel: null,
      };
    },
    validateForm() {
      let valid = true;
      if (this.name.trim().length === 0) {
        this.errors.name = "Name is required";
        valid = false;
      }
      if (this.species.trim().length === 0) {
        this.errors.species = "The species is required";
        valid = false;
      }
      if (this.room.trim().length === 0) {
        this.errors.email = "The room is required";
        valid = false;
      }
      if (this.sunExposure.trim().length === 0) {
        this.errors.sunExposure = "Provide the sun exposure is required";
        valid = false;
      }
      if (this.toxicityLevel === "") {
        this.errors.toxicityLevel = "You need to specify the toxicity level";
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

h1 {
  margin: 1rem;
  margin-left: 3rem;
  color: var(--dark-accent);
  font-size: 3.2rem;
  font-weight: 600;
  width: 50%;
  animation: show 0.3s ease-in;
}

.input {
  border: none;
  font-size: 1.2rem;
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
  font-size: 1.2rem;
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

.error {
  color: red;
  font-size: 1.5rem;
}
</style>
