<template>
  <div>
    <h1>Add a new friend</h1>
    <form @submit.prevent="submitForm">
      <input type="text" placeholder="name" v-model.trim="name" />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
      <input type="text" placeholder="species" v-model.trim="species" />
      <p v-if="errors.species" class="error">{{ errors.species }}</p>
      <input type="text" placeholder="room" v-model.trim="room" />
      <p v-if="errors.room" class="error">{{ errors.room }}</p>
      <input type="text" placeholder="soilType" v-model.trim="soilType" />
      <input type="text" placeholder="sunExposure" v-model.trim="sunExposure" />
      <p v-if="errors.sunExposure" class="error">{{ errors.sunExposure }}</p>
      <select name="toxicityLevel" id="toxicityLevel" v-model="toxicityLevel">
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
      <p v-if="errors.toxicityLevel" class="error">
        {{ errors.toxicityLevel }}
      </p>
      <input type="text" placeholder="color" v-model.trim="color" />
      <input type="number" placeholder="maxHeight" v-model="maxHeight" />
      <div><button type="submit">Add</button></div>
    </form>
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
      toxicityLevel: [],
      errors: {
        name: null,
        species: null,
        room: null,
        sunExposure: null,
        toxicityLevel: null,
        soilType: null,
        color: null,
        maxHeight: null,
      },
    };
  },
  methods: {
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
    resetErrors() {
      this.errors = {
        name: null,
        species: null,
        room: null,
        sunExposure: null,
        toxicityLevel: null,
        soilType: null,
        color: null,
        maxHeight: null,
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
      if (this.soilType.length === 0) {
        this.errors.soilType = "You need to specify the type of the soil";
        valid = false;
      }
      if (this.color.length === 0) {
        this.errors.color = "You need to specify the color";
        valid = false;
      }
      if (this.maxHeight === 0) {
        this.errors.maxHeight = "You need to specify maximum height";
        valid = false;
      }
      return valid;
    },
  },
};
</script>

<style scoped></style>
