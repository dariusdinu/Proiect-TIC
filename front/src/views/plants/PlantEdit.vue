<template>
  <div>
    <p>Edit Plant</p>
    <form @submit.prevent="submitForm">
      <input type="text" placeholder="name" v-model.trim="name" />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
      <input type="text" placeholder="species" v-model.trim="species" />
      <p v-if="errors.species" class="error">{{ errors.species }}</p>
      <input type="text" placeholder="room" v-model.trim="room" />
      <p v-if="errors.room" class="error">{{ errors.room }}</p>
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
.error {
  color: red;
  font-size: 1.5rem;
}
</style>
