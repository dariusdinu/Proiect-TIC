<template>
  <div>
    <div>
      <h1>Plant Detail</h1>
      <div>
        <h2>{{ name }}</h2>
        <p>{{ species }}</p>
        <p>{{ room }}</p>
        <p>{{ sunExposure }}</p>
        <p>{{ soilType }}</p>
        <p>{{ toxicityLevel }}</p>
        <p>{{ color }}</p>
        <p>{{ maxHeight }}</p>
      </div>
    </div>
    <div>
      <button @click="handleEdit">Edit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlantDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      plant: null,
    };
  },
  created() {
    this.getPlant();
  },
  computed: {
    name() {
      return this?.plant?.name || "";
    },
    species() {
      return this?.plant?.species || "";
    },
    room() {
      return this?.plant?.room || "";
    },
    sunExposure() {
      return this?.plant?.sunExposure || "";
    },
    soilType() {
      return this?.plant?.soilType || "";
    },
    toxicityLevel() {
      return this?.plant?.toxicityLevel || "";
    },
    color() {
      return this?.plant?.color || "";
    },
    maxHeight() {
      return this?.plant?.maxHeight || "";
    },
  },
  methods: {
    async getPlant() {
      const plant = await axios.get(
        `${process.env.VUE_APP_API_URL}/plants/${this.id}`
      );
      this.plant = plant?.data || {};
    },
    handleEdit() {
      this.$router.push("/plants/" + this.id + "/edit");
    },
  },
};
</script>
